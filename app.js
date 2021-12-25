const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require('config');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const feedRouter = require('./routes/feed');

const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');

//Middleware
app.use(cors());
app.use(express.json({extended: true}));

//Routers
app.use('/auth', authRouter);
app.use('/', feedRouter);

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