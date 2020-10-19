const User = require('../../db/models/user');
const { uploadImage } = require('./uploadImg');

loginUser = (req, res, next) => {
  const { user } = req;
  res.json(user.toAuthJson());
};

registerUser = async (req, res, next) => {
  const { body } = req;
  if (!body.role || body.role.length === 0) {
    body.role = 'EMP';
  } else if (body.role !== 'MNG' && body.role !== 'EMP') {
    res.status(400).json({ message: 'Invalid role' });
    res.end();
    return;
  }
  const user = new User(body);
  if (!user.isValidated()) {
    res.status(400).json({ message: 'Invalid Username/Password' });
    res.end();
    return;
  }
  const dbUser = await User.findOne({ username: body.username });
  if (!dbUser || dbUser === {}) {
    await user.encryptPassword();
    user.save((err, savedUser) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(savedUser.toAuthJson());
      }
    });
  } else {
    res.status(409).json({ message: 'User already exists' });
  }
};

validateToken = (req, res, next) => {
  const user = new User(req.user);
  res.json(user.toAuthJson());
};

uploadUserImg = (req, res, next) => {
  uploadImage(req, res, next);
};

module.exports = {
  validateToken,
  registerUser,
  loginUser,
  uploadUserImg,
};
