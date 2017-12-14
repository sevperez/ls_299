// BACKBONE - COLLECTIONS - lists.js

var Lists = Backbone.Collection.extend({
  model: List,
  
  setup: function() {
    this.fetch({
      success: function() {
        console.log("lists fetched");
        App.trigger("listsLoaded");
      },
    });
  },
  
  initialize: function() {
    this.url = "/boards/" + String(App.board.id) + "/lists",
    this.setup();
  },
});
