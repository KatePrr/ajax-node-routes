var express = require('express');
var router = express.Router();
var path = require('path');
var animalArray = [];

function randomIndex(array){
    var index = randomNumber(0, array.length);
    return array[index];
}
function randomNumber(min, max){
    return Mathfloor(Math.random() * (1 + max - min) + min);
}


router.get('/', function(req, res) {
    res.send({message: 'hello'});
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});



module.exports = router;