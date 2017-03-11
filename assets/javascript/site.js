$(document).ready(function() {

    //An array that houses all the preset topic buttons
    var topics = ["Dogs", "Cats", "Hamsters", "Parrots", "Pigs"];

    //Create a button function
    function createButtons(buttonFactory) {
        for (i = 0; i < buttonFactory.length; i++) {
            // $("#topic-buttons").append("<button id =" + topics[i] + ">");
            // $("button#" + topics[i]).text(topics[i]);
            var button = $("<button>", { class: "btn btn-primary"});
            button.attr("id", buttonFactory[i]).text(buttonFactory[i]);
            $("#topic-buttons").append(button);

        }
    }
    //Creating the preset buttons
    createButtons(topics);

    //when user clicks 'add,' run function
    $("#input-button").click(function() {
        //Creating a new array to house the new topics
        var newTopicsArr = [];
        //Get the value of user input and add it to a variable
        var newTopicVar = $("#user-input").val();
        //Add the new topic to the array new topics array
        newTopicsArr.push(newTopicVar);
        //Create button of topics array
        createButtons(newTopicsArr);

    });

    //When user clicks a topic button- do something
    $(document).on("click", "button", function() {
        //create variables for image and URL (limit 10 images)
        $("#gifs").empty();
        var image = $(this).attr("id");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + image + "&api_key=dc6zaTOxFJmzC&limit=10";

        //Running the query and getting the data
        $.ajax({
            url: queryUrl,
            method: "GET"
                //Once data loads our promise function runs and begins to sort out what we need	
        }).done(function(response) {
            for (i = 0; i < response.data.length; i++) {
                var movingPath = response.data[i].images.fixed_height.url;
                var stillPath = response.data[i].images.fixed_height_still.url;
                var rating = response.data[i].rating;
                //Adding attributes for if statement	
                var gifImage = $("<img>", { class: "panel-body" });
                gifImage.attr("data-state", "still")
                    .attr("data-animate", movingPath)
                    .attr("data-still", stillPath)
                    .attr("src", stillPath);
                var h3Tag = $("<h3>", { class: "panel-heading" });
                h3Tag.text(rating);

                var contentDiv = $("<div>", { class: "content-div", class: "panel panel-success" });
                $("#gifs").append(contentDiv);
                contentDiv.append(h3Tag, gifImage);
            }
        });
    });
    //When user clicks gif, make gif move or stop
    $(document).on("click", "img", function() {
        var state = $(this).attr("data-state");
        var dataAnimate = $(this).attr("data-animate");
        var dataStill = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", dataAnimate);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", dataStill);
            $(this).attr("data-state", "still");
        }
    });
});
