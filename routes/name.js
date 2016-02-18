var express = require('express');
var router = express.Router();
var path = require('path');
var nameArray = [];
var pg = require('pg');
var connectionString = require('./connection');


router.get('/', function(req, res) {
    //res.send({message: 'hello'});
    res.send(nameArray);
    console.log(nameArray);
});



//
//router.post('/', function(req, res) {
//    nameArray.push(req.body.name);
//    console.log(nameArray);
//    res.send(nameArray);
//});

//router.post('/', function(req, res) {
//    nameArray.push(req.body.first_name + ' ' + req.body.last_name);
//    console.log(nameArray);
//    res.send(animalArray);
//});

router.post('/', function(req, res, done) {
   var addPerson = {
       first_name: req.body.first_name,
       last_name: req.body.last_name
   };
    // Updated client.query(first name & last name) & VALUES maybe add after values: RETURNING id
    pg.connect(connectionString, function(err, client) {
        client.query("INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING person_id",
            [addPerson.first_name, addPerson.last_name],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {

                    addPerson.id = result.rows[0].person_id;
                    res.send(addPerson);
                }
            });
    });

});



module.exports = router;