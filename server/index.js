const express = require('express');
let app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require ('../database/index')


app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/../client/dist'));


let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});