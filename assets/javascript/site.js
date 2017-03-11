$(document).ready(function() {

//creating an array that houses all the topics buttons
var topics = ["Dogs", "Cats", "Rabbits", "Parrots", "Pigs"];

//Add all items in the topics array to the DOM as a button

function createButtons(chocolate) {
	for (i = 0; i < chocolate.length; i++){
		// $("#topic-buttons").append("<button id =" + topics[i] + ">");
		// $("button#" + topics[i]).text(topics[i]);
		var button = $("<button>");
		button.attr("id", chocolate[i]).text(chocolate[i]);
		$("#topic-buttons").append(button);

	}
}
createButtons(topics);

//when user clicks 'add,' create button 
$("#input-button").click(function(){
//Emptying div 'topic-buttons' (to load the new list without duplicating what was already there)
var newTopicsArr = [];
//Get the value of user input and add it to a variable
var newTopicVar = $("#user-input").val();
//Add the new topic to the array 'topics' 
newTopicsArr.push(newTopicVar);
//Create button of topics array
createButtons(newTopicsArr);

});

//When user clicks a topic button- do something
$(document).on("click", "button", function(){
//Get 10 images from giphy
	//create variables for image and URL
	$("#gifs").empty();
	var image = $(this).attr("id");
	var queryUrl = "http:api.giphy.com/v1/gifs/search?q=" + image + "&api_key=dc6zaTOxFJmzC&limit=10";


	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response){
	for (i = 0; i < response.data.length; i++){
	var movingPath = response.data[i].images.fixed_height.url;
	var stillPath =  response.data[i].images.fixed_height_still.url;
	var rating = response.data[i].rating;
	
	var gifImage = $("<img>");
	gifImage.attr("data-state", "still")
			.attr("data-animate", movingPath)
			.attr("data-still", stillPath)
			.attr("src", stillPath);
 	var pTag = $("<p>");
 	pTag.text(rating);

 	var newDiv = $("<div>");
 	newDiv.addClass("new-div");
 	newDiv.append(pTag, gifImage);
	$("#gifs").append(newDiv);
	}
	});
});
//When user clicks gif, make gif move or stop
$(document).on("click", "img", function() {
//if the state == still -> src = data-animate
//else if state is != still -> src = data-still
	var state = $(this).attr("data-state");
	var dataAnimate = $(this).attr("data-animate");
	var dataStill = $(this).attr("data-still");
	
	if (state == "still"){ 
		$(this).attr("src", dataAnimate);
		$(this).attr("data-state", "animate");
	}
	else{
		$(this).attr("src",dataStill);
		$(this).attr("data-state", "still");
	}

});



});