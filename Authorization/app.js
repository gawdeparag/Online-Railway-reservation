var express = require('express');
var mongoose = require('mongoose');
var app = express();

const PORT = process.env.PORT || 3002;

var userDetails = require('./routes/User');
app.use('/User', userDetails);

app.get('/',(req, res)=>{
    res.send("Welcome to Authorization");
});

app.listen(PORT, ()=>{console.log("Server listening at" + PORT)});



