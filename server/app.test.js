const request = require('supertest');
const { expect } = require('chai');
const { app, db } = require('./app.js');

describe('Server basics', () => {
  it('should return 200 for a basic request', done => {
    request(app)
      .get('/product/1')
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
  it('should return a result for a valid request the second time', done => {
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
  it('should return 404 when the product is not in the db', done => {
    request(app)
      .get('/reviews/5000')
      .then(response => {
        expect(response.statusCode).to.equal(404);
        done();
      });
  });
  it('should return 400 when the productId is malformed', done => {
    request(app)
      .get('/reviews/banana')
      .then(response => {
        expect(response.statusCode).to.equal(400);
        done();
      });
  });
});

afterAll(() => db.end());
