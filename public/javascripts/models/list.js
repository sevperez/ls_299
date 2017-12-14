// BACKBONE - MODELS - list.js

var List = Backbone.Model.extend({
  initialize: function() {
    this.url = "/boards/" + String(App.board.id) + "/lists";
  },
});
