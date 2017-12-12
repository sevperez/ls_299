// EXPRESS - ROUTES - COMBINED - all.js

// iterate over all routes and include them in app.js

var express = require("express");
var path = require("path");
var router = express.Router();

// array of route files
var routeFiles = ["index"];

for (var i = 0; i < routeFiles.length; i += 1) {
  // require each route file, passing in the router
  // eliminates need to include express / router each time
  console.log(path.resolve(path.dirname(__dirname), "routes/" + routeFiles[i]));
  require(path.resolve(path.dirname(__dirname), "routes/" + routeFiles[i]))(router);
}

module.exports = router;
