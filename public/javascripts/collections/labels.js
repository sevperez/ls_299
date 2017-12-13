// BACKBONE - COLLECTIONS - labels.js

var Labels = Backbone.Collection.extend({
  model: Label,
  
  url: "/labels",
  
  setup: function() {
    this.fetch({
      success: function() {
        console.log("labels fetched");
      },
    });
  },
  
  initialize: function() {
    this.setup();
  },
});
