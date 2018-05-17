# BYOB (Build Yo Own Backend)
##### By [!Matt Walker](https://github.com/mttwlkr) & [!Om Saetehn](https://github.com/chunktooth)

## Synopsis
#### BYOB is the final paired project of Module 4 at Turing. We used Express with Knex to build a Node backend with a PostgresQL database. We created a primary table of maps with center latitude and center longitude coordinates and a secondary table of surf spots (pins) within the map area. We utilized Travis's Continuous Integration and the Mocha and Chai testing frameworks. 

## Installation

#### Clone down the repo

#### ```git clone https://github.com/mttwlkr/byob```

#### ```npm install```

#### ```npm start```

## Tests

#### This project was developed using using Mocha and Chai testing utilities. To run the test suites for this project:

##### ```npm test```

## Endpoints


#### Get all maps
##### ```GET /api/v1/maps```
##### Response ```[
    {
        "id": 1,
        "region": "California",
        "center_lat": "36.78",
        "center_long": "-119.42",
        "created_at": "2018-05-17T20:33:12.022Z",
        "updated_at": "2018-05-17T20:33:12.022Z"
    },
    {
        "id": 2,
        "region": "Central Coast, Australia",
        "center_lat": "-33.43",
        "center_long": "151.34",
        "created_at": "2018-05-17T20:33:12.031Z",
        "updated_at": "2018-05-17T20:33:12.031Z"
    }
]```


#### Get map by ID
##### ```GET /api/v1/maps/:id```
##### Response ```
    {
        "id": 1,
        "region": "California",
        "center_lat": "36.78",
        "center_long": "-119.42",
        "created_at": "2018-05-17T20:33:12.022Z",
        "updated_at": "2018-05-17T20:33:12.022Z"
    }```


#### Get map by query string
#### Queries: ```region```, ```center_lat```, ```center_long```, ```id```
##### ```GET /api/v1/maps?<query>=<value>```
#### (example)```GET /api/v1/maps?region=California```
##### Response ```[
    {
        "id": 1,
        "region": "California",
        "center_lat": "36.78",
        "center_long": "-119.42",
        "created_at": "2018-05-17T20:33:12.022Z",
        "updated_at": "2018-05-17T20:33:12.022Z"
    }
]```


#### Get all pins
##### ```GET /api/v1/pins```
##### Response ```[
    {
        "id": 1,
        "name": "Santa Maria's",
        "latitude": "36.96",
        "longitude": "-121.99",
        "map_id": 1,
        "created_at": "2018-05-17T20:33:12.036Z",
        "updated_at": "2018-05-17T20:33:12.036Z"
    },
    {
        "id": 2,
        "name": "Jug Handle State Beach",
        "latitude": "39.38",
        "longitude": "-123.82",
        "map_id": 1,
        "created_at": "2018-05-17T20:33:12.039Z",
        "updated_at": "2018-05-17T20:33:12.039Z"
    }
]```

#### Get pin by ID
##### ```GET /api/v1/pin/:id```
##### Response ```
    {
        "id": 1,
        "name": "Santa Maria's",
        "latitude": "36.96",
        "longitude": "-121.99",
        "map_id": 1,
        "created_at": "2018-05-17T20:33:12.036Z",
        "updated_at": "2018-05-17T20:33:12.036Z"
    }```


## Authenticate by email:
#### User must have an authenticated token to PUT, POST or DELETE - user email MUST be ```@turing.io```
#### Token is returned in the console


#### Post new map
##### ```POST /api/v1/maps```
##### BODY ```{
  token: YOUR TOKEN HERE
  map: {
    center_lat: xxx.yyy,
    center_long: xxx.yyy,
    region: xxx
  }
}```


#### Post new pin
##### ```POST /api/v1/pins```
##### BODY ```{
  token: YOUR TOKEN HERE
  pin: {
    latitude: xxx.yyy,
    longitude: xxx.yyy,
    name: xxx
    map_id: xxx (map ID that pin is in)
  }
}```


#### Put new map
##### ```PUT /api/v1/maps/:id```
##### BODY ```{
  token: YOUR TOKEN HERE
  map: {
    region: xxx
  }
}```

#### Put new pin
##### ```PUT /api/v1/pins/:id```
##### BODY ```{
  token: YOUR TOKEN HERE
  pin: {
    name: xxx
  }
}```

#### Delete pin by ID
##### ```DELETE /api/v1/maps/:id```


#### Delete pin by name
##### ```DELETE /api/v1/maps/:name```


