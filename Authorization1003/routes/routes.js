const express = require('express');
const { Router } = require('express');
const Controller = require('../controllers/controller');



const router = Router();



/** 
 *  @swagger
 *  /signup:
 *  get:
 *      summary: "To register to the system"
 *      responses: 
 *          '200':
 *              description: A successful response
 */

router.get('/signup', Controller.signup_get);


/**
 * @swagger
 * /signup:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
router.post('/signup', Controller.signup_post);

/** 
 *  @swagger
 *  /login_get:
 *  get:
 *      summary: "To get login"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
router.get('/login', Controller.login_get);

/**
 * @swagger
 * /login:
 *   post:
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object                      
 *     responses:
 *       200:
 *         description: Returns the requested user
 */
router.post('/login', Controller.login_post);



router.get('/logout', Controller.logout_get);


router.post('/api/posts', verifyToken, (req, res) => { 

jwt.verify(req.token, 'secretkey', (err, authData) => {

if(err) {

res.sendStatus(403);

} else {

res.json({

message: 'Post created...',

authData

});

}

});

});



// Verify Token

function verifyToken(req, res, next) {

// Get auth header value

const bearerHeader = req.headers['authorization'];

// Check if bearer is undefined

if(typeof bearerHeader !== 'undefined') {

// Split at the space

const bearer = bearerHeader.split(' ');

// Get token from array

const bearerToken = bearer[1];

// Set the token

req.token = bearerToken;

// Next middleware

next();

} else {

// Forbidden

res.sendStatus(403);

}

}

router.post('/signup', function(req, res) {

bcrypt.hash(req.body.password, 10, function(err, hash){

if(err) {

return res.status(500).json({

error: err

});

}

else {

const user = new userModel({

full_name: req.body.full_name,

email_address: req.body.email_address,

password: hash,

mobile_number: req.body.mobile_number 

});

user.save().then(function(result) {

console.log(result);

res.status(200).json({

success: 'New user has been created..'

});

}).catch(error => {

res.status(500).json({

error: err

});

});

}

});

});




router.post('/signin', function(req, res){



userModel.findOne({email_address: req.body.email_address})

.exec()

.then(function(user) {

bcrypt.compare(req.body.password, user.password, function(err, result){

if(err) {

return res.status(401).json({

failed: 'Unauthorized Access'

});

}

if(result) {

const JWTToken = jwt.sign({

email_address: user.email_address,

},

'secretkey',

{

expiresIn: '2h'

});

return res.status(200).json({

success: 'Welcome to the JWT Auth',

token: JWTToken

});

}

return res.status(401).json({

failed: 'The Password is incorrect.'

});

});

})

.catch(error => {

res.status(500).json({

failed: "This Email-ID does not exist."

});

});

});

module.exports = router;