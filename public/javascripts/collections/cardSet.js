// BACKBONE - COLLECTIONS - cardSet.js

var CardSet = Backbone.Collection.extend({
  model: Card,
  
  setup: function(listId) {
    this.fetch({
      success: function(collection, response) {
        console.log("card set " + String(listId) + " fetched");
        App.trigger("cardSetLoaded", listId);
      },
    });
  },
  
  initialize: function(models, options) {
    this.url = "/boards/" + String(App.board.id) + "/lists/" + String(options.id) + "/cards";
    this.setup(options.id);
  },
});
