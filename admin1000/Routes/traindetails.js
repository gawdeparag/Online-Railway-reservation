var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var trainSchema = require('../Model/TrainSchema');

router.use(express.json());

var trainDBURI = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/TrainDB?retryWrites=true&w=majority';
mongoose.connect(trainDBURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});
console.log('TrainDB connected');



/**
 * @swagger
 * definitions:
 *  trains:
 *   type: object
 *  properties:
 *    TrainName:
 *     type: string
 *     description: details of trains
 *     example: 'Rajdhani Express'
 *    TrainNumber:
 *     type: string
 *     description: Train number
 *     example: 'RJ12356'
 *    TrainSrc:
 *     type: string
 *     description: Source train
 *     example: 'Mumbai'
 *    TrainDes:
 *     type: string
 *     description: Destination
 *     example: 'Pune'
 */

/** 
 *  @swagger
 *  /admin/:
 *   get:
 *      summary: "To get the list of all trains"
 *      responses: 
 *          '200':
 *              description: A successful response
 */

router.get('/', function (req, res) {

    trainSchema.find().then((trainSchema) => {
        res.json(trainSchema)
    }).catch(err => {
        if (err) {
            throw err;
        } else {
            res.status(200).send("Tickets")
        }
    });
});




/**
 * @swagger
 *  /admin/post-train-details:
 *    post:
 *     summary: Creates a new train.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: train
 *         description: The train to create.
 *         schema:
 *           $ref: '#/definitions/trains'     
 *    responses:
 *        200:
 *          description: OK
 */


//UpdateNewTrain
router.post('/post-train-details', (req, res) => {
    trainSchema.create(req.body).then((newTrain) => {
        res.send(newTrain)
    }).catch(err => {
        if (err) {
            throw err;
        } else {
            res.status(200).send("error")
        }
    });
});

/** 
 *  @swagger
 *  /admin/{id}:
 *  get:
 *      summary: "To get the list of all trains"
 *      parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *      responses: 
 *          '200':
 *              description: A successful response
 */


//Find Train By ID
router.get('/:id', (req, res) => {

    trainSchema.findById(req.params.id).then((trainSchema) => {

        if (trainSchema) {
            res.json(trainSchema)
        } else {
            res.sendStatus(404)
        }

    }).catch(err => {
        if (err) {
            throw err;
        } else {
            res.sendStatus(200).send("tickets")
        }
    })
});

/**
 * @swagger
 * /admin/{id}:
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     requestBody:
 *       content:
 *         application/json: 
 *             schema:
 *                $ref: '#/definitions/trains' 
 *     responses:
 *         200:
 *           description: put train by ID
*/


//Find By ID & Update
router.put('/:id', (req, res, next) => {
    trainSchema.findByIdAndUpdate({
        _id: req.params.id
    }, req.body).then((reposnse) =>
        res.send(response)).catch((err) => console.log(err));
    res.send(req.body);
});


/**
     * @swagger
     * /admin/{id}:
     *   delete:
     *     parameters:
     *      - in: path
     *        name: id
     *        type: string
     *     description: Delete Train 
     *     responses:
     *       200:
     *         description: Returns the requested admin
     */
 router.delete('/:id', function(req, res) {
    trains.findByIdAndDelete(req.params.id).then(() => {
        res.send('Train deleted')

    }).catch(err => {
        if (err) {
            res.sendStatus(404);
        }
    })

})


module.exports = router;