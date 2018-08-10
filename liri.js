//put all 'required' at top
require("dotenv").config();

var request = require("request");

var Twitter = require("twitter");
var twitterKeys = require("./keys.js");

//Add the code required to import the keys.js file and store it in a variable.???

// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv[3];

/* Make it so liri.js can take in one of the following commands: (use if/else or switch/case with argv)
* `my-tweets`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says` */

if(command == 'movie-this') {
    console.log(command);
    moviethis(name);
}
else if(command == 'my-tweets') {
    mytweets();
};

function moviethis(movie_name) {
    /*OMDB API requires an API key. You may use trilogy
    
    If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    */
    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
    
    
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
    } else
    console.log("Most Recent Tweets"); 
    console.log("------------------------"); 
    
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
      console.log("Tweeted On: " + tweets[i].created_at); 
      console.log("-----------------------");
    }
  });

}

function spotifythissong(song_name) {
/*This will show the following information about the song in your terminal/bash window
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.
*/
}


function dowhatitsays() {
/*Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.*/
}

