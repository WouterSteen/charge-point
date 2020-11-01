'use strict';

var request = require("request");
var config = require("dotenv").config();

export function handler(event, context, callback) {

  // Set the root URL according to the Netlify site we are within
  // chargepointId = chargepointid

  var rootURL =  'https://www.oplaadpalen.nl/api/maplist/clusterset?box=53.19767480278687,6.583232581615448,53.19902288146508,6.585383713245393&zoom=19&accessType=public,company&available=available,charging&power=fast,normal';

  // post the new route to the Routes form
  request.post({'url': rootURL}, function(err, httpResponse, body) {
    var statusMessage = true;
    if (statusMessage) {
      statusMessage = "Je laadpaal is vrij! Go Go Go";
    } else {
      statusMessage = "Chips, de laadpaal is bezet";
      statusMessage = httpResponse;
    }

    // tell the user what their shortcode will be
    return callback(null, {
      statusCode: 200,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"message": statusMessage})
    })
  });

}

