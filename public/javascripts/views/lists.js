// BACKBONE - VIEWS - lists.js

var ListsView = Backbone.View.extend({
  el: "#lists",
  
  findPreviousSibling: function(position) {
    var listsOnDOM = $("#lists .list");
    
    if (listsOnDOM.length === 0) {
      return undefined;
    }
    
    var $closestPreviousSibling = listsOnDOM.eq(0);
    
    listsOnDOM.each(function(idx) {
      var currentDistance = position - $closestPreviousSibling.data("pos");
      
      if (position - $(this).data("pos") < currentDistance && position - $(this).data("pos") > 0) {
        $closestPreviousSibling = $(this);
      }
    });
    
    if ($closestPreviousSibling.data("pos") > position) {
      return undefined;
    } else {
      return $closestPreviousSibling;
    }
  },
  
  handleNewList: function(model, collection) {
    // if an AddNewListView exists, remove it from the DOM
    if (this.addNewListView) {
      this.addNewListView.remove();
    }
    
    // add the new ListView and title subview
    var view = new ListView({ model: model });
    
    var $previousSibling = this.findPreviousSibling(model.toJSON().position);
    
    // if a previous sibling exists, insert new view after, else prepend to beginning
    if ($previousSibling) {
      view.render().$el.insertAfter($previousSibling);
    } else {
      this.$el.prepend(view.render().el);
    }
    
    var subview = new ListTitleView({ model: model });
    subview.render();
    
    // re-add an AddNewListView
    this.addNewListView = new AddNewListView();
    
    // add view's ul.cardList item to dragula to enable drag/drop of cards
    App.drake.containers.push(view.$(".cardList")[0]);
    
    // trigger new cardSet and cardSet view
    App.trigger("addCardSet", model.id);
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.handleNewList);
  },
  
  initialize: function() {
    this.bindEvents();
    
    // add to dragula to enable list drag/drop
    App.drake.containers.push(this.el);
  },
});
