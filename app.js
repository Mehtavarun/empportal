const createError = require('http-errors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const db = require('./db/db');
db.connectToDB(process.env.DB_URL);
require('./config/passport');

const frontendRouter = require('./routes');
const jobRouter = require('./routes/job');
const userRouter = require('./routes/user');
app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan(':method :url :status :response-time ms :date[iso]'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', frontendRouter);
app.use('/api/user', userRouter);
app.use('/api/jobs', jobRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  res.status(500).send({
    error: `An error has occured: ${err.message}`,
  });
  res.end();
}

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
module.exports = app;
