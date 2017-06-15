// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mainRoutes = require("./routes/main-routes.js")
var Users = require("./models/users.js");

// Create Instance of Express
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3001;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// Connect to Mongo 
mongoose.connect("mongodb://localhost/schedule-craft");
var db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function () {
  console.log("Mongoose connection successful.");
});


// This will redirect the user to our rendered React application
// var mainRoute = require('./routes/main-routes.js')(app);
// temporarily plaes in server.js because there is an error trying to call this route (with the above line 37 code)
// cannot recognize path when going one directory up using "../", out of routes and into public
app.get("/", function (req, res) {

  res.sendFile(__dirname + "/public/index.html", thisUser);

});

app.post("/register", function(req, res) {

});

app.post("/login", function(req, res) {

});
// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
