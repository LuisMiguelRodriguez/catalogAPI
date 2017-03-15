var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');

// Create Database Object Needs name Of Database
// and name of collection/collections
var db = mongojs('mongodb://localhost/catalog',['products']);

app.get('/', function(req, res){
  res.send('It Works');
});

app.get('/products', function(req, res){
    console.log('Fetching Products...');
    db.products.find(function(err, docs){
      if(err) {
        res.send(err);
      } else {
        console.log('Sending Products...');
        res.json(docs);
      }
    });
});

app.get('/products/:id', function(req, res){
    console.log('Fetching Products...');
    db.products.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
      if(err) {
        res.send(err);
      } else {
        console.log('Sending Products...');
        res.json(doc);
      }
    });
});

app.listen(3000);
console.log("Server is Running on port 3000");
