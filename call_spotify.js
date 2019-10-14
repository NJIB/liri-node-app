function callAPI(destCity, fromDate, tillDate, eventType) {

    var clientID = "MTg1ODQzODR8MTU2OTM2NjgzOC4zNQ";

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.seatgeek.com/2/events?venue.city=" +
        encodeURIComponent(destCity) +
        "&datetime_utc.gte=" + fromDate +
        "&datetime_utc.lte=" + tillDate +
        "&taxonomies.name=" + eventType +
        "&per_page=25" +
        "&client_id=" + clientID;

    console.log("queryURL: " + queryURL);

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {

            $("#box-ent").html("");
            console.log(response);
            var eventsP = $("<p>");

            // Write list of concerts to the DOM
            $(eventsP).append("<button id='concertList'>Concerts</button>");
            $(eventsP).append("<button id='theaterList'>Theater</button>");
            $(eventsP).append("<button id='sportsList'>Sports</button>");
            if (response.events.length === 0) {
                $(eventsP).append("<br/>" + "Sorry - no " + eventType.toLowerCase() + " events found for these dates.");
            } else {
                $(eventsP).append("<br/>" + eventType + " events while you are there:");
                for (var i = 0; i < response.events.length; i++) {
                    if (response.events[i].performers[0].image === null) {
                        $(eventsP).append("<br/>" + "<img width=30 height=30 src = 'assets/images/SuitCase.png'" + ">");
                    } else {
                        $(eventsP).append("<br/>" + "<img width=30 height=30 src = " + response.events[i].performers[0].image + ">");
                    }
                    $(eventsP).append("  " +
                        response.events[i].datetime_local.substr(5, 2) +
                        "/" +
                        response.events[i].datetime_local.substr(8, 2) +
                        ": " +
                        response.events[i].title);
                };
            }

            $("#box-ent").prepend(eventsP);

        });
}

