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
  //push item into owned items array of buyer
  User.findOneAndUpdate({_id: req.params.id}, {$push: {ownedItems: req.body.itemId}}, {safe: true, upsert: true}, function(err, doc) {
      if (err){
        console.log(err);
      }else {
        Item.findOneAndUpdate({_id: req.body.itemId}, {forSale: false}).exec(function(err, item){
          // console.log("ownerId:")
          // console.log(item.ownerId)
          // console.log("item.price:")
          // console.log(item.price);
          //add money to seller's wallet
          User.find({_id: item.ownerId}, function(err, seller) {
            console.log(seller)
            console.log(seller.wallet);
            console.log(item.price);
            User.findOneAndUpdate({_id: item.ownerId}, {wallet: Number(seller.wallet) + Number(item.price)}, function(err, doc) {
            })
          })
          //remove money form purchaser's wallet
          User.findOneAndUpdate({_id: req.params.id}, {wallet: Number(doc.wallet) - Number(item.price)}, function(err, doc) {
          })
        })
      res.send(doc);
    }
  });
});

//Listen
app.listen(PORT, function() {
  console.log("LISTENING ON %s", PORT);
});