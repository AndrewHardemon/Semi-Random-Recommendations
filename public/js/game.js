//Variables for later use
var gURL = "https://rawg-video-games-database.p.rapidapi.com"
var apiKey = "91e8d6d8f0msh25ec06cf2a849c7p124390jsn08de1e0ef7e7"2;
var type = "";


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
  var genre = $("#genre").val().trim();
  console.log(genre);
  var platforms = $("#platforms").val().trim();
  console.log(platforms);
  var publishers = $("#publishers").val().trim();
  console.log(publishers);

  //Settings for Ajax
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${gURL}`,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    }
  }

  function findGame() {
    //Ajax for Genre
    if (publishers == 0) {
      settings.url = `${gURL}/games?genres=${genre}&platforms=${platforms}`
    } else {
      settings.url = `${gURL}/games?genres=${genre}&platforms=${platforms}&publishers=${publishers}`
    }

    //Add tags based on type (nothing by default)
    if (type === 31) {
      settings.url += `&tags=singleplayer`
    } else if (type === 18) {
      settings.url += `&tags=coop`
    } else if (type === 7) {
      settings.url += `&tags=multiplayer`
    }

    //First AJAX - Get page of results from tags
    $.ajax(settings).done(function (response) {
      console.log(response);
      //If no results
      if (response.count === 0) {
        //Show there is nothing
      }

      //Get random Page Number
      var random = Math.floor((Math.random() * Math.ceil(response.count / 20)) + 1);
      //Doesn't go above 500
      if (random > 500) {
        random = Math.floor((Math.random() * 500) + 1);
      }
      console.log(random)

      //Add page number to URL
      settings.url += `&page=${random}`


      //Second AJAX
      $.ajax(settings).done(function (res) {
        console.log(res);
        //Get random result Number
        var ran = Math.floor((Math.random() * res.results.length));
        console.log(ran);
        var game = res.results[ran];
        console.log(game);

        //Third API for YouTube video
        settings.url = `${gURL}/games/${game.slug}`
        $.ajax(settings).done(function (res2) {
          console.log(res2);
          //New URL to get movie
          settings.url = `${gURL}/games/${game.slug}/movies`
          $.ajax(settings).done(function (res3) {
            console.log(res3);
            var vidID = "";
            if (res3.results.length > 0) {
              vidID = res3.results[0].data.max;
            } else {
              vidID = "https://steamcdn-a.akamaihd.net/steam/apps/256675367/movie_max.mp4"
            }
            console.log(vidID)

            //OUTPUT CODE
            //Output the Title
            var title = $("<h1>")
            title.text(res2.name)
            title.attr("id", "gameTitleH1")
            $("#outputs").prepend(title)
            

            //Output the Artwork
            var artwork = game.background_image
            var poster = $("<img>");
            if (artwork.includes('null')) {
              console.log('Null in artwork!');
              poster.attr("src", "https://via.placeholder.com/500")
            } else {
              poster.attr("src", artwork)
            }
            poster.attr("class", "rounded float-left");
            poster.attr("id", "poster-image");
            $("#outputs").append(poster);


            //Output the youtube video
            var trailerDiv = $("<div>");
            trailerDiv.attr("class", "embed-responsive embed-responsive-4by3")
            var trailer = $("<video>");
            trailer.attr("src", vidID);
            trailer.attr("class", "video");
            trailer.attr("controls", "controls");
            trailer.attr("type", "video/mp4");
            $(trailerDiv).append(trailer);
            $("#outputs").append(trailerDiv)

            // Output the Description
            var desc = $("<p>");
            desc.append(res2.description_raw);
            console.log(res2.description_raw);
            $("#outputs").append(desc);

          });
        });//End of Third AJAX
      });//End of Second Ajax
    });//End of First Ajax
  }
  findGame(); //Whole Function
  //End of submit event
});