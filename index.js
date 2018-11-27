// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const API_KEY = 'trilogy';
const request = require('request');

var port = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));

server.get('/',function(req,res){
    res.json({"speech":'We are happy to see you using Chat Bot Webhook'});
  });

server.post('/webhook', function(req,res) {
    if(!req.body) return res.sendStatus(400);
    var dialog = result;
    res.setHeader('Content-Type', 'application/json');
    let responseObj = {
        "speech": dialog,
        };
    return res.json(responseObj);
});

var result = "";

// var cb = function(err, res, body) {
//     if (!err && res.statusCode === 200) {
//         var jsonData = JSON.parse(body);
//         var data = {
//             "Title:": jsonData.Title,
//             "Year:": jsonData.Year,
//             "IMDB Rating:": jsonData.imdbRating,
//             "Director:": jsonData.Director,
//         };
//     }
//         result = "The movie, " + data["Title:"]
//         console.log('cb result: ', result)
//         // return result
//       }

function getMovie() {
    movieName = "Mr Nobody";
    url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
    request.get(url, function(err, res, body) {
        if (!err && res.statusCode === 200) {
            var jsonData = JSON.parse(body);
            var data = {
                "Title:": jsonData.Title,
                "Year:": jsonData.Year,
                "IMDB Rating:": jsonData.imdbRating,
                "Director:": jsonData.Director,
            };
        }
            result = "The movie, " + data["Title:"] 
            + "(" + data["Year:"] + ")" 
            + ", was directed by " 
            + data["Director:"]
            return result
          })
};
getMovie()


// function getMovie() {
//     movieName = "Mr Nobody";
//     url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
//     request(url, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//         var jsonData = JSON.parse(body);
//         var data = {
//             "Title:": jsonData.Title,
//             "Year:": jsonData.Year,
//             "IMDB Rating:": jsonData.imdbRating,
//             "Director:": jsonData.Director,
//         };
//         return data;
//     }
// })
// }

server.listen(port, function () {
    console.log("Chatbot Test Server is up and running...");
});