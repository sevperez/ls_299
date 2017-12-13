// BACKBONE - VIEWS - lists.js

var ListsView = Backbone.View.extend({
  el: "#lists",
  
  addListView: function(model, collection) {
    var view = new ListView({ model: model });
    this.$el.children().last().before(view.render().el);
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.addListView);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
