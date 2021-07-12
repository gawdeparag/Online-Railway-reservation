const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/middleware');
const axios = require('axios');


const app = express();

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//Extended https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Railway Reservation system',
            description: 'Booking of online tickets',
            contact: {
                name: "Onkar K"
            },
            servers: ["http://localhost:1003"]
        }
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/AuthenticationDB?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(1003))
    .catch((err) => console.log(err));


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/tickets', requireAuth, (req, res) => res.render('tickets'));


app.get("/main");
// app.get("/userhome", requireAuth);

app.get("/main", (req, res) => {
    axios.get("http://localhost:1000/admin").then((response) => {
        // console.log(response.data);
        var service = response.data;
        res.send(service);
    }).catch((err) => {
        console.log(err.message);
    })
})
app.use(routes);

module.exports = app;