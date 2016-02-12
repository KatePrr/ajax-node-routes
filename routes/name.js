var express = require('express');
var router = express.Router();
var path = require('path');
var nameArray = [];

function randomIndex(array){
    var index = randomNumber(0, array.length - 1);
    return array[index];
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}


router.get('/', function(req, res) {
    //res.send({message: 'hello'});
    res.send(nameArray);
    console.log(nameArray);
});


router.get('/random', function(req, res) {
    //res.send({message: 'hello'});
    res.send(randomIndex(nameArray));
    console.log(nameArray);
});




router.post('/', function(req, res) {
    nameArray.push(req.body.name);
    console.log(nameArray);
    res.send(nameArray);
});





module.exports = router;