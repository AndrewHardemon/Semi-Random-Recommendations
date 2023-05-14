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

        
  const data = await $.ajax({
    url: "/api/game",
    type: "POST",
    data: { genre, platforms, publishers, type: parseInt(type) },
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
  $("#videoOutput").html("")
  $("#videoOutput").append(trailerDiv)

  // Output the Description
  var desc = $("<p>");
  desc.append(res2.description_raw);
  console.log(res2.description_raw);
  $("#outputs").append(desc);

  $("#lists").removeClass("hidden")
  $("#lists").addClass("flex-center")

});


$(".save-item").each(function(){
  $(this).on("click", async function (event) {
    event.preventDefault()
    const saveData = {
      list_id: $(this).attr("data-id"),
      name: $("#outputs").children("h1").text().trim(),
      image: $("#outputs").children("img").attr("src").trim(),
      description: $("#outputs").children("h5").text().trim()
    }
    console.log(saveData)
    
    const data = await $.ajax({
      method: "POST",
      url: "/api/list/item",
      data: saveData,
      dataType: "JSON"
    })
    console.log(data)
  })
})