// BACKBONE - MODELS - list.js

var List = Backbone.Model.extend({
  setup: function() {
    this.fetch({
      success: function(model, response) {
        console.log(response);
      },
    });
  },
  
  initialize: function(attributes, options) {
    this.url = "/board/lists/" + String(this.id);
    this.setup();
  },
});
