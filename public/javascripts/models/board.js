// BACKBONE - MODELS - board.js

var Board = Backbone.Model.extend({
  url: "/board",
  
  initialize: function() {
    this.fetch();
  },
});
