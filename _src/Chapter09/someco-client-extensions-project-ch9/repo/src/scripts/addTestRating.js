// add the aspect to this document if it needs it
if (document.hasAspect("sc:rateable")) {
	logger.log("Document already as aspect");
} else {
	logger.log("Adding rateable aspect");
	document.addAspect("sc:rateable");
}

// generate a random number of ratings between 0 and 25
var nbOfRatings = Math.floor((Math.random() * 25) + 1);
for (var i = 0; i < nbOfRatings; i++)
	createRating();

function createRating() {

	// randomly pick a num b/w 1 and 5 inclusive
	var ratingValue = Math.floor(Math.random() * 5) + 1;
	var props = new Array(2);
	props["sc:rating"] = ratingValue;
	props["sc:rater"] = person.properties.userName;
	// create a new ratings node and set its properties
	var ratingsNode = document.createNode("rating" + new Date().getTime(), "sc:rating", props, "sc:ratings");
	ratingsNode.save();
	logger.log("Ratings node saved.");

}