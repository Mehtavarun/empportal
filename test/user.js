const { deepStrictEqual } = require('assert');
var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('User', function () {
  it('Username is already present', (done) => {
    chai
      .request(app)
      .post('/api/user/register')
      .send({ username: 'u', password: '2' })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.eql({ message: 'User already exists' });
      });
    done();
  });
});

describe('User', function () {
  it('Post api: Login ', (done) => {
    chai
      .request(app)
      .post('/api/user/login')
      .send({ username: 'u', password: 's' })
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('User', function () {
  it('Post api ', (done) => {
    chai
      .request(app)
      .post('/api/user/')
      .send({})
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('User', function () {
  it('get all api', (done) => {
    chai
      .request(app)
      .get('/api/user')
      .send({})
      .end((err, res) => {
        res.should.have.status(500);
      });
    done();
  });
});
