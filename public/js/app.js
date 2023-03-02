//Click Event
$(".form-check-input").on("click", function (event) {
  type = $(this).val();
  console.log(type);
  $(".form-check-input").attr("disabled", "true");
});

//If you don't click either type it defaults to movie
if (!type) {
  type = "movie";
}

//Submitting the data
$("#submit").on("click", async function (event) {
  event.preventDefault();
  var qURL = "https://api.themoviedb.org/3"
  var type = "movie" //or tv
  var genre = "genre"//name or id of genre
  var runtime = ""; //15 minute increments

  var ytVid = "";
  var ytVidID = "";
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
  console.log(ratingIndex);
  //first num
  var rating1 = rating.substring(0, ratingIndex);
  //second num
  var rating2 = rating.substring(ratingIndex + 1);
  console.log(rating1);
  console.log(rating2);

  //Exclude adult content
  const data = { type, genre, rating1, rating2, r3, r4 }
  try {
    // const resOne = await fetch("/api/movie", {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    // const res = await resOne.json()
    const res = await $.ajax({
      url: "/api/movie",
      type: "POST",
      data: JSON.stringify(data),
      dataType: "JSON"
    })

    console.log(res)
    const { youtube, outputName, artwork, description } = res;
    const ytID = youtube.results[0]?.key || "w9uBMyUEvKs"
    console.log(ytID)
    ytVid = `https://www.youtube.com/embed/${ytID}`

    //OUTPUT CODE
    $("#outputs").empty();
    $("#videoOutput").empty();
    //Output the Title
    var title = $("<h1>")
    title.text(outputName)
    $("#outputs").prepend(title)
    // $("#outputs").append(rating)

    //Output the Description
    var desc = $("<h5>");
    desc.append(description);
    console.log(description);
    $("#outputs").append(desc);

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
    trailer.attr("src", ytVid)
    trailerDiv.append(trailer);
    console.log(trailerDiv[0])
    $("#videoOutput").html("")
    $("#videoOutput").append(trailerDiv[0])


  } catch (err) {
    console.log(err)
  }

});
