var express = require('express');
var auth    = require('./auth.js');
var car     = require('./car.js');
var card    = require('./card.js');
var note    = require('./note.js');
var user    = require('./user.js');

var router  = express.Router();

//Login & Signup before authentication
router.post('/api/login', auth.login);
router.post('/api/signup', auth.signUp);


//API Authentication
router.all("/*", auth.validateAuth);

//API
router.get('/api/user/getsingle', user.userObject);
router.get('/api/car/getsingle/:carId', car.getCar);
router.get('/api/car/getmulti', car.getCars);
router.get('/api/card/getsingle/:cardId', card.getCard);
router.get('/api/card/getmulti/:carId', card.getCards);
router.get('/api/note/getmulti/:carId', note.getNotes);
router.post('/api/user/updateemail', user.updateEmail);
router.post('/api/user/updatepass', user.updatePass);
router.post('/api/car/upload/:carId', car.upload);
router.post('/api/car/add', car.addCar);
router.post('/api/car/edit/:carId', car.editCar);
router.post('/api/card/edit/:cardId', card.editCard);
router.post('/api/card/add/:carId', card.addCard);
router.post('/api/logout', auth.logout);
router.post('/api/note/add/:carId', note.addNote);
router.post('/api/card/del/:carId', card.delCards);
router.post('/api/note/del/:carId', note.delNotes);
router.delete('/api/car/del/:carId', car.delCar);
router.delete('/api/user/del', user.deleteAccount);


//Static
//Every URL pointing to a correct path can retrieve files from public
router.all('/*', express.static(__dirname + '../../../public'));

//Anything that doesn't exist in public with pull the angular index and run the app
router.all('/*', function(req, res){
	res.sendFile('public/index.html',{root: __dirname + '../../../'});
});



module.exports = router;