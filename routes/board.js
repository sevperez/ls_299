// EXPRESS - ROUTES - board.js

var path = require("path");
var _ = require("underscore");

// include data store interaction module
var Interface = require(path.resolve(path.dirname(__dirname), "modules/dataInterface"));

module.exports = function(router) {
  router.route("/board").get(function(req, res, next) {
    res.json(Interface.get().board);
  });
};
