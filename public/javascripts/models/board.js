// BACKBONE - MODELS - board.js

var Board = Backbone.Model.extend({
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
    this.url = "/boards/" + String(this.id);
    this.setup();
  },
});
