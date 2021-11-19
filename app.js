const express = require('express');

mongoose.connect(
    "mongodb+srv://proskuryakoff:<password>@main-cluster.qja21.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { 
        useNewUrlParser: true , 
        useUnifiedTopology: true  
    }
)

const server = express();

server.listen(3000, () => console.log("Server has been started!"));