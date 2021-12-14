const express = require("express"),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require("mongoose");

app.use('/api/auth', require('./routes/auth'));

app.use(express.json({extended: true}));


mongoose.connect(
  "mongodb+srv://proskuryakoff:1234567890@main-cluster.qja21.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(result =>{
  app.listen(4000, () => console.log('Server has been started!'));
})
.catch(err => console.log(err));



// app.listen(4000, () => console.log("Server has been started!"));
