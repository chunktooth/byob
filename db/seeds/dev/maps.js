const regions = require('../../../surf-spots/clean/all-regions.js')

const createMap = (knex, map) => {
  return knex('maps').insert({
    region: map.region,
    center_lat: map.center_lat,
    center_long: map.center_long,
  }, 'id')
  .then(mapId => {
    let pinPromises = [];

    map.pins.forEach( pin => {
      pinPromises.push(
        createPin(knex, {
          name: pin.name,
          latitude: pin.latitude,
          longitude: pin.longitude,
          map_id: mapId[0]
        })
      )
    });
    return Promise.all(pinPromises)
  })
}

const createPin = (knex, pin) => {
  return knex('pins').insert(pin)
}

exports.seed = (knex, Promise) => {
  return knex('pins').del()
    .then(() => knex('maps').del())
    .then(() => {
      let mapPromises = [];

      regions.forEach( region => {
        mapPromises.push(createMap(knex, region));
      })

      return Promise.all(mapPromises);
    })
  .catch(error => console.log(`Error seeding data: ${error}`))  
}