const request = require('supertest');
const { expect } = require('chai');
const app = require('./app.js');

describe('Server basics', () => {
  it('should return 200 for a basic request', done => {
    request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });
});

describe('/reviews endpoint', () => {
  it('should return a result for a valid request', done => {
    request(app)
      .get('/reviews/50')
      .then(response => {
        expect(response.statusCode).to.equal(200);
        // This isn't ideal.  It is actually querying the DB, which makes it
        // slower and isn't necessary for testing the API.  There should be
        // a way to use a mock here, but I'm not sure what it is.
        done();
      });
  });
});
