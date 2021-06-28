/**
 * Passenger DB:
 *  - GET & PUT
 * 
 * Get Train List:
 * 
 */

 var express = require('express');
 var mongoose = require('mongoose');
 var axios = require('axios');
 var router = express.Router();


 var trainDBURI = 'mongodb+srv://OnkarK:731998@cluster0.09ywx.mongodb.net/PassengerDB?retryWrites=true&w=majority';
 mongoose.connect(trainDBURI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true });
 console.log('TrainDB connected');

// /** 
//  *  @swagger
//  *  /{id}:
//  *  get:
//  *      summary: "To get the list of all trains"
//  *      parameters:
//  *            - in: path
//  *              name: id
//  *              schema:
//  *                  type: string
//  *              required: true
//  *      responses: 
//  *          '200':
//  *              description: A successful response
//  */

//GET Train List By ID
router.get('/:id', (req,res)=>{
  //console.log(req.params.id);
  axios.get('http://localhost:1000/admin/' +  req.params.id).then((response)=>{
    res.send(response.data);
  }).catch(err => {
    if(err){
      throw err;
    }
  });
});

/**
    * @swagger
    * /{id}:
    *   put:
    *     parameters:
    *       - in: path
    *         name: id
    *         type: string
    *     requestBody:
    *       content:
    *         application/json: 
    *             schema:
    *                type: object
    *     responses:
    *         200:
    *           description: put train by ID
*/

//PUT user data
router.put('/:id', (req, res, next)=>{
  UserSchema.findByIdAndUpdate({_id: req.params.id}, req.body).then((reposnse)=>
  res.send(response)).catch((err)=> console.log(err));
  res.send(req.body);
});


module.exports = router;