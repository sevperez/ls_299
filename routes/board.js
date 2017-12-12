// EXPRESS - ROUTES - board.js

var path = require("path");
var _ = require("underscore");

// include board module
var Board = require(path.resolve(path.dirname(__dirname), "modules/boardCRUD"));

module.exports = function(router) {
  router.route("/board").get(function(req, res, next) {
    res.json(Board.get());
  });
};
