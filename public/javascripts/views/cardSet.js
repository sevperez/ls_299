// BACKBONE - VIEWS - cardSet.js

var CardSetView = Backbone.View.extend({
  render: function() {
    
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "all", this.render);
  },
  
  initialize: function(options) {
    this.el = $(".list[data-id='" + String(options.listId) + "']")[0];
    this.bindEvents();
  },
});
