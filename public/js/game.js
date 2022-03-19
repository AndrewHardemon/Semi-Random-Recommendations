//Click Event
var type = "";

$(".form-check-input").on("click", function (event) {
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "true");
});

//Submitting the data
$("#submit").on("click", async function (event) {
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

  // async function findGame() {
  //   try {
  //   //Ajax for Genre
  //   let url = ""
  //   if (publishers == 0) {
  //     url = `?genres=${genre}&platforms=${platforms}`
  //   } else {
  //     url = `?genres=${genre}&platforms=${platforms}&publishers=${publishers}`
  //   }

  //   //Add tags based on type (nothing by default)
  //   if (type === 31) {
  //     url += `&tags=singleplayer`
  //   } else if (type === 18) {
  //     url += `&tags=coop`
  //   } else if (type === 7) {
  //     url += `&tags=multiplayer`
  //   }

  //   //First AJAX - Get page of results from tags
  //   // const res2 = await $.ajax({
  //   //   url: "/api/game",
  //   //   type: "POST",
  //   //   data: url,
  //   //   dataType: "JSON"
  //   // })
  //   console.log(url)
  //   const res2 = await $.ajax({
  //     url: "/api/game",
  //     type: "POST",
  //     data: {url},
  //     dataType: "JSON"
  //   })
  //   console.log("find game")
  //   // $.ajax("/api/game", {method: "POST"}).done(function (response) {
  //   //   console.log(response);
  //   //If no results

  //   console.log(res2);
  //   var vidID = "";
  //   if (res2?.results?.length > 0) {
  //     vidID = res2?.results[0]?.data?.max;
  //   } else {
  //     vidID = "https://steamcdn-a.akamaihd.net/steam/apps/256675367/movie_max.mp4"
  //   }
  //   console.log(vidID)

    
  //   //Clear old code
  //   $("#outputs").empty();

  //   //OUTPUT CODE
  //   //Output the Title
  //   var title = $("<h1>")
  //   title.text(res2.name)
  //   title.attr("id", "gameTitleH1")
  //   $("#outputs").prepend(title)


  //   //Output the Artwork
  //   var artwork = res2.background_image
  //   var poster = $("<img>");
  //   console.log(artwork)
  //   if (!artwork) {
  //     poster.attr("src", "https://via.placeholder.com/500")
  //   }
  //   else if (artwork.includes('null')) {
  //     console.log('Null in artwork!');
  //     poster.attr("src", "https://via.placeholder.com/500")
  //   } else {
  //     poster.attr("src", artwork)
  //   }
  //   poster.attr("class", "rounded float-left");
  //   poster.attr("id", "poster-image");
  //   $("#outputs").append(poster);


  //   //Output the youtube video
  //   var trailerDiv = $("<div>");
  //   trailerDiv.attr("class", "embed-responsive embed-responsive-4by3")
  //   var trailer = $("<video>");
  //   trailer.attr("src", vidID);
  //   trailer.attr("class", "video");
  //   trailer.attr("controls", "controls");
  //   trailer.attr("type", "video/mp4");

  //   $(trailerDiv).append(trailer);
  //   $("#gameVideo").append(trailerDiv)

  //   // Output the Description
  //   var desc = $("<p>");
  //   desc.append(res2.description_raw);
  //   console.log(res2.description_raw);
  //   $("#outputs").append(desc);

  //   // Confetti
  //   // var confettiSettings = { "target": 'my-canvas', 'rotate': true, "max": "80", "size": "1", "animate": true, "props": ["circle", "square", "triangle", "line"], "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]], "clock": "25", "rotate": false, "width": "958", "height": "923" };
  //   // var confetti = new ConfettiGenerator(confettiSettings);
  //   // confetti.render();

  //   // setTimeout(function () { confetti.clear() }, 5000);

  //   //     });
  //   //   });//End of Third AJAX
  //   // });//End of Second Ajax
  //   // });//End of First Ajax
  // } catch(err){
  //   console.log(err)
  // }

  // }
  // findGame(); //Whole Function
        
  const data = await $.ajax({
    url: "/api/game",
    type: "POST",
    data: JSON.stringify({ genre, platforms, publishers, type: parseInt(type) }),
    dataType: "JSON"
  })
  console.log(data)
  const { game, res2 } = data

  const res3 = {results:[]}
  var vidID = "";
  if (res3.results.length > 0) {
    vidID = res3.results[0].data.max;
  } else {
    vidID = "https://steamcdn-a.akamaihd.net/steam/apps/256675367/movie_max.mp4"
  }
  console.log(vidID)

  //Clear old code
  $("#outputs").empty();

  //OUTPUT CODE
  //Output the Title
  var title = $("<h1>")
  title.text(res2.name)
  title.attr("id", "gameTitleH1")
  $("#outputs").prepend(title)


  //Output the Artwork
  var artwork = game.background_image
  var poster = $("<img>");
  console.log(artwork)
  if (!artwork) {
    poster.attr("src", "https://via.placeholder.com/500")
  }
  else if (artwork.includes('null')) {
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
  // $("#videoOutput").html("")
  $("#videoOutput").append(trailerDiv)

  // Output the Description
  var desc = $("<p>");
  desc.append(res2.description_raw);
  console.log(res2.description_raw);
  $("#outputs").append(desc);

  // Confetti
  // var confettiSettings = { "target": 'my-canvas', 'rotate': true, "max": "80", "size": "1", "animate": true, "props": ["circle", "square", "triangle", "line"], "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]], "clock": "25", "rotate": false, "width": "958", "height": "923" };
  // var confetti = new ConfettiGenerator(confettiSettings);
  // confetti.render();

  // setTimeout(function () { confetti.clear() }, 5000);


});