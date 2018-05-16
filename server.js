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

app.get('/api/v1/maps/:id', (req, res) => {
  const { id } = req.params;

  database('maps').where('id', id).select()
  .then(map => {
    res.status(200).json(map[0])
  })
  .catch(error => {
    res.status(404).json(error)
  });
});

app.get('/api/v1/pins/:id', (req, res) => {
  const { id } = req.params;

  database('pins').where('id', id).select()
  .then(pin => {
    res.status(200).json(pin[0])
  })
  .catch(error => {
    res.status(404).json(error)
  });
});

app.post('/api/v1/maps/', (req, res) => {
  const map = req.body;
  if (map.region) {
    database('maps').insert(map, "id")
    .then( map => {

      res.status(201).json({ id: map[0] })
    })
    .catch(error => {
      res.status(500).json(error)
    })
  } else {
    res.status(422).send({ error: 'Missing Data' })
  }
})

app.post('/api/v1/pins/', (req, res) => {
  const pin = req.body;
  if (pin.name) {
    database('pins').insert(pin, "id")
    .then( pin => {
      res.status(201).json({ id: pin[0] })

    }).catch( error => {
      res.status(500).json(error)
    })
  } else {
    res.status(422).send({ error: 'Missing Data'})
  }
})

app.put('/api/v1/maps/:id/', (req, res) => {
  const { id } = req.params;
  const newRegion = req.body;
  console.log(res)
  console.log(req)

  if(newRegion) {
    database('maps').where('id', id).update({ region: newRegion })
    .then(region => {
      console.log(region)
      res.status(200).json({ message: `Region ${region} has been updated` })
    }).catch(error => {
      res.status(500).json(error)
    });
  } else {
    res.status(422).send({ error: 'Missing Region' });
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on Port 3000`);
});

module.exports = { app, database };