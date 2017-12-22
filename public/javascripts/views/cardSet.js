// BACKBONE - VIEWS - cardSet.js

var CardSetView = Backbone.View.extend({
  findParent: function(listId) {
    return $(".list[data-id='" + listId + "']").find('.cardList');
  },
  
  findPreviousSibling: function(card) {
    var newCardPosition = card.toJSON().position;
    var cardsOnDOM = $("#lists li.list[data-id='" + card.toJSON().list_id + "'] .cardList li.card");
    
    if (cardsOnDOM.length === 0) {
      return undefined;
    }
    
    var $closestPreviousSibling = cardsOnDOM.eq(0);
    
    cardsOnDOM.each(function(idx) {
      var closestPreviousSiblingPosition = $closestPreviousSibling.data("pos");
      var closestDistance = newCardPosition - closestPreviousSiblingPosition;
      var currentPosition = $(this).data("pos");
      var currentDistance = newCardPosition - currentPosition;
      
      if (currentDistance < closestDistance && currentDistance > 0) {
        $closestPreviousSibling = $(this);
      }
    });
    
    if ($closestPreviousSibling.data("pos") > newCardPosition) {
      return undefined;
    } else {
      return $closestPreviousSibling;
    }
  },
  
  fullRender: function() {
    this.$el.html('');
    
    var self = this;
    
    this.collection.each(function(card) {
      var view = new CardView({ model: card });
      self.$el.append(view.render().el);
    });
  },

  render: function(model) {
    var $previousSibling = this.findPreviousSibling(model);
   var view = new CardView({ model: model });
    
    // if a previous sibling exists, insert new view after, else prepend to beginning
    if ($previousSibling) {
      view.render().$el.insertAfter($previousSibling);
    } else {
      this.$el.prepend(view.render().el);
    }
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.render);
  },
  
  initialize: function(options) {
    this.$el = this.findParent(String(options.listId));
    this.bindEvents();
  },
});
