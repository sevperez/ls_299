// BACKBONE - VIEWS - cardSet.js

var CardSetView = Backbone.View.extend({
  findParent: function(listId) {
    return $(".list[data-id='" + listId + "']").find('.cardList');
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
    var view = new CardView({ model: model });
    this.$el.append(view.render().el);
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "add", this.render);
  },
  
  initialize: function(options) {
    this.$el = this.findParent(String(options.listId));
    this.bindEvents();
  },
});
