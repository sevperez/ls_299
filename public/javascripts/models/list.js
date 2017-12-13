// BACKBONE - MODELS - list.js

var List = Backbone.Model.extend({
  setup: function() {
    this.fetch({
      success: function(model, response) {
        // broadcast message to App on successful setup
        App.trigger("listLoaded", model);
      },
    });
  },
  
  initialize: function(attributes, options) {
    this.url = "/board/lists/" + String(this.id);
    this.setup();
  },
});
