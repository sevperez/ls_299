// APP CONTROLLER

var App = {
  templates: JST,
  
  setupBoard: function() {
    // add Board model and view to App
    this.board = new Board();
    this.boardHeader = new BoardHeaderView({ model: this.board });
  },
  
  setupLists: function() {
    var self = this;
    
    // create new lists collection and view
    this.lists = new Lists([], { comparator: "position" });
    this.listsView = new ListsView({ collection: this.lists });
    
    // iterate over board list IDs, creating a new List for each
    this.board.toJSON().lists.forEach(function(listId) {
      self.lists.add(new List({ id: listId }));
    });
  },
  
  setupCardSet: function(listId) {
    // fires on "listLoaded" event
    // instantiates a new CardSet collection
    // stores on the cardSets object using the associated listId as the key
    this.cardSets[String(listId)] = new CardSet([], { id: listId });
  },
  
  attachCardSetView: function(listId) {
    var collection = this.cardSets[String(listId)];
    var view = new CardSetView({ collection: collection, listId: listId });
    
    console.log("el: ", view.el);
    console.log("collection: ", view.collection.toJSON());
  },
  
  bindEvents: function() {
    // extend Backbone.Events to the App object
    _.extend(this, Backbone.Events);
    
    this.on("boardLoaded", this.setupLists);
    this.on("listLoaded", this.setupCardSet);
    this.on("cardSetLoaded", this.attachCardSetView);
  },
  
  init: function(data) {
    // initialize cardSets object
    this.cardSets = {};
    
    this.bindEvents();
    this.setupBoard();
  },
};
