const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../db/models/user');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || !user.validatePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
