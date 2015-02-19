var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var car = require('./car.js');
var card = require('./card.js');
var note = require('./note.js')
var user = require('./user.js');

router.post('/api/login', auth.login);

router.post('/api/signup', auth.signUp);


//API Authentication
router.all("/*", auth.validateAuth);

//API
router.post('/api/logout', auth.logout);
router.get('/api/getcars', car.getCars);
router.get('/api/getcar/:carId', car.getCar);
router.get('/api/getcards/:carId', card.getCards);
router.post('/api/addcar', car.addCar);
router.post('/api/editcar/:carId', car.editCar);
router.post('/api/addcard/:carId', card.addCard);
router.get('/api/getcard/:cardId', card.getCard);
router.post('/api/addnote/:carId', note.addNote);
router.post('/api/delcards/:carId', card.delCards);
router.post('/api/delnotes/:carId', note.delNotes);
router.get('/api/getnote/:carId', note.getNote);
router.get('/api/getnotes/:carId', note.getNotes);
router.post('/api/uploadcar/:carId', car.upload);
router.get('/api/user', user.userObject);

//Static
//Every URL pointing to a correct path can retrieve files from public
router.all('/*', express.static(__dirname + '../../../public'));

//Anything that doesn't exist in public with pull the angular index and run the app
router.all('/*', function(req, res){
	res.sendFile('public/index.html',{root: __dirname + '../../../'});
});



module.exports = router;