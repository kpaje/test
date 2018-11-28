

// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const API_KEY = 'trilogy';
const request = require('request');

var port = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());
server.use(express.urlencoded({
    extended: false
}));

server.get('/', function (req, res) {
    res.json({
        "speech": 'We are happy to see you using Chat Bot Webhook'
    });
});


// function getMovie() {
//     movieName = "The Matrix";
//     url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
//     request(url, function (err, res, body) {
//         if (!err && res.statusCode === 200) {
//             var jsonData = JSON.parse(body);
//             var data = {
//                 "Title:": jsonData.Title,
//                 "Year:": jsonData.Year,
//                 "Director:": jsonData.Director,
//             };
//             // return data;
//         }
//         var title = data["Title:"]
//         var year = data["Year:"]
//         var director = data["Director:"]
//         var result = "The movie, " + title +
//             "(" + year + ")" +
//             ", was directed by " +
//             director

//         var responseObj = {
//             "speech": result,
//         };
//         console.log(responseObj)
//     })
// }

// var responseObj;
// server.post('/webhook', function (req, res) {
//     if (!req.body) return res.sendStatus(400);
//     res.setHeader('Content-Type', 'application/json');
//     res.json(responseObj)
// });


//CARD OBJECT FORMAT
//===================

// "messages": [
//     {
//       "buttons": [
//         {
//           "postback": "Card Link URL or text",
//           "text": "Card Link Title"
//         }
//       ],
//       "imageUrl": "http://urltoimage.com",
//       "platform": "facebook",
//       "subtitle": "Card Subtitle",
//       "title": "Card Title",
//       "type": 1
//     }
//   ]






server.post('/webhook', function(req,res) {
    movieName = "The Matrix";
    url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var jsonData = JSON.parse(body);
        var data = {
          "Title:": jsonData.Title,
          "Website:": jsonData.Website,
          "Poster:": jsonData.Poster,
          "Director:": jsonData.Director,
        };
        var title = data["Title:"]
        var poster = data["Poster:"]
        var url = data["Website:"]
        var plot = data["Plot:"]

    } else {
        console.log(error);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "messages": [
            {
              "buttons": [
                {
                  "postback": url,
                  "text": "Card Link Title"
                }
              ],
              "imageUrl": poster,
              "subtitle": plot,
              "title": title,
              "type": 1
            }
          ]
    })); 
    })
})

// server.get('/webhook', function(req,res) {
//     movieName = "The Matrix";
//     url = "http://www.omdbapi.com/?t=" + movieName + "&apikey=" + API_KEY;
//     request(url, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         var jsonData = JSON.parse(body);
//         var data = {
//           "Title:": jsonData.Title,
//           "Year:": jsonData.Year,
//           "IMDB Rating:": jsonData.imdbRating,
//           "Director:": jsonData.Director,
//         };
//     } else {
//         console.log(error);
//     }
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({
//         "speech" : data["Title:"],
//         "displayText" : "The movie, " + data["Title:"]
//     })); 
//     })
// })




server.listen(port, function () {
    console.log("Chatbot Test Server is up and running...");
});