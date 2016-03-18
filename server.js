//Packages & port
var express = require("express");
var bodyparser = require("body-parser");
var logger = require('morgan');
var PORT = process.env.PORT || 9001;
var app = express();

//Use logger and public folder
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

//DB connection
var db = 'mongodb://localhost/ownit';
mongoose.connect(db)

//Listen
app.listen(PORT, function() {
  console.log("LISTENING ON %s", PORT);
});