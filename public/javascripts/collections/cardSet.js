// BACKBONE - COLLECTIONS - cardSet.js

var CardSet = Backbone.Collection.extend({
  model: Card,
  
  getCards: function(listId) {
    this.fetch({
      success: function(collection, response) {
        console.log("card set " + String(listId) + " fetched");
      },
      error: function(collection, response, options) {
        console.log("error retrieving card set");
      },
    });
  },
  
  initialize: function(models, options) {
    this.url = "/boards/" + String(App.board.id) + "/lists/" + String(options.id) + "/cards";
  },
});
