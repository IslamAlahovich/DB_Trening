var express = require("express"),
http = require("http"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

app.use(express.static(__dirname+"/client"));
app.use(bodyParser.urlencoded({"extended": true}));

mongoose.connect('mongodb://localhost/db_test');

var zSchema = mongoose.Schema({
   name: String,
   answer: String
});

var zalupa = mongoose.model("zalupa", zSchema);

http.createServer(app).listen(3000);

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
