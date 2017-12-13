// BACKBONE - VIEWS - lists.js

var ListsView = Backbone.View.extend({
  el: "#lists",
  
  addListView: function(model, collection) {
    // if an AddNewListView exists, remove it from the DOM
    if (this.addNewListView) {
      this.addNewListView.remove();
    }
    
    // add the new ListView and re-add an AddNewListView
    var view = new ListView({ model: model });
    this.$el.append(view.render().el);
    this.addNewListView = new AddNewListView();
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.addListView);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
