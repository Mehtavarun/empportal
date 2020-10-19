const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  projectName: String,
  clientName: String,
  technologies: String,
  role: String,
  description: String,
  active: Boolean,
  createdBy: String,
});

JobSchema.methods.isValidated = function () {
  if (
    !this.projectName ||
    this.projectName.length === 0 ||
    !this.clientName ||
    this.clientName.length === 0 ||
    !this.role ||
    this.role.length === 0
  ) {
    return false;
  }
  return true;
};

module.exports = mongoose.model('Jobs', JobSchema);
