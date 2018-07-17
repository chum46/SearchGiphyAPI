// ARRAY of topics (tv-shows) for Giphy API query //
var topics = ["Westworld", "Game of Thrones", "Handmaid's Tale", "Stranger Things", "GLOW", "This Is Us", "Shameless", "Silicon Valley", "The Simpsons"];

// FUNCTIONS //
function displayBtns() {
	$("#tvshow-buttons").empty();
	// Loop that appends a button for each string in the array
	for (var i = 0; i < topics.length; i++) {
		var btn = $("<button>");
		btn.addClass("tvshow");
		btn.attr("data-name", topics[i]);
		btn.text(topics[i]);
		$("#tvshow-buttons").append(btn);
	}
};

var api = {
	baseURL: "https://api.giphy.com/v1/gifs/search?",
	giphykey: "LYKuPQoVU1xGNcUXKlTjcSFcPqfAgH7c",
	getData: function(){
		$("#gif-view").empty();
		var topicAPI = $(this).attr("data-name");
		var queryURL = api.baseURL + "q=" + topicAPI + "&api_key=" + api.giphykey + "&limit=10";
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			api.gifDisplay(response);
		});
	},
	gifDisplay: function(e){
		for (var i = 0; i < 10; i++) {
			var gifDiv = $("<div>");
			var rating = $("<p>").text("Rating: " + e.data[i].rating);
			var gifImg = $("<img src=" + e.data[i].images.fixed_width_still.url + ">");
			gifImg.attr("data-still", e.data[i].images.fixed_width_still.url);
			gifImg.attr("data-animate", e.data[i].images.fixed_width.url);
			gifImg.attr("data-state", "still");
			gifImg.addClass("gif");
			gifDiv.prepend(gifImg);
			gifDiv.prepend(rating);
			$("#gif-view").append(gifDiv);
		}
	}
}

function changeState() {
	// Toggles the gif from it's current state to animate or stop
	var state = $(this).attr("data-state");
	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

// MAIN PROCESSES //
$(document).ready(displayBtns());
$("#add-tvshow").on("click", function (event) {
	// Adds to array when user submits a new input and displays button
	event.preventDefault();
	var tvshowInput = $("#tvshow-input").val().trim();
	topics.push(tvshowInput);
	displayBtns();
});
$(document).on("click", ".tvshow", api.getData);
$(document).on("click", ".gif", changeState);



