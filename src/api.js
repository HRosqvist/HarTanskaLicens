const emoji = require('node-emoji')
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
	res.writeHead(200, {'content-type': 'text/html; charset=utf-8'});
  if (checkLicense()) {
	  res.write('<h1 style="text-align:center;">Caroline Tanska har licens i år! ' + emoji.emojify(':white_check_mark:') + '</h1>')
	  res.end();
  } else {
	  res.write('<h1 style="text-align:center;">Caroline Tanska har inte licens i år! ' + emoji.emojify(':x:') + '</h1>')
	  res.end();
  }
});

function checkLicense() {
	return false;
}

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);