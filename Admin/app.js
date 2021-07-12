/*  admin 
  - signin
  - trainDeatils (trainDB) */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//Routes Connection
var TrainDetails = require('./routes/TrainDetails');
app.use('/trains', TrainDetails);

//body parser configured
app.use(bodyParser.json());

var appURL = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/TrainDB?retryWrites=true&w=majority'
mongoose.connect(appURL, { useNewUrlParser: true }, ()=>{"TrainDB Connected!"});

app.get('/' , (req, res) => {
    res.send("Hello from Admin")
});


app.listen(3001, ()=>console.log("Server listening at 3001"));