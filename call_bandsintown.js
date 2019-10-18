function call_bandsintown(artist) {

    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    const axios = require('axios');

    // Load the NPM Package for Moment.js
    const moment = require('moment');

    let printList = [];
    var textOutput = require("./writeToFile.js");


    const client_id = "codingbootcamp";

    // Constructing a queryURL using the band name
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + client_id;

    console.log("queryURL: " + queryURL);

    axios.get(queryURL).then(
        function (response) {

            console.log('')
            console.log(`Concerts found matching ${artist}:`);
            console.log('');

            for (var i = 0; i < response.data.length; i++) {
                let logFile = {};
                // Log required details for the artist searched
                console.log(`Artist: ${response.data[i].lineup} `);
                logFile.line1 = "Artist: " + response.data[i].lineup + "\n";

                // Name of the venue
                console.log(`Venue: ${response.data[i].venue.name}`);
                logFile.line2 = "Venue: " + response.data[i].venue.name + "\n";

                // Venue location
                console.log(`City: ${response.data[i].venue.city}`);
                logFile.line3 = "City: " + response.data[i].venue.city + "\n";

                //Date of the event (formatted with Moment.js to MM/DD/YYYY)
                console.log(`Date: ${moment(response.data[i].datetime).format('l')}`);
                logFile.line4 = "Date: " + moment(response.data[i].datetime).format('l') + "\n";


                //Date of the event (formatted with Moment.js to MM/DD/YYYY)
                console.log(`Ticket sales start: ${moment(response.data[i].on_sale_datetime).format('l')}`);
                logFile.line5 = "Ticket sales start: " + moment(response.data[i].on_sale_datetime).format('l') + "\n";

                console.log('==========================================================')
                logFile.line6 = '========================================================== \n';

                printList.push(logFile);
            }
            textOutput.logOutput(printList, 0);

            // writeToFile(printList, 0);
        })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('---------------Data---------------');
                console.log(error.response.data);
                console.log('---------------Status---------------');
                console.log(error.response.status);
                console.log('---------------Status---------------');
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details
                // pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
}

module.exports = { bandsintown: (artist) => call_bandsintown(artist) };
