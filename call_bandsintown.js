class bandsintown {
call_bandsintown(artist) {

    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    const axios = require('axios');

    const client_id = "codingbootcamp";

    // Constructing a queryURL using the band name
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + client_id;

    console.log("queryURL: " + queryURL);

    axios.get(queryURL).then(
        function (response) {

            console.log('')
            console.log(`Concerts found matching ${artist} :`);
            console.log('');

            for (var i = 0; i < response.data.length; i++) {

            // Log required details for the artist searched
            console.log(`Artist: ${response.data[i].lineup} `);

            // Name of the venue
            console.log(`Venue: ${response.data[i].venue.name}`);

            // Venue location
            console.log(`City: ${response.data[i].venue.city}`);

            //Date of the event (formatted with Moment.js to MM/DD/YYYY)
            console.log(`Date: ${moment(response.data[i].datetime).format('l')}`);

            //Date of the event (formatted with Moment.js to MM/DD/YYYY)
            console.log(`Ticket sales start: ${moment(response.data[i].on_sale_datetime).format('l')}`);

            console.log('')
            console.log('==========================================================')
        }

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

}