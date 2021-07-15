const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const trainRoutes = require('./Routes/train');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const app = express();
const PORT = 5002;

app.use('/', trainRoutes);
app.use(bodyParser.json())
app.use(cookieParser)

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Railway Reservation',
            description: 'Railway Reservation info',
            contact: {
                name: 'Parag G'
            },
            server: ["http://localhost:5002"]
        }
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const dbURI = "mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/orr-train?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
console.log("Connected to Train-Database");

app.listen(PORT, () => {
    console.log(`Train-service started at ${PORT}`);
});

module.exports = app;