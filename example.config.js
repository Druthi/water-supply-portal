/*
Instructions:
1. Enter username and password required to connect to postgres database.
2. Rename file to config.js
*/
var db = {
  development:{
    username:'ENTER_USERNAME',
    password:'ENTER_PASSWORD'
  },
  production:{
  }
}

let mode = 'development';


module.exports.username = db[mode].username;
module.exports.password = db[mode].password;