// EXPRESS - ROUTES - index.js

var path = require("path");

// include board module
var Interface = require(path.resolve(path.dirname(__dirname), "modules/dataInterface"));

module.exports = function(router) {
  router.get("/", function(req, res, next) {
    res.render("index", { 
      // load data and send to index view
      title: "Trello Clone",
      // data: Interface.get()
    });
  });
};
