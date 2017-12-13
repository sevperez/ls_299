// BACKBONE - MODELS - board.js

var Board = Backbone.Model.extend({
  url: "/board",
  
  setup: function() {
    this.fetch({
      success: function() {
        // broadcast message to App on successful setup
        console.log("board fetched");
        App.trigger("boardLoaded");
      },
    });
  },
  
  initialize: function() {
    this.setup();
  },
});
