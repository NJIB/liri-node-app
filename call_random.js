function call_random() {

    // Variable to capture readFile output and feed to API caller
    let apiSelector = '';

    // Variable to capture readFile output and feed to API caller
    let searchCriteria = '';

    let movieSearch = require("./call_omdb.js");
    let bandSearch = require("./call_bandsintown.js");
    let songSearch = require("./call_spotify.js");

    const fs = require('fs');

    fs.readFile('random.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        var splitStr = data.toString().split(',');
        console.log("splitStr: " + splitStr);

        apiSelector = splitStr[0];
        console.log(`apiSelector: ${apiSelector}`);

        searchCriteria = splitStr[1];
        console.log(`searchCriteria: ${searchCriteria}`);

        switch (apiSelector) {
            case '1. Concerts (with Bands In Town)':
                bandSearch.bandsintown(searchCriteria);
            case '2. Songs (with Spotify)':
                songSearch.spotify(searchCriteria);
                break;
            case '3. Movies (with OMDB)':
                movieSearch.omdb(searchCriteria);
                break;
        }
    });
}

module.exports = { whatItSays: () => call_random() };

