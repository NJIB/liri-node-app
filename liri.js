// Add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable. */
var keys = require("./keys.js");

// Load the NPM Package inquirer
const inquirer = require('inquirer');

// Reference source code files
let movieSearch = require("./call_omdb.js");
let bandSearch = require("./call_bandsintown.js");
let songSearch = require("./call_spotify.js");
let random = require("./call_random.js");

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
                bandSearch.bandsintown(inquirerResponse.input);
            case '2. Songs (with Spotify)':
                songSearch.spotify(inquirerResponse.input);
                break;
            case '3. Movies (with OMDB)':
                movieSearch.omdb(inquirerResponse.input);
                break;
            case '4. Do What It Says':
                random.whatItSays();
                break;
        }
    });