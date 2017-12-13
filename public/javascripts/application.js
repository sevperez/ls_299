// APP CONTROLLER

var App = {
  templates: JST,
  
  setupBoard: function() {
    // add Board model and view to App
    this.board = new Board();
    this.boardHeader = new BoardHeaderView({ model: this.board });
    
    // setup initial lists
    
  },
  
  init: function(data) {
    // load initial data into app
    this.data = data;

    this.setupBoard();
  },
};
