const express = require('express'),
    server = express(),
    mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://proskuryakoff:1234567890@main-cluster.qja21.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true , 
        useUnifiedTopology: true  
    }
)

server.listen(4000, () => console.log("Server has been started!"));