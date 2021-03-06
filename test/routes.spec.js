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

    it('should get all the pins', (done) => {
      chai.request(app)
      .get('/api/v1/pins')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.length.should.equal(107);
        res.body[5].should.have.property('id');
        res.body[5].should.have.property('name');
        res.body[5].should.have.property('latitude');
        res.body[5].should.have.property('longitude');
        res.body[5].should.have.property('map_id');
        res.body[5].id.should.equal(6);
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

    it('should throw a 404 if map id does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/maps/4000')
      .end((err, res) => {
        res.should.have.status(404);
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

    it('should throw a 404 if pin id does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/pins/6000')
      .end((err, res) => {
        res.should.have.status(404);
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

    it('should not post a new map if the region is blank', (done) => {
      chai.request(app)
      .post('/api/v1/maps/').send({
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        map: {
          center_lat: '666.999',
          center_long: '555.666'
        }
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.deep.equal({ error: 'Missing Data' })
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
  
    it('should not post a new pin if the region is blank', (done) => {
      chai.request(app)
      .post('/api/v1/pins/').send({
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        pin: {
        }
      })
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.deep.equal({ error: 'Missing Data' })
      done()
      })
    })
  });

  describe('PUT', () => {
    it('should patch a region in map', (done) => {
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
        res.body.should.equal('Region 1 updated.')
        done()
      })
    });

    it('should not patch a region in map if the map id does not exit', (done) => {
      chai.request(app)
      .put('/api/v1/maps/6000/')
      .send({ 
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        map: {
          region: 'Ouch Town' 
        }
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    });

    it('should patch a name in pin', (done) => {
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
        res.body.should.equal('Name 1 updated.')
        done()
      })
    });

    it('should not patch a name in pin if the pin id does not exist', (done) => {
      chai.request(app)
      .put('/api/v1/pins/9000/')
      .send({ 
        token: 'eyJhbGciOiJIUzI1NiJ9.bWF0dEB0dXJpbmcuaW8.n3sElaxzQThTgog5QBOiBffkUvj3VCI0l6zM_SVXXhk',
        pin: {
          name: 'Roxbury' 
        }
      })
      .end((err, res) => {
        res.should.have.status(404)
        done()
      })
    });
  });

  describe('DELETE', () => {
    it('should delete a pin by name', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/name/Boat%20House')
      .end((err, res) => {
        res.should.have.status(202)
        res.body.should.equal('Pin 1 deleted.')
        done()
      });
    });

    it('should not delete a pin if the name is wrong', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/name/Swisher%20Sweet')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      });
    });

    it('should delete a pin with an id', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/id/18')
      .end((err, res) => {
        res.should.have.status(202)
        done()
      });
    });
    
    it('should not delete a pin if the name is wrong', (done) => {
      chai.request(app)
      .delete('/api/v1/pins/id/9000')
      .end((err, res) => {
        res.should.have.status(404)
        done()
      });
    });
  });
});

