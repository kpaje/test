// dependencies
const express = require('express');
const bodyParser = require('body-parser');
const API_KEY = 'trilogy';
const request = require('request');
require('dotenv').config();

   const projectId = 'jerb-535c3'; 
   const sessionId = '123456';
   const languageCode = 'en-US';

   const dialogflow = require('dialogflow');

   const config = {
     credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
     }
   };

   const sessionClient = new dialogflow.SessionsClient(config);

   const sessionPath = sessionClient.sessionPath(projectId, sessionId);


var port = process.env.PORT || 8080;
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.get('/',function(req,res){
    res.json({"displayText":'We are happy to see you using Chat Bot Webhook'});
  });

server.post('/webhook', function(req,res) {
    console.log("Post request received");
    if(!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'application/json');
    console.log("Dialog Flow Post Request: " + req.body);
    let response = " ";
    let responseObj = {
            // "fulfillment": {
            //     "speech": "webhook success - speach",
            //     "messages": [
            //       {
            //         "type": 0,
            //         "speech": "webhook success - messages"
            //       }
            //     ]
            //   }
            // "speech": "this text is spoken out loud if the platform supports voice interactions",
            "displayText": "this text is displayed visually",
          };
          return res.json(responseObj);
    })


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
// console.log(getMovie())

// server.get('/webhook', function(req,res) {
//     movieName = "Mr Nobody";
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
//         speech: data["Title:"],
//         displayText: "The movie, " + data["Title:"]
//     })); 
//     })
// })

server.listen(port, function () {
    console.log("Chatbot Test Server is up and running...");
});