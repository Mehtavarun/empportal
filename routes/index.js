const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/register');
});

router.get('/jobs', (req, res, next) => {
  res.render('jobs/jobs');
});

router.get('/jobs/create', (req, res, next) => {
  res.render('jobs/job', { isUpdate: false });
});

router.get('/jobs/update/:jobId', (req, res, next) => {
  res.render('jobs/job', {
    isUpdate: true,
    jobId: req.params.jobId,
  });
});

router.get('/jobs/:id', (req, res, next) => {
  res.render('jobs/detail', { title: 'EmpPort' });
});

router.get('/register', (req, res, next) => {
  res.render('user/register', { title: 'Register' });
});

router.get('/login', (req, res, next) => {
  res.render('user/login', { title: 'Login' });
});

router.get('/logout', (req, res, next) => {
  res.render('user/logout');
});

module.exports = router;
