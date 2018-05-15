const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json())

app.locals.title = 'BYOB';

app.get('/', (req, res) => {
  res.status(200).json()
});

app.get('/api/v1/maps', (req, res) => {
  database('maps').select()
  .then(map => {
    res.status(200).json(map)
  })
  .catch(error => {
    res.status(404).json(error)
  });
});

app.get('/api/v1/pins', (req, res) => {
  database('pins').select()
  .then(pin => {
    res.status(200).json(pin)
  })
  .catch(error => {
    res.status(404).json(error)
  });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on Port 3000`);
});

module.exports = { app, database };