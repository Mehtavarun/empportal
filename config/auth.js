const expressJwt = require('express-jwt');

function isAuthenticated() {
  return expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });
}

function isAuthorized(...roles) {
  return (req, res, next) => {
    const { user } = req;
    if (user && roles.includes(user.role)) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

module.exports = {
  isAuthenticated,
  isAuthorized,
};
