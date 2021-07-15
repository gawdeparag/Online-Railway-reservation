var express = require('express');
var user = require('./Routes/user');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = 5003;

var app = express();
app.use('/', user);

var dbURI = "mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/orr-user?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
console.log("TrainDB connected");

// Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Railway Reservation',
            description: 'Railway Reservation info',
            contact: {
                name: 'OnkarK'
            },
            servers: ["http://localhost:5003"]
        }
    },
    apis: ['routes/*js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//console.log(swaggerDocs)

app.listen(PORT, () => { console.log(`User service started at ${PORT}`) });

module.exports = app;