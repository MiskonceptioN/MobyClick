// Requirements
require ("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const fs = require("fs");

const app = express();

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
			// res.send({status: "success", content: "POST successful"});
			res.send({status: "info", content: "I like chips!"});
		}, 500); // 500ms delay to accommodate boostrap .collapse() - plus it looks cooler this way
	});

// Fire up the server
app.listen(3000, function(){
	console.log("Server listening on http://localhost:3000");
});
