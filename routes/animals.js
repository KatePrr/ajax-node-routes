var express = require('express');
var router = express.Router();
var path = require('path');
var animalArray = [];

function randomIndex(array){
    var index = randomNumber(0, array.length - 1);
    return array[index];
}
function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}


router.get('/', function(req, res) {
    //res.send({message: 'hello'});
    res.send(animalArray);
});


router.get('/random', function(req, res) {
    //res.send({message: 'hello'});
    res.send(randomIndex(animalArray));
});

router.post('/', function(req, res) {
    animalArray.push(req.body.spiritAnimal)
    console.log(animalArray);
    res.send(animalArray);
});



module.exports = router;