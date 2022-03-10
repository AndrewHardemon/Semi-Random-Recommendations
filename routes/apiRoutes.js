const axios = require("axios");
var db = require("../models");
require("dotenv").config()

module.exports = function (app) {
  // Get all examples
  app.post("/api/movie", async function (req, res) {
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

        //Get rid of special characters
        function cleanUpSpecialChars(str) {
          return str
            .replace(/[ÀÁÂÃÄÅÆ]/g, "A")
            .replace(/[àáâãäåæ]/g, "a")
            .replace(/[Ç]/g, "C")
            .replace(/[ç]/g, "c")
            .replace(/[ÈÉÊË]/g, "E")
            .replace(/[èéêë]/g, "e")
            .replace(/[ÌÍÎÏ]/g, "I")
            .replace(/[ìíîï]/g, "i")
            .replace(/[Ñ]/g, "N")
            .replace(/[ñ]/g, "n")
            .replace(/[ÒÓÔÕÖØ]/g, "O")
            .replace(/[òóôõöø]/g, "o")
            .replace(/[Š]/g, "S")
            .replace(/[š]/g, "s")
            .replace(/[ß]/g, "ss")
            .replace(/[ÚÛÜÙ]/g, "U")
            .replace(/[ùúûü]/g, "u")
            .replace(/[ÝŸ]/g, "Y")
            .replace(/[ýÿ]/g, "y")
            .replace(/[Ž]/g, "Z")
            .replace(/[ž]/g, "Z")
            .replace(/[^\x00-\x7F]+/g, '') //non ascii
          //.replace(/[^a-z0-9]/gi,''); // final clean up
        }
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
    }


  })

  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
