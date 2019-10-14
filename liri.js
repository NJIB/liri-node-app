// Add the code required to import the keys.js file and store it in a variable. */
var keys = require("./keys.js");

// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

var $ = require("jquery");

// You should then be able to access your keys information like so
// var spotify = new Spotify(keys.spotify);

/**Make it so liri.js can take in one of the following commands:
		○ concert-this
		○ spotify-this-song
        ○ movie-this
        ○ do-what-it-says
*/


src = "call_spotify.js"
src = "call_bandsintown.js"
src = "call_omdb.js"
// src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"


// Load the NPM Package inquirer
const inquirer = require('inquirer');

// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // First we will ask the user what they are looking for
        // {
        //     type: 'checkbox',
        //     message: 'What are you searching for?',
        //     name: 'checkListSelect',
        //     choices: ['Concerts (with Bands In Town)', 'Songs (with Spotify)', 'Movies (with OMDB)', '... or Do What It Says (with Axios)'],
        //     default: ['... or Do What It Says (with Axios)']
        // },
        {
            type: 'list',
            message: 'What are you searching for?',
            name: 'searchType',
            choices: ['1. Concerts (with Bands In Town)', '2. Songs (with Spotify)', '3. Movies (with OMDB)', '4. Do What It Says (with Axios)'],
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
                console.log("CASE 1 SELECTED");
                console.log("inquirerResponse.searchType: " + inquirerResponse.searchType);
                console.log("inquirerResponse.input: " + inquirerResponse.input);
                call_bandsintown(inquirerResponse.input);
                break;
            case '2. Songs (with Spotify)':
                call_spotify(input);
                break;
            case '3. Movies (with OMDB)':
                console.log("CASE 3 SELECTED");
                console.log("inquirerResponse.searchType: " + inquirerResponse.searchType);
                console.log("inquirerResponse.input: " + inquirerResponse.input);
                call_omdb(inquirerResponse.input);
                break;
            case '4. Do What It Says (with Axios)':
                call_axios();
                break;
        }
    });

function call_bandsintown(artist) {

    const bandsintown = '';
    const client_id = "codingbootcamp";

    // Constructing a queryURL using the animal name
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + client_id;

    console.log("queryURL: " + queryURL);

    bandsintown.get(queryURL).then(
        function (response) {
            console.log(response);

            // Log required details for the artist searched
            console.log(response.events.ArtistData.name);
            // Name of the venue
            console.log(response.events.VenueData.name);

            // Venue location
            console.log(`City: 
    ${response.events.VenueData.city}
    `);

            //Date of the event (formatted with Moment.js to MM/DD/YYYY)
            console.log(response.events.EventData.datetime);

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

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy').then(
        function (response) {

            // Movie title
            console.log(`The movie's title is: ${response.data.Title}`);

            // Year the movie came out
            console.log(`The year the movie was released is: ${response.data.Year}`);

            // IMDB rating for the movie
            console.log(`The movie's rating is: ${response.data.imdbRating}`);

            // Rotten Tomatoes rating for the movie
            console.log(`The movie's Rotten Tomatoes rating is: ${response.data.imdbRating} NEEDS TO BE FIXED!!!`);

            // Country where the movie was produced
            console.log(`The movie was produced in: ${response.data.Country}`);

            // Language of the movie
            console.log(`The movie's language is: ${response.data.Language}`);

            //Plot of the movie
            console.log(`The movie's plot is: ${response.data.Plot}`);

            // Actors in the movie
            console.log(`The movie's stars the following actor(s): ${response.data.Actors}`);


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


