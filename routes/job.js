const express = require('express');
const router = express.Router();
const auth = require('../config/auth');

const {
  getAllJobs,
  getJobById,
  saveJob,
  updateJobById,
  applyForJob,
} = require('./services/job');

router.get(
  '/',
  auth.isAuthenticated(),
  auth.isAuthorized('EMP', 'MNG'),
  getAllJobs
);

router.get(
  '/:jobId',
  auth.isAuthenticated(),
  auth.isAuthorized('EMP', 'MNG'),
  getJobById
);

router.post('/', auth.isAuthenticated(), auth.isAuthorized('MNG'), saveJob);

router.put(
  '/:jobId',
  auth.isAuthenticated(),
  auth.isAuthorized('MNG'),
  updateJobById
);

router.get(
  '/apply/:jobId',
  auth.isAuthenticated(),
  auth.isAuthorized('EMP'),
  applyForJob
);

router.get(
  '/check/:jobId',
  auth.isAuthenticated(),
  auth.isAuthorized('EMP'),
  checkUserJob
);

module.exports = router;
