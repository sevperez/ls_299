// BACKBONE - COLLECTIONS - cardSet.js

var CardSet = Backbone.Collection.extend({
  model: Card,
  
  setup: function(listId) {
    this.fetch({
      success: function(collection, response) {
        // trigger cardSetLoaded event, passing associated list ID
        App.trigger("cardSetLoaded", listId);
      },
    });
  },
  
  initialize: function(models, options) {
    this.url = "/lists/" + String(options.id) + "/cards";
    this.setup(options.id);
  },
});
