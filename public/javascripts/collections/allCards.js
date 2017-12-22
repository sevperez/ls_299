// BACKBONE - COLLECTIONS - cardSet.js

var AllCards = Backbone.Collection.extend({
  model: Card,
  
  initialize: function(models, options) {
    this.url = "/cards";
  },
});
