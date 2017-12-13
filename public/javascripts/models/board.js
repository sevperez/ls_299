// BACKBONE - MODELS - board.js

var Board = Backbone.Model.extend({
  url: "/board",
  
  setup: function() {
    this.fetch({
      success: function() {
        // broadcast message to App on successful setup
        App.trigger("boardLoaded");
      },
    });
  },
  
  initialize: function() {
    this.setup();
  },
});
