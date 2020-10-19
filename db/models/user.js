const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: String,
});

UserSchema.methods.encryptPassword = async function () {
  const password = await bcrypt.hash(
    this.password,
    Number.parseInt(saltRounds)
  );
  this.password = password;
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwtToken = function () {
  const date = new Date();
  const expirationDate = new Date(date);
  expirationDate.setDate(date.getDate() + 1);
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
      role: this.role,
    },
    JWT_SECRET
  );
};

UserSchema.methods.toAuthJson = function () {
  return {
    _id: this._id,
    username: this.username,
    role: this.role,
    token: this.generateJwtToken(),
  };
};

UserSchema.methods.isValidated = function () {
  if (
    !this.username ||
    this.username.length === 0 ||
    !this.password ||
    this.password.length === 0
  ) {
    return false;
  }
  return true;
};

module.exports = mongoose.model('User', UserSchema);
