const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
var BodyP = require('body-parser');

//app.use(BodyP.json());
const app = express();

var PassURL = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/PassengerDB?retryWrites=true&w=majority'
mongoose.connect(PassURL, ()=>{console.log("PassengerDB connected!")});



app.get('/', (req, res) => {
    res.send("Hello from Indian Railways");
});

app.get('/Passenger',(req, res)=>{
    res.send("Passenger Responding OK")
});

app.listen(8080, ()=>{
    console.log("Server is runnning!");
});