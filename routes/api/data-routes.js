const router = require('express').Router();
const axios = require("axios");
const cleanUpSpecialChars = require("../helpers/cleanUpSpecialChars")
require("dotenv").config()


// Get all examples
router.post("/movie", async function (req, res) {
  console.log(req.body)
  //Hardcoded for now. Will become an option on login
  var adult = "&include_adult=false";
  //Temperary fix for AJAX
  const data = JSON.parse(Object.keys(req.body)[0])
  const { type, genre, rating1, rating2, r3, r4 } = data;
  var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&sort_by=vote_average.desc&vote_average.gte=${rating1}&vote_average.lte=${rating2}&api_key=${process.env.API_KEY + adult}&language=en-US&page=1`

  try {
    const responseFull = await axios.get(queryURL)
    const response = responseFull.data
    //Gets total number of pages
    var page = response.total_pages;
    console.log(page)

    //repeating function to prevent empty result
    async function totalAjax() {
      //Randomizes Page Number
      var randomPage = Math.floor((Math.random() * page) + 1);
      console.log(randomPage);

      //Updates QueryURL
      query2URL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&sort_by=vote_average.desc&vote_average.gte=${rating1}&vote_average.lte=${rating2}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${process.env.API_KEY + adult}&language=en-US&page=${randomPage}`

      //Second Axios
      const dataFull = await axios.get(query2URL)
      const data = dataFull.data
      console.log(data.total_results);

      //Gets Random Number
      var total = Math.floor((Math.random() * 20));
      console.log(total);

      //Gets the total results
      var outputArray = data.results;
      // console.log(outputArray);

      //Restart if no results
      if (outputArray.length === 0) {
        totalAjax();
      }

      //Get title/name if its tv or movie
      var outputName;
      if (type == "movie") {
        console.log("movie = title")
        outputName = outputArray[total].title;
        console.log(outputName);
      } else {
        console.log("tv = name")
        outputName = outputArray[total].name;
        console.log(outputName);
      }
      console.log(outputName);


      cleanUpSpecialChars(outputName);

      //Replace spaces with -
      outputName = outputName.replace(/\ /g, '-')
      console.log(outputName)

      //Get Description for the Movie/Show
      console.log(outputArray[total].overview)
      var description = outputArray[total].overview

      //Get poster
      var artwork = "https://image.tmdb.org/t/p/w500" + outputArray[total].poster_path

      //If null
      if (artwork == null) {
        artwork = "https://www.gaskinsbennett.com/wp-content/uploads/2017/06/placeholder-500x500.jpg"
      }

      //Youtube ID
      var ytID = outputArray[total].id;
      if (!ytID) ytID = "157336"

      var ytURL = `https://api.themoviedb.org/3/movie/${ytID}/videos?api_key=${process.env.API_KEY}`

      //Third AJAX
      const youtubeFull = await axios.get(ytURL)
      const youtube = youtubeFull.data
      const final = { youtube, outputName, artwork, description }
      console.log(final)
      res.json(final)

    } //end of function
    totalAjax();
  } catch (err) {
    console.log(err)
    res.json(err)
  }

});

router.post("/game", async function (req, res) {
  try {
    const data = JSON.parse(Object.keys(req.body)[0])
    const { genre, platforms, publishers, type } = data
    //Variables for later use
    // var gURL = "https://rawg-video-games-database.p.rapidapi.com"
    var gURL = "https://api.rawg.io/api"
    var apiKey = "&key=" + process.env.GAME_KEY
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `${gURL}`,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": process.env.GAME_KEY
      }
    }
    let settingsUrl = "";
    //Ajax for Genre
    if (publishers == 0) {
      settingsUrl = `${gURL}/games?genres=${genre}&platforms=${platforms}` + apiKey
    } else {
      settingsUrl = `${gURL}/games?genres=${genre}&platforms=${platforms}&publishers=${publishers}` + apiKey
    }

    //Add tags based on type (nothing by default)
    if (type === 31) {
      settingsUrl += `&tags=singleplayer`
    } else if (type === 18) {
      settingsUrl += `&tags=coop`
    } else if (type === 7) {
      settingsUrl += `&tags=multiplayer`
    }

    //First AJAX - Get page of results from tags
    const response = await axios(settingsUrl)
    console.log(response.data.count);
    //If no results
    if (response.data.count === 0) {
      //Show there is nothing
      console.log("nothing")
    }

    //Get random Page Number
    var random = Math.floor((Math.random() * Math.ceil(response.data.count / 20)) + 1);
    //Doesn't go above 500
    if (random > 500) {
      random = Math.floor((Math.random() * 500) + 1);
    }
    console.log(random)

    //Add page number to URL
    settingsUrl += `&page=${random}`


    //Second AJAX
    const res1 = await axios(settingsUrl)
    // console.log(res1.data);
    //Get random result Number
    var ran = Math.floor((Math.random() * res1.data.results.length));
    console.log(ran);
    var game = res1.data.results[ran];
    // var {background_image, metacritic, esrb_rating, short_screenshots} = game
    // console.log(game);
    if (!game) {
      game = { slug: "Skyrim" }
    }

    //Third API for YouTube video
    settingsUrl = `https://rawg.io/api/games/${game.slug}?key=${process.env.GAME_KEY}`
    const res2 = await axios(settingsUrl)
    // console.log(res2.data);
    //New URL to get movie
    // settingsUrl = `${gURL}/games?name=${game.slug}/movies` + apiKey
    // const res3 = await axios(settingsUrl)
    // console.log(res3);
    const final = {
      game, res2: res2.data //, res3
    }
    // console.log(final)
    res.json(final)

    // } //end of function
    // totalAjax();
  } catch (err) {
    console.log(err)
  }

})

module.exports = router;
