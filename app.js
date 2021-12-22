const express = require("express"),
  config = require('config'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require("mongoose");

const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');

//Middleware
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth'));

//Server connection
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(result => {
  app.listen(PORT, () => console.log('Server has been started on port ' + PORT + '...'));
})
.catch(err => console.log(err));