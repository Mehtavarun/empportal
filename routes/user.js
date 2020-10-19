const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../config/auth');

const {
  loginUser,
  registerUser,
  validateToken,
  uploadUserImg,
} = require('./services/user');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  loginUser
);

router.post('/register', registerUser);

router.post('/upload', uploadUserImg);

router.get('/validate', auth.isAuthenticated(), validateToken);

module.exports = router;
