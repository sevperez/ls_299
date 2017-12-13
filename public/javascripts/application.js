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
    
    // create new list models and add to App.lists array
    this.lists = [];
    this.board.toJSON().lists.forEach(function(listId) {
      self.lists.push(new List({ id: listId }));
    });
  },
  
  createListView: function(listModel) {
    new ListView({ model: listModel });
  },
  
  bindEvents: function() {
    // extend Backbone.Events to the App object
    _.extend(this, Backbone.Events);
    
    this.on("boardLoaded", this.setupLists);
    this.on("listLoaded", this.createListView);
  },
  
  init: function(data) {
    // load initial data into app
    this.data = data;
    this.bindEvents();
    this.setupBoard();
  },
};
