// App for photos -- Flickr API

var photoApp = {};

photoApp.apiKey = "3bcaaa9aa5ca1f1f47f1d32b53267e46";
photoApp.apiUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3bcaaa9aa5ca1f1f47f1d32b53267e46&tags=kittens&format=json&jsoncallback=?&extras=url_o";

photoApp.getPhoto = function(tag) {
	$.ajax({
		url: photoApp.apiUrl,
		method: "GET",
		dataType: "jsonp",
		data: {
			method: "flickr.photos.search",
			api_key: photoApp.apiKey,
			format: "json",
			tags: tag,
			min_upload_date: "2015-01-01 00:00:01",
			privacy_level: "1",

		}
	}).then(function(res) {
		console.log(res);
		photoApp.displayPhoto(res);
		quoteApp.init();
	});
}

photoApp.displayPhoto = function(photoInfo) {
	// Creates a random whole number between 0 and the length of the photos array 
	var randomNumber = function() {
		return Math.floor(Math.random() * photoInfo.photos.photo.length);
	};
	console.log(randomNumber());
	// Grabs the photo that is at the position of the random number and returns owner ID
	var ownerId = photoInfo.photos.photo[randomNumber()].owner;
	console.log(ownerId);
	// // Does the same with the photo ID
	// var photoId = photoInfo.photos.photo[randomNumber()].id;
	// console.log(photoId);
	// // Gets farm ID
	// var farmId = photoInfo.photos.photo[randomNumber()].farm;
	// console.log(farmId);
	// // Gets server ID
	// var serverId = photoInfo.photos.photo[randomNumber()].server;
	// console.log(serverId);
	// // Gets secret ID
	// var secretId = photoInfo.photos.photo[randomNumber()].secret;
	// console.log(secretId);
	// Strings together the ownerID and the photo ID to create the html link to the actual photo.
	// var photoChoice = "https://farm" + farmId + ".staticflickr.com/photos/" + serverId + "/" + userId + "_" + secretId + ".jpg";
	// var photoChoice = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + photoId + "_" + secretId + ".jpg";
	var photoUrl = photoInfo.photos.photo[randomNumber()].url_o;
	// Only grabs the photo if the original photo URL is available.
	if (photoUrl !== null) {
		// $("img").attr("src", photoUrl)}
		$("div#container").css("background-image", "url('" + photoUrl + "')");
		$("div.textWrapper").css("background", "rgba(0,0,0,0.5)");

	}
	// 	var photoCredit = "http://flickr.com/photos/" + ownerId;
	// $("h3").html("Photo from " + "<a href=" + photoCredit + "> flickr"); 	
}

photoApp.getTag = function() {
	// Object containing options for tag search based on radio button selections
	var tags = {
		art: [ "painting", "paintbrush", "paint" ],
		writing: [ "book", "pencil", "typewriter" ],
		code: [ "computer", "hacker", "coding" ],
		science: [ "science", "planets", "galaxy", "scientist" ],
		everything: [ "puppy", "kitten", "puppies", "kittens" ]
	}
	// On click of submit button, perform this function:
	$("#submit").on("click", function(e) {
		e.preventDefault();
		// Finds the value of the checked radio button
		var tagChoice = $("input[name=projectChoice]:checked").val();
		console.log(tagChoice)
		// Grabs the object with the corresponding value 
		var tagOptions = tags[tagChoice];
		console.log(tagOptions);
		// Generates a random number between 0 and the length of the array from the matching object
		var randomNumber = Math.floor( Math.random() * tagOptions.length);
		console.log(randomNumber);
		// Selects a single tag from that position in the array and puts it into the finalTag variable
		var finalTag = tagOptions[randomNumber];
		console.log(finalTag);
		// Passes the tag into the getPhoto function as the search parameter
		photoApp.getPhoto(finalTag);
	});
};

photoApp.init = function() {
	// photoApp.getPhoto();
	photoApp.getTag();
}


// photoApp.displayPhoto = function(photo) {
// 	var randomNumber = function() {
// 		return Math.floor(Math.random() * photo.photos.length);
// 	};
// 	console.log(randomNumber());
// 	// Grabs the photo that is at the position of the random number
// 	var currentPhoto = roverPics.photos[randomNumber()].img_src;
// 	$("img").attr("src", currentPhoto);
// }




// App for Quotes -- Wisdom API
var quoteApp = {};

quoteApp.apiUrl = "https://wisdomapi.herokuapp.com/v1/random";
// Gets a reandom quote
quoteApp.getQuote = function() {
	$.ajax({
		url: quoteApp.apiUrl,
		method: "GET",
		dataType: "jsonp",
		// data: {

		// }
	}).then(function(res) {
		// if (res.tags)
		console.log(res);
		quoteApp.displayQuote(res);
	});
}
// quoteApp.getQuote();

quoteApp.displayQuote = function(quote) {
	// Display quote text
	var quoteContent = quote.content;
	console.log(quoteContent);
	$("h2.inspoText").text(quoteContent);
	// Display author's name
	var author = quote.author.name;
	console.log(author);
	$("p.author").text(author);

	// Display company name
	var company = quote.author.company;
	console.log(company);
	$("p.company").text(company);
}

quoteApp.addListeners = function() {
	$("button").on("click", function(e) {
		e.preventDefault();
		quoteApp.displayQuote();
	})
}
quoteApp.init = function() {
	quoteApp.getQuote();
	quoteApp.addListeners();
}

$(function() {
    photoApp.init();
    // quoteApp.init();
    // var bgImage = "http://unsplash.it/400/400"
    // $("div#container").css("background-image", "url('" + http://unsplash.it/400/400')");
});

 