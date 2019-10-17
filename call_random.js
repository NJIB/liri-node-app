function call_random() {

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
                call_bandsintown(searchCriteria);
                break;
            case '2. Songs (with Spotify)':
                call_spotify(searchCriteria);
                break;
            case '3. Movies (with OMDB)':
                call_omdb(searchCriteria);
                break;
        }
    });


    console.log("random.txt contents: " + data);
}
