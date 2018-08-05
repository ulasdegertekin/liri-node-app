require("dotenv").config();
var Twitter = require("twitter")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var client = new Twitter(keys.twitter);
var nodeArgs = process.argv;
var request = require("request");

switch (process.argv[2]) {

  case ("my-tweets"):
    mytweets();
    break;

  case ("spotify-this-song"):
    spotifythissong();
    break;


  case ("movie-this"):
    moviethis();
    break;

  case ("do-what-it-says"):
    dowhatitsays();
    break;
}

// Omdb outputs 
function moviethis() {
  var movieName = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }

    else {
      movieName += nodeArgs[i];
    }
  }

  var QueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(QueryUrl, function (error, response, body) {
    var data = JSON.parse(body);
    if (!error && response.statusCode === 200) {
    }
    else if (response.process.argv[3] === undefined) {
      response.movieName = "Mr. Nobody";
      console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/")
      console.log("The Year of the movie: " + data.Year);
      console.log("The IMDB Rating of the movie: " + data.imdbRating);
    }
    console.log("The Title of the movie: " + data.Title);
    console.log("The Year of the movie: " + data.Year);
    console.log("The IMDB Rating of the movie: " + data.imdbRating);
    // console.log("The Rotten Tomatoes Rating of the movie: " + data.Ratings[1].Value);
    console.log("The  Country of the origin: " + data.Country);
    console.log("The Language of the movie: " + data.Language);
    console.log("The Plot of the movie: " + data.Plot);
    console.log("The Actors of the movie: " + data.Actors);
  });
}

function spotifythissong() {
  var spotifySong = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      spotifySong = spotifySong + "+" + nodeArgs[i];
    }

    else {
      spotifySong += nodeArgs[i];
    }
  }
  var spotify = new Spotify(keys.spotify)

  spotify.search({ type: 'track', query: spotifySong }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
}
