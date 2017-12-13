// BACKBONE - MODELS - list.js

var List = Backbone.Model.extend({
  setup: function() {
    this.fetch({
      success: function(model, response) {
        // broadcast message to App on successful setup
        console.log("List Loaded", model);
      },
    });
  },
  
  initialize: function() {
    this.url = "/board/lists/" + String(this.id);
    this.setup();
  },
});
