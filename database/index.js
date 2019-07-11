const pgp = require('pg-promise')();
var dbDetails = require('../config.js');
let username = dbDetails.username;
let password = dbDetails.password;
var db = pgp(`postgres://${username}:${password}@localhost:5432/connections`);

db.connect()
    .then(function (obj) {
      console.log("Connected")
        obj.done(); // success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });


module.exports = db;