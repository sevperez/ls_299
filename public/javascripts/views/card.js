// BACKBONE - VIEWS - card.js

var CardView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    class: "card",
  },
  
  template: App.templates.card,
  
  setLabels: function() {
    var self = this;
    
    this.model.toJSON().labels.forEach(function(id) {
      var color = App.labels.get(id).toJSON().color;
      
      self.$("[data-label='" + id + "']").addClass(color);
    });
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.setLabels();
    return this;
  },
  
  initialize: function() {
    this.$el.attr("data-id", this.model.id);
  },
});
