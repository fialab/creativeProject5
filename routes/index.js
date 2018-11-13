var express = require('express');
var router = express.Router();

var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/itemDB',{ useNewUrlParser: true }); //Connects to a mongo database called "itemDB"

var itemSchema = mongoose.Schema({ //Defines the Schema for this database
    sellerName: String,
    item: String,
    imageURL: String,
    location: String,
    price: Number,
    
});

var listing = mongoose.model('item', itemSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

/* GET home page. */
router.post('/item', function(req, res, next) {
console.log("POST comment route"); 
console.log(req.body);
var newListing = new listing(req.body);
newListing.save(function(err, result){
    if(err){console.log(err)}
    else{
        res.sendStatus(200);
        console.log(result);
    }
})
});

// router.get('/comment', function(req, res, next){
//     console.log("in get request")
//     Comment.find(function(err, list){
//          if(err){console.log(err)}
//         else{
//             res.json(list);
//         }
        
//     })
// })
router.get('/item', function(req, res, next){
    console.log("in search request")
    console.log(req.query);
    var requestname = req.query["q"];
    console.log(requestname);
    var obj = {};
    if(requestname){
        obj = {Name: requestname};
    }
    listing.find(obj, function(err, list){
         if(err){console.log(err)}
        else{
            res.json(list);
        }
        
    })
})
router.delete('/delete', function(req, res, next){
    console.log("delete route");
    Comment.find().remove(function(){});
})

module.exports = router;
