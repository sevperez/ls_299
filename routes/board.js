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
  }).post(function(req, res, next) {
    var list = req.body;
    var data = Interface.get();
    var board = _.where(data.boards, { id: +req.params.board_id })[0];
    
    // set list id and push new list to data
    list.id = Interface.getNextId(data.lists);
    data.lists.push(list);
    
    // push list id to board's array of lists
    board.lists.push(req.body.id);
    
    // write new data
    Interface.write(data);
    
    // send back the new list
    res.json(list);
  });
  
  router.route("/boards/:board_id/lists/:list_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().lists, { id: +req.params.list_id, board_id: +req.params.board_id })[0]);
  });
  
  router.route("/cards").get(function(req, res, next) {
    res.json(Interface.get().cards);
  });
  
  router.route("/cards/:card_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().cards, { id: +req.params.card_id })[0]);
  });
  
  router.route("/boards/:board_id/lists/:list_id/cards").get(function(req, res, next) {
    var cardSet = _.where(Interface.get().cards, { list_id: +req.params.list_id });
    res.json(cardSet);
  }).post(function(req, res, next) {
    var card = req.body;
    var data = Interface.get();
    var list = _.where(data.lists, { id: +req.params.list_id })[0];
    
    // set card id and push new card to data
    card.id = Interface.getNextId(data.cards);
    data.cards.push(card);
    
    // push card id to board's array of cards
    list.cards.push(card.id);
    
    // write new data
    Interface.write(data);
    
    // send back the new list
    res.json(card);
  });
  
  router.route("/labels").get(function(req, res, next) {
    res.json(Interface.get().labels);
  });
  
  router.route("/labels/:label_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().labels, { id: +req.params.label_id })[0]);
  });
  
  router.route("/checklists").get(function(req, res, next) {
    res.json(Interface.get().checklists);
  });
  
  router.route("/checklists/:checklist_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().checklists, { id: +req.params.checklist_id })[0]);
  });
};
