// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const API_KEY = 'trilogy';
const request = require('request');

var port = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.get('/',function(req,res){
    res.send('We are happy to see you using Chat Bot Webhook');
  });

server.get('/webhook', function(req,res) {
    movieName = "Mr Nobody";
    url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        var data = {
          "Title:": jsonData.Title,
          "Year:": jsonData.Year,
          "IMDB Rating:": jsonData.imdbRating,
          "Director:": jsonData.Director,
        };
    } else {
        console.log(error);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "speech" : data["Title:"],
        "displayText" : "The movie, " + data["Title:"]
    })); 
    })
})

server.listen(port, function () {
    console.log("Chatbot Test Server is up and running...");
});