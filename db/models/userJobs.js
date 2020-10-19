const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserJobsSchema = new Schema({
  userId: String,
  jobId: String,
});

module.exports = mongoose.model('UserJobs', UserJobsSchema);
