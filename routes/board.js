// EXPRESS - ROUTES - board.js

var path = require("path");
var _ = require("underscore");

// include data store interaction module
var Interface = require(path.resolve(path.dirname(__dirname), "modules/dataInterface"));

module.exports = function(router) {
  router.route("/board").get(function(req, res, next) {
    res.json(Interface.get().board);
  });

  router.route("/lists").get(function(req, res, next) {
    res.json(Interface.get().lists);
  });
  
  router.route("/lists/:id").get(function(req, res, next) {
    res.json(_.where(Interface.get().lists, { id: +req.params.id })[0]);
  });
  
  router.route("/cards").get(function(req, res, next) {
    res.json(Interface.get().cards);
  });
  
  router.route("/cards/:id").get(function(req, res, next) {
    res.json(_.where(Interface.get().cards, { id: +req.params.id })[0]);
  });
  
  router.route("/lists/:id/cards").get(function(req, res, next) {
    res.json(_.where(Interface.get().cards, { list_id: +req.params.id }));
  });
  
  router.route("/labels/:id").get(function(req, res, next) {
    res.json(_.where(Interface.get().labels, { id: +req.params.id })[0]);
  });
};
