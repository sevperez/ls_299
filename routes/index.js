// EXPRESS - ROUTES - COMBINED - all.js

var path = require("path");
var fs = require("fs");

module.exports = function(router) {
  router.get("/", function(req, res, next) {
    res.render("index", { 
      title: "Trello Clone"
    });
  });
};
