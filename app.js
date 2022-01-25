require('dotenv').config();
let express = require('express'),
    mongoose = require('mongoose');

let indexRouter = require('./routes/index');

let mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/vending-machine';
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', indexRouter);

module.exports = app;
