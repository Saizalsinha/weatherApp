const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "" ; //Write your api key here
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const imageURL = "http://openweathermap.org/img/wn/"+ weatherData.weather[0].icon +"@2x.png";
      res.write("<p>The weather is currently "+description+"<p>");
      res.write("<h1>The temperature at "+ query +" is "+temp+" degrees Celcius.</h1>");
      res.write("<img src="+imageURL+" >");
      res.send();
    })
  })

});

app.listen(3000,function(){
  console.log("Server started");
});
