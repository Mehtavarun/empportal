const { deepStrictEqual } = require('assert');
var assert = require('assert');
const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eiOiI1Zjg0ODMwMjExNDEzYjRlNTA3YjdhZjAiLCJ1c2VybmFtZSI6InUiLCJleHAiOjk5OTk5OTk5OTk5LCJyb2xlIjoiRU1QIiwiaWF0IjoxNjAyNzgyNDg1fQ.V0ibZ8s6NxFixXvR_BwQyJAoAzH3Y8g4kKpP-76g8Pc';

describe('job', function () {
  it('Get all jobs', (done) => {
    chai
      .request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer ' + token)
      .send({})
      .end((err, res) => {
        res.should.have.status(401);
      });
    done();
  });
});

describe('job', function () {
  it('Get job with id', (done) => {
    chai
      .request(app)
      .get('/api/jobs/abc')
      .set('Authorization', 'Bearer ' + token)
      .send({})
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.eql({});
      });
    done();
  });
});

describe('job', function () {
  it('create job', (done) => {
    chai
      .request(app)
      .get('/api/jobs')
      .set('Authorization', 'Bearer ' + token)
      .send({ projectName: 'project' })
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        res.should.have.status(401);
      });
    done();
  });
});
