const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', function(done) {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏' 
      }, done);
  });
});

describe('POST /api/v1/messages', () => {
  it('respond with insted messages', function(done) {
    const requestObj = {
        name:'CJ',
        message:'This app is so cool!',
        latitude: -80.454,
        longitude: 89.545
    }
    
    const responseObj = {
        ...requestObj,
        _id:"5c63d038f65775194eba6604",
        date:"2019-02-13T08:07:19.628Z"
    }
    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
//      .then(response => {
//          console.log(response);
//          done();
//      })
        .expect(res=> {
            res.body._id="5c63d038f65775194eba6604",
            res.body.date="2019-02-13T08:07:19.628Z"   
        })
        .expect(200, responseObj, done);
  });
});
