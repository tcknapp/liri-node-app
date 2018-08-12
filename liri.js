//put all 'required' at top
require("dotenv").config();

//Variables-----------------------------
var request = require("request");

var Twitter = require("twitter");
var twitterKeys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotifyKeys = require("./keys.js");

var fs = require("fs");


var command = process.argv[2];
var name = process.argv[3];


//Commands ---------------------------------
/* Make it so liri.js can take in one of the following commands: (use if/else or switch/case with argv)
* `my-tweets`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says` */

if(command == 'movie-this') {
    //console.log(command);
    moviethis(name);
}
else if(command == 'my-tweets') {
    mytweets();
}
else if(command == 'spotify-this-song') {
    spotifythis();
}
else if(command == 'do-what-it-says') {
  dowhatitsays();
};

//Movie Fxn-------------------------------------
function moviethis(movie_name) {
    
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    
      if(movie_name === undefined) {
        movie_name = "mr nobody"
      }
    
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response) {
    
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
       
       //add 'response' to .body
        console.log("Title: " + JSON.parse(response.body).Title);
        console.log("Year: " + JSON.parse(response.body).Year);
        console.log("IMDB Rating: " + JSON.parse(response.body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(response.body).Ratings[2].Value);
        console.log("Country Produced: " + JSON.parse(response.body).Country);
        console.log("Language: " + JSON.parse(response.body).Language);
        console.log("Plot: " + JSON.parse(response.body).Plot);
        console.log("Actors: " + JSON.parse(response.body).Actors);
      }
    }); //end of request function
    
    } //end of movie this function    

//Twitter Fxn------------------------------
function mytweets() {
//This will show your last 20 tweets and when they were created at in your terminal/bash window.
  var client = new Twitter(twitterKeys.twitter);

  var params = {
    screen_name: 'KneverTrap',
    count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if(error){
      console.log("Error: " + error);
    } 
    else
    console.log("Most Recent Tweets:"); 
    console.log("------------------------"); 
    
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log("Tweeted On: " + tweets[i].created_at); 
      console.log("-----------------------");
    }
  }); //end of request fxn

} //end of twitter fxn


//Spotify Fxn----------------------------
function spotifythis(song_name) {
/*This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.
*/

  song_name = name;

  var spotify = new Spotify(spotifyKeys.spotify);

    if(song_name === undefined) {
         song_name = "the sign ace of base";
     } 

    spotify.search({type: 'track', query: song_name}, function(error, data) {
      if(error) {
        console.log("Error: " + error);
      } 
      else {
        console.log("Spotify Track:");
          console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
          console.log("Song: " + data.tracks.items[0].name);
          console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
          console.log("Album: " + data.tracks.items[0].album.name); 
      }
    }
  )

};

//Do What It Says Fxn---------------------
function dowhatitsays() {
/*Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.*/


  fs.readFile("./random.txt", "utf8", function(error, data) {
    if(error) {
      console.log("Error: " + error);
    } 
    else {
      //Splits data at comma
      var dataSplit = data.split(",");

      // reads .txt 'I want it that way, can console log, but can't run in function

      if (dataSplit[0] === "spotify-this-song"){
          song_name = dataSplit[1];
          //console.log(dataSplit[1]);
          spotifythis(song_name);
      }

      else if (dataSplit[0] === "movie-this") {
          name = dataSplit[1];
          moviethis(name);
      }

      else if (dataSplit[0] === "my-tweets"){
         screen_name = dataSplit[1];
         mytweets();
      }


    }
    }
  )};
