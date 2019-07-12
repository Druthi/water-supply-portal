const pgp = require('pg-promise')();
var dbDetails = require('../config.js');
let username = dbDetails.username;
let password = dbDetails.password;
var db = pgp(`postgres://${username}:${password}@localhost:5432/water_supply`);

db.connect()
    .then(function (obj) {
      console.log("Connected")
        obj.done(); // success, release connection;
    })
    .catch(function (error) {
        console.log("ERROR:", error.message);
    });

getData = async (callback) => {
        try {
            const connections = await db.any('SELECT * FROM connections');
            callback(null, connections);
        }
        catch(e) {
           if(e){
               console.log(e);
               callback(e, null);
           }
        }
    }
module.exports.getData = getData;