//Packages & port
var express = require("express");
var bodyparser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var PORT = process.env.PORT || 9001;
var app = express();

//Use logger and public folder
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

//DB connection
var db = "mongodb://localhost/ownit";
mongoose.connect(db);
var User = require("./models/user.js");
var Review = require("./models/review.js");
var Item = require("./models/item.js");

//routes
app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.post("/createUser", function(req, res) {
  var newUser = new User(req.body);
  newUser.save(function(err, newUser) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(newUser);
    }
  });
});

app.post("/login", function(req, res) {
  User.findOne({
    "username": req.body.username
  })
  .exec(function(err, user) {
    if (err) {
      console.log('error');
      res.send(err);
    }else{
      console.log(user);
      res.send(user);
    }
  })
});

app.post("/addItem", function(req, res) {
  console.log(req.body);
  var newItem = new Item(req.body);
  newItem.save(function(err, newItem) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(newItem);
    }
  });
});

app.get("/items", function(req, res) {
  console.log(req.body);
  Item.find(function(err, docs){
    if (err){
      console.log(err);
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

app.post("/addMoney/:id", function(req, res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, {wallet: req.body.wallet}, {new: true}, function(err, doc){
    if (err){
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

app.post("/buyItem/:id", function(req, res){
  console.log("req.body:")
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, {$push: {ownedItems: req.body.itemId}}, {safe: true, upsert: true}, function(err, doc) {
      if (err){
        console.log(err);
      }else {
      res.send(doc);
    }
  });
});

//Listen
app.listen(PORT, function() {
  console.log("LISTENING ON %s", PORT);
});