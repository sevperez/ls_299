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
  },
  
  openAddListDrawer: function(e) {
    e.preventDefault();
    
    $("#addList div:first-of-type").slideDown(100);
  },
  
  closeAddListDrawer: function(e) {
    e.preventDefault();
    
    $("#addList div:first-of-type").slideUp(100);
  },
  
  getNextId: function(collection) {
    return _.max(collection.toJSON(), function(item) {
      return item.id;
    }).id + 1;
  },
  
  buildNewList: function(name) {
    return {
      id: this.getNextId(this.lists),
      title: name,
      position: this.lists.length,
      board_id: this.board.toJSON().id,
      cards: [],
    };
  },
  
  addList: function(e) {
    e.preventDefault();
    var newName = $(this).serializeArray()[0].value;
    
    App.lists.add(App.buildNewList(newName));
    
    $(this).find("input").val("");
    $(this).find("a").trigger("click");
  },
  
  bindEvents: function() {
    // extend Backbone.Events to the App object
    _.extend(this, Backbone.Events);
    
    this.on("boardLoaded", this.setupLists);
    this.on("listLoaded", this.setupCardSet);
    this.on("cardSetLoaded", this.attachCardSetView);
    
    $("#addList div:last-of-type").on("click", this.openAddListDrawer);
    $("#addList div:first-of-type a").on("click", this.closeAddListDrawer);
    $("#addList div:first-of-type form").on("submit", this.addList);
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
