var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var UserSch = require('../Model/UserSchema');
const bcrypt = require('bcrypt');
router.use(bodyParser.json());

//Passenger Database Link
var dbURI = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/PassengerDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });
console.log('PassengerDB connected');

//get
router.get('/', (req, res)=>{
    res.send("Hello User!");
});

//post-Signup
router.post('/Signup', (req, res)=> {
    //res.send(req.body);


    //Data added to Database
    UserSch.create(req.body).then( (NewUser)=>{
        res.send(NewUser)}).catch((err)=>{
        res.send(err)});

    res.send(req.body);
});

module.exports = router;

