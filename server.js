require('dotenv').config();
var express = require("express"),
    http = require("http"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express(),
    port = process.env.PORT || 3000,
    uri = process.env.MONGOLAB_URI;

app.use(express.static(__dirname+"/client"));
app.use(bodyParser.urlencoded({"extended": true}));

mongoose.connect(uri);

var zSchema = mongoose.Schema({
   name: String,
   answer: String
});

var zalupa = mongoose.model("zalupa", zSchema);

http.createServer(app).listen(port);

app.get("/index.html/json", function(req, res){
      zalupa.find({}, function(err, result){
         if(err !== null){res.send("ERROR");}
         res.json(result);
      });
});

app.post("/index.html", function(req, res){
      var newZalupa = new zalupa({"name":req.body.name, "answer": req.body.answer});
      newZalupa.save(function(err, result){
         if(err !== null){
            console.log(err);
            res.send("ERROR");
         }else{
            zalupa.find({}, function(err, result){
               if(err !== null){ res.send("ERROR");}
               res.json(result);
            });
         }
      });
});
