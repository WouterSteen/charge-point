'use strict';

var request = require("request");
var config = require("dotenv").config();

export function handler(event, context, callback) {

  // Set the root URL according to the Netlify site we are within
  var rootURL =  process.env.URL + "/";

  // post the new route to the Routes form
  request.post({'url': rootURL, 'formData': payload }, function(err, httpResponse, body) {
    var statusMessage;
    if (statusMessage) {
      statusMessage = "Je laadpaal is vrij! Go Go Go";
    } else {
      statusMessage = "Chips, de laadpaal is bezet";
    }
    
    // tell the user what their shortcode will be
    return callback(null, {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"message": statusMessage})
    })
  });

}

