const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, '/views/partials'));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));

app.get('/beers/beer-:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      console.log(req.params.id);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});
// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then(beers => {
//     res.render('beers', { beers: beers });
//   });
// });

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('random-beers', { randombeer: responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('index', { beers: beers });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
