var express = require('express');
var app = express();
var mongojs = require('mongojs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Create Database Object Needs name Of Database
// and name of collection/collections
var db = mongojs('mongodb://localhost/catalog',['products']);

app.use(bodyParser.json());

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

app.post('/products', function(req, res){
  db.products.insert(req.body, function(err, doc){
    if(err){
      console.log("HELLO WE HAVE A PROBLEM");
      res.send(err);
    } else {
      console.log('Adding Product....');
      res.json(doc);
    }
  });
});

app.put('/products/:id', function(req, res){
  db.products.findAndModify({
  query:{_id: mongojs.ObjectId(req.params.id)},
  update:{$set:{
    name: req.body.name,
    category: req.body.category,
    description: req.body.description
  }},
  new: true
} ,function(err, doc){
    if(err){
      console.log("HELLO WE HAVE A PROBLEM");
      res.send(err);
    } else {
      console.log('Updating Product....');
      res.json(doc);
    }
  });
});

app.delete('/products/:id', function(req, res){
    console.log('Fetching Products...');
    db.products.remove({_id:mongojs.ObjectId(req.params.id)},function(err, doc){
      if(err) {
        res.send(err);
      } else {
        console.log('Deleting Products...');
        res.json(doc);
      }
    });
});

app.listen(3000);
console.log("Server is Running on port 3000");
