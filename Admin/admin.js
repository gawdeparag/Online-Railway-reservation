var express = require('express');
var mongoose = require('mongoose');
var app2 = express();

mongoose.connect('mongodb+srv://OnkarK:<731998>@cluster0.09ywx.mongodb.net/AdminDB?retryWrites=true&w=majority', ()=> console.log("AdminDB connected!"));

app2.get('/' , (req, res) => {
    res.send("Hello from Admin")
});

app2.listen(3001, ()=>console.log("Server listening at 3001"));