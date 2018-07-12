



// When the user clicks one of the still GIPHY images, the gif should animate. 
// If the user clicks the gif again, it should stop playing.

// Event - Add to array when user submits a new input
// Then make a function call that takes each topic in the array remakes the buttons 
// on the page.

// Try Bonus
// =============================================================================

var img = $("<img>");
var txt = $("<p>");
// Variable array of stored tv show search topics 
var topics = ["Westworld", "Game of Thrones", "Handmaid's Tale", "Stranger Things", "GLOW", 
  "This Is Us", "Shameless", "Silicon Valley", "The Voice"];

// FUNCTIONS====================================================================
function displayBtns() {
  $("#tvshow-buttons").empty();
  // Loop that appends a button for each string in the array
  for (var i=0; i<topics.length; i++) {
    var btn = $("<button>");
    btn.addClass("tvshow");
    btn.attr("data-name", topics[i]);
    btn.text(topics[i]);
    $("#tvshow-buttons").append(btn);
  }
};

function displayGifs() {
  // Grabs 10 non-animated gif images from the GIPHY API and places them on the page with it's rating
  $("#gif-view").empty();
  var searchGifs = $(this).attr("data-name");
  var apiKey = "LYKuPQoVU1xGNcUXKlTjcSFcPqfAgH7c";
  var baseURL = "https://api.giphy.com/v1/gifs/search?";
  var queryURL = baseURL + "q=" + searchGifs + "&api_key=" + apiKey + "&limit=10";
  // console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    for (var i=0; i<10; i++){
      var gifDiv = $("<div>");
      var txtRating = $("<p>").text("Rating: " + response.data[i].rating);
      var gifImg = $("<img src="+response.data[i].images.fixed_width_still.url+">");
      gifImg.attr("data-still", response.data[i].images.fixed_width_still.url);
      gifImg.attr("data-animate", response.data[i].images.fixed_width.url);
      gifImg.attr("data-state", "still");
      gifImg.addClass("gif");
      gifDiv.prepend(gifImg);
      gifDiv.prepend(txtRating);
      $("#gif-view").append(gifDiv);
    }
  });
};

function changeState() {
  var state = $(this).attr("data-state");
  if(state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    // console.log(state);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};

// MAIN PROCESSES
displayBtns();

$("#add-tvshow").on("click", function(event){
  event.preventDefault();
  var tvshowInput = $("#tvshow-input").val().trim();
  topics.push(tvshowInput);
  displayBtns();
});

$(document).on("click", ".tvshow", displayGifs);
$(document).on("click", ".gif", changeState);
var state = $(this).attr("data-state");


