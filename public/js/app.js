var qURL = "https://api.themoviedb.org/3"
var type = "movie" //or tv
var genre = "genre"//name or id of genre
var runtime = ""; //15 minute increments
var sources = ""; //netflix or similar. uses other api
var tries = 0;
var finalResult = "";
var descArray = [];
var srcArray = [];
var ytVid = "";
var ytVidID = "";


//Click Event
$(".form-check-input").on("click", function (event) {
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "true");
});

//Submitting the data
$("#submit").on("click", function (event) {
  event.preventDefault();
  console.log("this works");

  //Undo Disable and Checked for type
  $(".form-check-input").prop('disabled', false)
  $(".form-check-input").prop('checked', false)

  //Gets genre variable
  genre = $("#genre").val().trim();
  console.log(genre);
  //Gets runtime variable
  runtime = $("#runtime").val().trim();
  console.log(runtime);
  //Splits runtime into first num and second num
  var r1 = runtime.indexOf("-");
  var r2 = runtime.indexOf(" ");
  //first num
  var r3 = runtime.substring(0, r1);
  //second num
  var r4 = runtime.substring(r1 + 1, r2);
  console.log(r3);
  console.log(r4);

  //Gets source variable
  rating = $("#rating").val().trim();
  console.log(rating);
  //Splits runtime into first num and second num
  var ratingIndex = rating.indexOf("-");
  console.log(rating1);
  //first num
  var rating1 = rating.substring(0, ratingIndex);
  //second num
  var rating2 = rating.substring(ratingIndex + 1);
  console.log(rating1);
  console.log(rating2);

  //Exclude adult content
  var adult = "&include_adult=false";
  $.ajax({
    url: "/api_key",
    method: "GET"
  }).then(function (response) {
    var apiKey = response;
    var queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&sort_by=vote_average.desc&vote_average.gte=${rating1}&vote_average.lte=${rating2}&api_key=${apiKey + adult}&language=en-US&page=1`
    console.log(queryURL);
    // totalAjax(queryURL);
    // });

    function totalAjax() {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var res = response;

        //Gets total number of pages
        var page = res.total_pages;
        console.log(page)

        //Randomizes Page Number
        var randomPage = Math.floor((Math.random() * page) + 1);
        console.log(randomPage);

        //Updates QueryURL
        queryURL = `https://api.themoviedb.org/3/discover/${type}?with_genres=${genre}&with_runtime.gte=${r3}&with_runtime.lte=${r4}&api_key=${apiKey}&language=en-US&page=${randomPage}`


        //Second Ajax
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          var res = response;
          console.log(res);
          console.log(res.total_results);

          //Gets Random Number
          var total = Math.floor((Math.random() * 20));
          console.log(total);

          //Gets the total results
          var outputArray = res.results;
          console.log(outputArray);

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
          console.log(queryURL);
          console.log(res.results[total].overview)
          var desc = res.results[total].overview
          descArray.push(desc);

          //Get poster
          var artwork = "https://image.tmdb.org/t/p/w500" + res.results[total].poster_path

          //If null
          if (artwork == null) {
            artwork = "https://www.gaskinsbennett.com/wp-content/uploads/2017/06/placeholder-500x500.jpg"
          }

          //Youtube ID
          var ytID = res.results[total].id;
          console.log(ytID)
          console.log(typeof (ytID))
          if (ytID === null) {
            //ytID = "157336"
            totalAjax();
          }

          var ytURL = `https://api.themoviedb.org/3/movie/${ytID}/videos?api_key=92f5c8ff853ffea4d1fed070c2f2d729`
          console.log(ytURL);

          //Third AJAX
          $.ajax({
            url: ytURL,
            method: "GET"
          }).then(function (res2) {
            console.log(res2)
            if (res2.results.length === 0) {
              totalAjax();
            }
            ytVid = `https://www.youtube.com/watch?v=${res2.results[0].key}`
            //SAVE VIDEO LINK
            ytVidID = "" + res2.results[0].key;
            console.log(ytVid);
            console.log(ytVid)
            console.log(ytVidID)

            //OUTPUT CODE
            $("#outputs").empty();
            //Output the Title
            var title = $("<h1>")
            title.text(outputName)
            $("#outputs").prepend(title)
            $("#outputs").append(rating)

            //Output the Artwork
            var poster = $("<img>");
            if (artwork.includes('null')) {
              console.log('Null in artwork!');
              poster.attr("src", "https://via.placeholder.com/500")
            } else {
              poster.attr("src", artwork)
            }
            poster.attr("class", "rounded float-left");
            $("#outputs").append(poster);

            //Output the youtube video
            var trailerDiv = $("<div>");
            trailerDiv.attr("class", "embed-responsive embed-responsive-4by3")
            var trailer = $("<iframe>");
            trailer.attr("id", ytID);
            trailer.attr("class", "youtube");
            trailer.attr("src", `https://www.youtube.com/embed/${ytVidID}`)
            $(trailerDiv).append(trailer);
            $("#outputs").append(trailerDiv)

            //Output the Description
            var desc = $("<p>");
            desc.append(descArray[0]);
            console.log(descArray[0]);
            $("#outputs").append(desc);
            descArray = [];


            // Confetti
            var confettiSettings = { "target": 'my-canvas', 'rotate': true, "max": "80", "size": "1", "animate": true, "props": ["circle", "square", "triangle", "line"], "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]], "clock": "25", "rotate": false, "width": "958", "height": "923" };
            var confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();

            setTimeout(function () { confetti.clear() }, 5000);

          });
        });
      });
    } //end of function
    totalAjax();
  });//get api key
})//submit