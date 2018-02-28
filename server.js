const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// this folder is where the partials are kept
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// ========= Middleware =======
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance');
//   // not calling next prevents everything after this from running
// });
app.use(express.static(__dirname + '/public'));

// ============ hbs helpers ===========
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


// ========== Routes ================
app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to the home page!'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'bad request'
  });
});

// ============ Listen ===============
app.listen(3000, () => {
  console.log('listening on port 3000');
});
