# liri-node-app

LIRI is a command-line tool that takes user input as the basis for making various API calls, to return different information.

It enables the user to search for information, based on 4 different options:

1. Search for concerts featuring a specific band (using the BandsInTown API)
2. Search for information on movies (using the OMDB API)
3. Search for details of music tracks (using the Spotify API)
4. Search any of the above, based on information read from a 'random' text file

The application is coded in Javascript leveraging Node.js .  As part of this the application also makes use of select Node Package Modules (NPMs).

Additional features include:

- Inquirer.js to enhance the data entry experience
- API key and secret being stored securely in an offline file, not on GitHub
- The reading from and writing to external text files
- The leveraging of promises and callback functionality

The application is designed to work through the Command prompt line, not a browser.  As such, the user should:

1. Open Visual Studio Code in a new window
2. Open the workplace folder for the application
3. Ensure the appropriate NPMs are installed
4. Initiate the application by entering the command:  node liri.js
5. Select from the 4 types of search from the 4 options listed
6. Enter the desired search term when prompted

Over time, enhancements will be made to the application, to add additional validation, new search options, and a greater range and flexibility of information returned.