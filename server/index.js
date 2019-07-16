const express = require('express');
let app = express();
const morgan = require('morgan');
var bodyParser = require('body-parser');
var db = require ('../database/index');
var fs = require('fs');


app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/../client/dist'));
app.get('/connections', (req,res) =>{
  db.getData((err, data) => {
    if(err) {
      res.sendStatus(404);
    }else{
      res.status(200).json(data);
    }
  });
});


let port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});