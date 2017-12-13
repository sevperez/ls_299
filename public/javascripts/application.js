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
    this.board.toJSON().lists.forEach(function(listId) {
      self.lists.add(new List({ id: listId }));
    });
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
