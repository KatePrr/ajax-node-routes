var express = require('express');
var router = express.Router();
var path = require('path');
var animalArray = [];
var pg = require('pg');
var connectionString = require('./connection');


router.get('/', function(req, res) {
    //res.send({message: 'hello'});
    res.send(animalArray);
});


//router.post('/', function(req, res) {
//    animalArray.push(req.body.spiritAnimal)
//    console.log(animalArray);
//    res.send(animalArray);
//});


router.post('/', function(req, res, done) {
    var addAnimal = {
        animal_name: req.body.animal_name,
        animal_color: req.body.animal_color,
        person_id: req.body.id
    };
    // Updated client.query(first name & last name) & VALUES maybe add after values: RETURNING id
    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animals (animal_name, animal_color) VALUES ($1, $2) RETURNING animal_id",
            [addAnimal.animal_name, addAnimal.animal_color],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    var animal_id = result.rows[0].animal_id;
                    client.query("UPDATE people SET animal_id = $1 WHERE person_id = " + addAnimal.person_id ,
                    [animal_id],
                    function (err, result) {
                        done();
                        if (err) {
                            console.log('Error inserting animal id: ', err);
                            res.send(false);
                        } else {
                            res.send(result);
                        }
                    });
                }
            });

    });


});


module.exports = router;