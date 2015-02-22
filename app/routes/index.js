var express = require('express');
var auth    = require('./auth.js');
var car     = require('./car.js');
var card    = require('./card.js');
var note    = require('./note.js')
var user    = require('./user.js');

var router  = express.Router();

//Login & Signup before authentication
router.post('/api/login', auth.login);
router.post('/api/signup', auth.signUp);


//API Authentication
router.all("/*", auth.validateAuth);

//API
router.get('/api/user', user.userObject);
router.get('/api/getcar/:carId', car.getCar);
router.get('/api/getcars', car.getCars);
router.get('/api/getcard/:cardId', card.getCard);
router.get('/api/getcards/:carId', card.getCards);
router.get('/api/getnote/:carId', note.getNote);
router.get('/api/getnotes/:carId', note.getNotes);
router.post('/api/uploadcar/:carId', car.upload);
router.post('/api/addcar', car.addCar);
router.post('/api/editcar/:carId', car.editCar);
router.post('/api/editcard/:cardId', card.editCard);
router.post('/api/addcard/:carId', card.addCard);
router.post('/api/logout', auth.logout);
router.post('/api/addnote/:carId', note.addNote);
router.post('/api/delcards/:carId', card.delCards);
router.post('/api/delnotes/:carId', note.delNotes);


//Static
//Every URL pointing to a correct path can retrieve files from public
router.all('/*', express.static(__dirname + '../../../public'));

//Anything that doesn't exist in public with pull the angular index and run the app
router.all('/*', function(req, res){
	res.sendFile('public/index.html',{root: __dirname + '../../../'});
});



module.exports = router;