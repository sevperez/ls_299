// EXPRESS - ROUTES - board.js

var path = require("path");
var _ = require("underscore");

// include data store interaction module
var Interface = require(path.resolve(path.dirname(__dirname), "modules/dataInterface"));

module.exports = function(router) {
  router.route("/boards/:board_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().boards, { id: +req.params.board_id })[0]);
  }).put(function(req, res, next) {
    var newName = req.body.title;
    var data = Interface.get();
    var board = _.where(data.boards, { id: +req.params.board_id })[0];
    
    // change board name
    board.title = newName;
    
    // write new data
    Interface.write(data);
    
    // send back the new list
    res.json(board);
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
  }).put(function(req, res, next) {
    var data = Interface.get();
    
    // check if req.body has multiple objects and update accordingly
    if (_.isArray(req.body)) {
      data.lists = req.body;
    } else {
      var list = req.body;
      var dbList = _.find(data.lists, { id: list.id });
      
       // update dbList
      for (key in dbList) {
        dbList[key] = list[key];
      }
    }
    
    // write new data
    Interface.write(data);
    
    // send card back to client
    res.json(list);
  });
  
  router.route("/boards/:board_id/lists/:list_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().lists, { id: +req.params.list_id, board_id: +req.params.board_id })[0]);
  });
  
  router.route("/cards").get(function(req, res, next) {
    res.json(Interface.get().cards);
  }).put(function(req, res, next) {
    var allCards = req.body;
    var data = Interface.get();
    
    data.cards = allCards;

    Interface.write(data);

    res.json(allCards);
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
    
    // send back the new card
    res.json(card);
  });
  
  router.route("/boards/:board_id/lists/:list_id/cards/:card_id").put(function(req, res, next) {
    var card = req.body;
    var data = Interface.get();
    var dbCard = _.find(data.cards, { id: card.id });

    // update dbCard
    for (key in dbCard) {
      dbCard[key] = card[key];
    }
    
    // write new data
    Interface.write(data);
    
    // send card back to client
    res.json(card);
  });
  
  router.route("/labels").get(function(req, res, next) {
    res.json(Interface.get().labels);
  });
  
  router.route("/labels/:label_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().labels, { id: +req.params.label_id })[0]);
  });
  
  router.route("/comments").get(function(req, res, next) {
    res.json(Interface.get().comments);
  });
  
  router.route("/comments/:comment_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().comments, { id: +req.params.comment_id })[0]);
  });
  
  router.route("/checklists").get(function(req, res, next) {
    res.json(Interface.get().checklists);
  }).post(function(req, res, next) {
    var newChecklist = req.body;
    var data = Interface.get();
    
    // complete checklist object and add to data
    newChecklist.id = Interface.getNextId(data.checklists);
    data.checklists.push(newChecklist);
    
    // write new data
    Interface.write(data);
    
    // send new checklist back to client
    res.json(newChecklist);
  });
  
  router.route("/checklists/:checklist_id").get(function(req, res, next) {
    res.json(_.where(Interface.get().checklists, { id: +req.params.checklist_id })[0]);
  }).delete(function(req, res, next) {
    var id = +req.params.checklist_id;
    var data = Interface.get();
    
    var filteredChecklists = _.reject(data.checklists, function(checklist) {
      return checklist.id === id;
    });
    
    data.checklists = filteredChecklists;
    
    Interface.write(data);
    
    res.end();
  }).put(function(req, res, next) {
    var data = Interface.get();
    var checklist = req.body;
    var dbChecklist = _.find(data.checklists, { id: checklist.id });

    // update dbChecklist
    for (key in dbChecklist) {
      dbChecklist[key] = checklist[key];
    }
    
    // write new data
    Interface.write(data);
    
    // send card back to client
    res.json(dbChecklist);
  });
};
