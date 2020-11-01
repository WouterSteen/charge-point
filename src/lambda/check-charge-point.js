'use strict';

var axios = require("axios");

export function handler(event, context, callback) {

  const spotUrls = ['https://www.oplaadpalen.nl/api/maplist/clusterset?box=53.19767480278687,6.583232581615448,53.19902288146508,6.585383713245393&zoom=19&accessType=public,company&available=available,charging&power=fast,normal',
    'https://www.oplaadpalen.nl/api/maplist/clusterset?box=53.19767480278687,6.583232581615448,53.19902288146508,6.585383713245393&zoom=19&accessType=public,company&available=available,charging&power=fast,normal',
    'https://www.oplaadpalen.nl/api/maplist/clusterset?box=53.19767480278687,6.583232581615448,53.19902288146508,6.585383713245393&zoom=19&accessType=public,company&available=available,charging&power=fast,normal'
  ];


  let spotResults = [];
    Promise.all(spotUrls.map(spotUrl =>
        axios.get(spotUrl)
    ))
    .then(function (results) {

        results.map(function(result) {
            spotResults.push(result.data.data[0].status);
        });

        let returnMessage = 'Alles bezet, zoek een andere met oplaadpalen.nl';
        if (spotResults[2].available > 0) {
            returnMessage = 'Kloten, ga naar Engelse Park';
        }

        if (spotResults[1].available > 0) {
            returnMessage = 'Argh, ga naar einde Coendersweg';
        }

        if (spotResults[0].available > 0) {
            returnMessage = "Go Go Go. De beste is vrij!";
        }

        return callback(null, {
            statusCode: 200,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"message": returnMessage})
        })
    });
}

