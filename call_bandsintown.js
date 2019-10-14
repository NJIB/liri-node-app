function call_bandsintown(artist) {

    var artist = "";
    var client_id = "codingbootcamp";

    // Constructing a queryURL using the animal name
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + client_id;

    console.log("queryURL: " + queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response);

            // Log required details for the artist searched
            console.log(response.events.ArtistData.name);
            // Name of the venue
            console.log(response.events.VenueData.name);

            // Venue location
            console.log ${response.events.VenueData.city};

            //Date of the event (formatted with Moment.js to MM/DD/YYYY)
            console.log(response.events.EventData.datetime);


            //ERROR CHECKING / VALIDATION?

        });
}

