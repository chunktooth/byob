const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server.js');

chai.use(chaiHttp);

describe('Testing endpoints', () => {
  beforeEach(done => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        database.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  describe('GET', () => {
    
    it('should get all the maps', (done) => {
      chai.request(app)
      .get('/api/v1/maps')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.length.should.equal(4);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('region');
        res.body[0].should.have.property('center_lat');
        res.body[0].should.have.property('center_long');
        res.body[0].should.have.property('created_at');
        res.body[0].should.have.property('updated_at');
        res.body[0].id.should.equal(1);
        res.body[0].region.should.equal('California');
        res.body[0].center_lat.should.equal('36.78');
        res.body[0].center_long.should.equal('-119.42');
      done();
      });
    });

    it.skip('should get a map based on a query string', (done) => {
      chai.request(app)
      .get('api/v1/maps?region=California')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('region');
        res.body[0].should.have.property('center_lat');
        res.body[0].should.have.property('center_long');
        res.body[0].should.have.property('created_at');
        res.body[0].should.have.property('updated_at');
        res.body[0].id.should.equal(1);
        res.body[0].region.should.equal('California');
        res.body[0].center_lat.should.equal('36.78');
        res.body[0].center_long.should.equal('-119.42');
      done()
      })
    })

    it('should get all the pins', (done) => {
      chai.request(app)
      .get('/api/v1/pins')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.length.should.equal(107);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('latitude');
        res.body[0].should.have.property('longitude');
        res.body[0].should.have.property('map_id');
        res.body[0].id.should.equal(1);
        res.body[0].name.should.equal('Santa Maria\'s');
        res.body[0].latitude.should.equal('36.96');
        res.body[0].longitude.should.equal('-121.99');
        res.body[0].map_id.should.equal(1);
      done();
      })
    });

    it('should get map by id', (done) => {
      chai.request(app)
      .get('/api/v1/maps/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property('id')
      done()
      })
    })

    it('should get pin by id', (done) => {
      chai.request(app)
      .get('/api/v1/pins/4')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('object');
        res.body.should.have.property('id')
      done()
      })
    })
  });
  
  describe('POST', () => {
    it('should post a new map', (done) => {
      chai.request(app)
      .post('/api/v1/maps/').send({
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        map: {
          region: 'Big Wave Land',
          center_lat: '666.999',
          center_long: '555.666'
        }
      })
      .end((err, res) => {
        res.should.have.status(201)
        res.should.be.json
        res.body.should.have.property('id')
        res.body.id.should.equal(5)
      done()
      })
    })

    it('should post a new pin', (done) => {
      chai.request(app)
      .post('/api/v1/pins/').send({
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        pin: {
          name: 'The Gnarliest Wave, Brah',
          latitude: '999.666',
          longitude: '333.111'
        }
      })
      .end((err, res) => {
        res.should.have.status(201)
        res.should.be.json
        res.body.should.have.property('id')
        res.body.id.should.equal(108)
      done()
      })
    })
  });

  describe('PUT', () => {
    it('should put a region in map', (done) => {
      chai.request(app)
      .put('/api/v1/maps/3/')
      .send({ 
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        map: {
          region: 'Hullabeluga' 
        }
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.equal('Region updated.')
        done()
      })
    });

    it('should put a name in pin', (done) => {
      chai.request(app)
      .put('/api/v1/pins/3/')
      .send({ 
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        pin: {
          name: 'Hill Billy' 
        }
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.equal('Name updated.')
        done()
      })
    });
  });

  describe('DELETE', () => {
    it('should delete a pin by name', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/Boat%20House')
      .end((err, res) => {
        res.should.have.status(202)
        res.body.should.equal('Pin deleted.')
        done()
      });
    });

    it('should delete a pin with an id', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/108')
      .end((err, res) => {
        res.should.have.status(202)
        res.body.should.equal('Pin deleted.')
        done()
      });
    });
  });

});

