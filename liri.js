// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the NPM Package for Moment.js
var moment = require("moment");

// Add the code required to import the keys.js file and store it in a variable. */
var keys = require("./keys.js");

// Load the NPM Package inquirer
const inquirer = require('inquirer');

// Reference source code files
var omdb = require("./call_omdb.js");
var bandsitown = require("./call_bandsintown.js");
var spotify = require("./call_spotify.js");
var random = require("./call_random.js");

// Object to store concert log data
let logFile = {
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
    line6: ""
};

let printList = [];
let j = 0;

// Variable to capture readFile output and feed to API caller
var apiSelector = '';

// Variable to capture readFile output and feed to API caller
var searchCriteria = '';


// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        {
            type: 'list',
            message: 'What are you searching for?',
            name: 'searchType',
            choices: ['1. Concerts (with Bands In Town)', '2. Songs (with Spotify)', '3. Movies (with OMDB)', '4. Do What It Says'],
        },
        // Here we create a basic text prompt.
        {
            type: 'input',
            message: 'Input your search / request',
            name: 'input',
        }
    ])
    .then(function (inquirerResponse) {
        switch (inquirerResponse.searchType) {
            case '1. Concerts (with Bands In Town)':
                call_bandsintown(inquirerResponse.input);
                break;
            case '2. Songs (with Spotify)':
                call_spotify(inquirerResponse.input);
                break;
            case '3. Movies (with OMDB)':
                call_omdb(inquirerResponse.input);
                break;
            case '4. Do What It Says':
                call_random();
                break;
        }
    });

function call_bandsintown(artist) {

    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    const axios = require('axios');

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

                console.log('')
                console.log('==========================================================')
                logFile.line6 = '========================================================== \n';

                printList.push(logFile);
            }
            writeToFile(printList);
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

function call_omdb(movie) {
    // Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
    const axios = require('axios');

    if (movie === '') {
        movie = 'Mr. Nobody';
    }

    // Constructing a queryURL using the movie name
    let queryURL = 'http://www.omdbapi.com/?t=' + encodeURIComponent(movie) + '&y=&plot=short&tomatoes=true&apikey=trilogy';

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(queryURL).then(
        function (response) {

            console.log('')
            console.log(`Movies found matching ${movie} :`);
            console.log('');

            // Movie title
            console.log(`The movie's title is: ${response.data.Title}`);

            // Year the movie came out
            console.log(`The year the movie was released is: ${response.data.Year}`);

            // IMDB rating for the movie
            console.log(`The movie's rating is: ${response.data.imdbRating}`);

            // Rotten Tomatoes rating for the movie
            console.log(`The movie's Rotten Tomatoes rating is: ${response.data.tomatoRating}`);

            // Country where the movie was produced
            console.log(`The movie was produced in: ${response.data.Country}`);

            // Language of the movie
            console.log(`The movie's language is: ${response.data.Language}`);

            //Plot of the movie
            console.log(`The movie's plot is: ${response.data.Plot}`);

            // Actors in the movie
            console.log(`The movie's stars the following actor(s): ${response.data.Actors}`);

            console.log('')
            console.log('==========================================================')

        }
    ).catch(function (error) {
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

function call_spotify(songName) {

    if (songName === '') {
        songName = 'The Sign';
    }

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {

            console.log('')
            console.log(`Tracks found matching ${songName} :`);
            console.log('');

            console.log(Object.keys(response.tracks.items));

            for (var i = 0; i < response.tracks.items.length; i++) {

                let item = response.tracks.items[i];
                console.log("Track: " + item.name);

                console.log(`Artists:`);
                item.artists.forEach(el => {
                    console.log(`${el.name}`);
                })

                console.log("Album: " + item.album.name);
                if (item.preview_url === null) {
                    console.log("(Sorry, no preview available)");
                } else {
                    console.log("Preview: " + item.preview_url);
                }
                console.log('')
                console.log('==========================================================')
            }
        }
        )
        .catch(function (err) {
            console.log(err);
        });
}

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
        writeToFile();
    });
}

function writeToFile(file) {

    const fs = require('fs');

    for (let j = 0; j < file.length; j++) {

        fs.appendFile('./log.txt', (
            '\n ' +
            file[j].line1 +
            file[j].line2 +
            file[j].line3 +
            file[j].line4 +
            file[j].line5 +
            file[j].line6
        ),
            (err) => {
                if (err) throw err;
                console.log('Records appended to file!');
            });
    }
}
