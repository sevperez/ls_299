// BACKBONE - MODELS - list.js

var List = Backbone.Model.extend({
  setup: function() {
    this.fetch({
      success: function(model, response) {
        // broadcast message to App on successful setup
        console.log("list loaded");
        App.trigger("listLoaded", model.id);
      },
    });
  },
  
  initialize: function() {
    this.url = "/lists/" + String(this.id);
    // this.setup();
  },
});
