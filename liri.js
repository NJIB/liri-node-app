// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

var moment = require("moment");

// Add the code required to import the keys.js file and store it in a variable. */
var keys = require("./keys.js");

var $ = require("jquery");

// You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);

/**Make it so liri.js can take in one of the following commands:
		○ concert-this
		○ spotify-this-song
        ○ movie-this
        ○ do-what-it-says
*/

// Load the NPM Package inquirer
const inquirer = require('inquirer');

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
            console.log(`Concerts found matching ${artist} :`);
            console.log('');


            // Log required details for the artist searched
            console.log(`Artist: ${response.data[0].lineup} `);

            // Name of the venue
            console.log(`Venue: ${response.data[0].venue.name}`);

            // Venue location
            console.log(`City: ${response.data[0].venue.city}`);

            //Date of the event (formatted with Moment.js to MM/DD/YYYY)
            console.log(`Date: ${moment(response.data[0].datetime).format('l')}`);

            console.log('')
            console.log('==========================================================')

            //ERROR CHECKING / VALIDATION?
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

            console.log('MOVIE RESPONSE OBJECT:');
            console.log(Object.keys(response.data));

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

    var content;

    fs.readFile('random.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;

        var splitStr = content.split(',');
        var apiSelector = randomStr[0];
        console.log(apiSelector);
    });

    console.log("random.txt contents: " + content);
}
