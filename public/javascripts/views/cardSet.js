// BACKBONE - VIEWS - cardSet.js

var CardSetView = Backbone.View.extend({
  findParent: function(listId) {
    return $(".list[data-id='" + listId + "']").find('.cardList');
  },
  
  render: function() {
    var self = this;
    
    this.collection.each(function(card) {
      var view = new CardView({ model: card });
      self.$el.append(view.render().el);
    });
  },
  
  bindEvents: function() {
    this.listenTo(this.collection, "all", this.render);
  },
  
  initialize: function(options) {
    this.$el = this.findParent(String(options.listId));
    this.bindEvents();
  },
});
