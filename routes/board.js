// EXPRESS - ROUTES - board.js

var path = require("path");
var _ = require("underscore");

// include data store interaction module
var Interface = require(path.resolve(path.dirname(__dirname), "modules/dataInterface"));

module.exports = function(router) {
  router.route("/boards/:board_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().boards, { id: +req.params.board_id })[0]);
  });

  router.route("/boards/:board_id/lists").get(function(req, res, next) {
    res.json(_.where(Interface.get().lists, { board_id: +req.params.board_id }));
  });
  
  // .post(function(req, res, next) {
  //   var list = req.body;
  //   var data = Interface.get();
    
  //   list.id = Interface.getNextId(data.lists);
    
  //   console.log(list);
  //   // push new list to data
  //   data.lists.push(req.body);
    
  //   // push list id to board's array of lists
  //   data.board.lists.push(req.body.id);
    
  //   // write new data
  //   Interface.write(data);
    
  //   // send back the new list
  //   res.json(req.body);
  // });
  
  router.route("/lists/:list_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().lists, { id: +req.params.list_id })[0]);
  });
  
  router.route("/cards").get(function(req, res, next) {
    res.json(Interface.get().cards);
  });
  
  router.route("/cards/:card_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().cards, { id: +req.params.card_id })[0]);
  });
  
  router.route("/lists/:list_id/cards").get(function(req, res, next) {
    res.json(_.where(Interface.get().cards, { list_id: +req.params.list_id }));
  });
  
  router.route("/labels").get(function(req, res, next) {
    res.json(Interface.get().labels);
  });
  
  router.route("/labels/:label_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().labels, { id: +req.params.label_id })[0]);
  });
};
