// EXPRESS - ROUTES - index.js

var path = require("path");

// include board module
var Board = require(path.resolve(path.dirname(__dirname), "modules/boardCRUD"));

module.exports = function(router) {
  router.get("/", function(req, res, next) {
    res.render("index", { 
      title: "Trello Clone"
    });
  });
  // router.route("/board").get(function(req, res, next) {
  //   res.json(Board.get());
  //   // res.send("hello world");
  // });
};
