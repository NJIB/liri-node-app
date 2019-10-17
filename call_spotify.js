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
