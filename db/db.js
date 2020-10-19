const mongoose = require('mongoose');

function connectToDB(url) {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const connection = mongoose.connection;
  connection.on('error', () => {
    console.log('Error while connecting to mongo DB');
  });

  connection.on('connected', function () {
    console.log('Database connected.');
  });

  connection.on('disconnected', function () {
    console.log('Database disconnected.');
  });
}

module.exports = {
  connectToDB,
};
