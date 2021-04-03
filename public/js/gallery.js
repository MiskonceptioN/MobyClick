populateFirstResult(gameJSON[0]);
populateOtherResults(gameJSON);

$("#cover_image").on("load", function(){
	hideLoadingWheel();
});

$("div.card").click(function() {
	$("div.card").removeClass("d-none");
	$(this).addClass("d-none");
	populateFirstResult(gameJSON[$(this).attr("game_id")]);
});

function populateFirstResult(game) {
	// Set the cover image
	setCoverArt(game.coverArt.image);

	// Set the tile
	$("#title").val(game.title);

	// Set the year
	$("#year").val(game.platforms[0].first_release_date.substring(0,4));

	// Set the description
	$("#description").val(game.description);

	// Set the tags
	let tags = "";
	game.genres.forEach(function(tag){
		tags += '<button type="button" class="btn btn-secondary mx-1 mb-1 btn-sm game-tag">&times; ' + tag.genre_name + '</button>';
	});
	$("#tags").html(tags);

	// Set the screenshots section HTML
	let screenshotsHTML = "";
	game.screenshots.forEach(function(ss){
		screenshotsHTML += "<img class='mx-1' src='" + ss.thumbnail_image + "' height='150' />";
	});
	$("#screenshot_gallery").html(screenshotsHTML);

	// Remove the cover image from the thumbnail list
	$("#screenshot_gallery > img:first-child").addClass("d-none");

	// Listeners //

	$(".game-tag").mouseenter(function(){
		$(this).addClass("btn-danger");
		$(this).removeClass("btn-secondary");
	});

	$(".game-tag").mouseleave(function(){
		$(this).addClass("btn-secondary");
		$(this).removeClass("btn-danger");
	});

	$(".game-tag").click(function(){
		$(this).fadeOut(200, function(){
			$(this).remove();
		});
	});
	// Add click listener to change cover image
	$("#screenshot_gallery img").click(function() {
		$("#screenshot_gallery img").removeClass("d-none");
		$(this).addClass("d-none");
		let newCoverImage = $(this).attr("src").replace("/s/", "/l/");
		setCoverArt(newCoverImage);
	});
}

function populateOtherResults(games) {
	let otherResultsHTML = "";

	games.forEach(function(game, i){
		otherResultsHTML += '<div class="card" game_id=' + i + '>';
		otherResultsHTML += '<div class="card-body"><p class="card-text">' + game.title + '</p></div>';
		otherResultsHTML += '<img src="' + game.coverArt.image + '" class="card-img-bottom img-fluid">';
		otherResultsHTML += '</div>';
	});

	$("#other_results").html(otherResultsHTML);
	$("#other_results > div.card:first-child").addClass("d-none");
}

function setCoverArt(imgSrc) {
	showLoadingWheel();
	$("#cover_image").attr({src: imgSrc});
}

function showLoadingWheel() {
	$("#loading_container").removeClass("d-none");
	$("#cover_image_container").addClass("d-none");
}

function hideLoadingWheel() {
	$("#loading_container").addClass("d-none");
	$("#cover_image_container").removeClass("d-none");
}
