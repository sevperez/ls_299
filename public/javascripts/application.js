// APP CONTROLLER

var App = {
  templates: JST,
  
  setupBoard: function() {
    // add Board model and view to App
    this.board = new Board({ id: 1 });
    this.boardHeader = new BoardHeaderView({ model: this.board });
  },
  
  setupLists: function() {
    var self = this;
    
    // create new lists collection and view
    this.lists = new Lists([], { comparator: "position" });
    this.listsView = new ListsView({ collection: this.lists });
  },
  
  setupCardSet: function(listId) {
    // instantiates a new CardSet collection and stores on App object with listId as key
    this.cardSets[String(listId)] = new CardSet([], { id: listId });
  },
  
  attachCardSetView: function(listId) {
    var collection = this.cardSets[String(listId)];
    var view = new CardSetView({ collection: collection, listId: listId });
  },
  
  getNextId: function(collection) {
    return _.max(collection.toJSON(), function(item) {
      return item.id;
    }).id + 1;
  },
  
  buildNewList: function(name) {
    return {
      // id: this.getNextId(this.lists),
      title: name,
      position: this.lists.length,
      board_id: this.board.toJSON().id,
      cards: [],
    };
  },
  
  addList: function(name) {
    this.lists.create(this.buildNewList(name));
    // this.lists.sync();
  },
  
  bindEvents: function() {
    // extend Backbone.Events to the App object
    _.extend(this, Backbone.Events);
    
    this.on("boardLoaded", this.setupLists);
    this.on("listLoaded", this.setupCardSet);
    this.on("cardSetLoaded", this.attachCardSetView);
    this.on("addList", this.addList);
  },
  
  init: function(data) {
    // initialize cardSets object
    this.cardSets = {};
    
    // store labels
    this.labels = new Labels();
    
    this.bindEvents();
    this.setupBoard();
  },
};
