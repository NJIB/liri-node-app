function call_omdb(movie) {

    // For writing to text file
    let printList = [];
    var textOutput = require("./writeToFile.js");

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

            //Object to hold information to be written to text file
            let logFile = {};

            console.log('')
            console.log(`Movies found matching ${movie} :`);
            console.log('');

            // Movie title
            console.log(`The movie's title is: ${response.data.Title}`);
            logFile.line1 =(`The movie's title is: ${response.data.Title} + '\n'`);

            // Year the movie came out
            console.log(`The year the movie was released is: ${response.data.Year}`);
            logFile.line2 =(`The year the movie was released is: ${response.data.Year}`);

            // IMDB rating for the movie
            console.log(`The movie's rating is: ${response.data.imdbRating}`);
            logFile.line3 =(`The movie's rating is: ${response.data.imdbRating}`);

            // Rotten Tomatoes rating for the movie
            console.log(`The movie's Rotten Tomatoes rating is: ${response.data.tomatoRating}`);
            logFile.line4 =(`The movie's Rotten Tomatoes rating is: ${response.data.tomatoRating}`);

            // Country where the movie was produced
            console.log(`The movie was produced in: ${response.data.Country}`);
            logFile.line5 =(`The movie was produced in: ${response.data.Country}`);

            // Language of the movie
            console.log(`The movie's language is: ${response.data.Language}`);
            logFile.line6 =(`The movie's language is: ${response.data.Language}`);

            //Plot of the movie
            console.log(`The movie's plot is: ${response.data.Plot}`);
            logFile.line7 =(`The movie's plot is: ${response.data.Plot}`);

            // Actors in the movie
            console.log(`The movie's stars the following actor(s): ${response.data.Actors}`);
            logFile.line8 =(`The movie's stars the following actor(s): ${response.data.Actors}`);

            console.log('')
            logFile.line9 =('')

            console.log('==========================================================')
            logFile.line10 =('==========================================================')

            printList.push(logFile);
            textOutput.logOutput(printList, 0);
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

module.exports = { omdb: (movie) => call_omdb(movie) };
