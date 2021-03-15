// Requirements
require ("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const fs = require("fs");

const app = express();
const apiKey = process.env.API_KEY;
const mobyURL = "https://api.mobygames.com/v1/games?api_key=" + apiKey + "&title=";

// App config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));

// Routes
app.route("/")
	.get(function(req, res){
		res.render("index");
	});

app.route("/exampleAjaxPOST")
	.post(function(req, res){
		setTimeout(function(){
			if (req.body.title === "") {
				res.send({status: "danger", content: "Title is required"});
			} else {
				let gameInfo = [];
				axios.get(mobyURL + req.body.title)
					.then(function (response) {
						if (response.data.games.length > 0) {
							response.data.games.forEach(function(game){
								console.log(game);
								gameInfo.push({
									title: game.title,
									description: game.description,
									// genres: game.genres,
									// platforms: game.platforms,
									coverArt: game.sample_cover,
									screenshots: game.sample_screenshots
								});

								// gameInfo += "Title: " + game.title;
								// gameInfo += "<br>";
								// gameInfo += "Moby URL: <a href='" + game.moby_url + "' target='_blank'>" + game.moby_url + "</a>";
								// gameInfo += "<br>";
								// gameInfo += "<br>";
							});
							res.send({status: "info", content: JSON.stringify(gameInfo)});
							console.log(JSON.stringify(gameInfo));
						} else {
							res.send({status: "info", content: "No game found called '" + req.body.title + "'"});
						}
					})
					.catch(function (error) {
						// handle error
						console.log(error);
						res.send({status: "danger", content: "Request failed"});
					});
			}
		}, 500); // 500ms delay to accommodate boostrap .collapse() - plus it looks cooler this way
	});

// Fire up the server
app.listen(3000, function(){
	console.log("Server listening on http://localhost:3000");
});
