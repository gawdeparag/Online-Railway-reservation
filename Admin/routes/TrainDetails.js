/*
express
mongoose
router
app.get
app.post
*/

var express = require('express');
var mongoose = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var TrainSch = require('../Model/TrainDetails');

router.use(express.json());

// /trains
router.get('/', (req, res)=> {
    res.send("Hello Bharatiya rail");
});

// /trains/get-train-details
router.post('/', (req, res)=> {
    //res.send(req.body);
    TrainSch.create(req.body).then( (train)=>{
        res.send(train)}).catch((err)=>{
            res.send(err)
        });

    console.log("New Data added");
});


module.exports = router;
