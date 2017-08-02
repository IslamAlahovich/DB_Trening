var main = function(RecordsObj){
   "use strict";
   $("main").append($("<input>").attr("class", "name"));
   $("main").append($("<button class='Y'>").text("Y"));
   $("main").append($("<button class='N'>").text("N"));
   $("main").append($("<div>").attr("class", "records_box"));
   $("main div").append($("<ul>").attr("class", "records"));

   var Records = RecordsObj;
   Records.forEach(function(rec){
      $("main .records").append($("<li>").text(rec.name+" : "+rec.answer));
   });
   
   $("main .Y").on("click", function(event){
      var $name = $("main .name").val(), $newRecord;
      $.post("/index.html", {"name": $name,"answer": "Y"}, function(response){
         console.log(response);
      });
      $newRecord = $("<li>").text($name+" : "+"Y").hide();
      $("main .records").append($newRecord.fadeIn());
      $("main .name").val("");
   });
 
   $("main .N").on("click", function(event){
      var $name = $("main .name").val(), $newRecord;
      $.post("/index.html", {"name": $name,"answer": "N"}, function(response){
         console.log(response);
      });
      $newRecord = $("<li>").text($name+" : "+"N");
      $newRecord.hide();
      $("main .records").append($newRecord);
      $newRecord.fadeIn();
      $("main .name").val("");
   });
};
$(document).ready(function(){
   $.getJSON("index.html/json", function(RecordsObj){
      main(RecordsObj);
   });
});
