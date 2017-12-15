// BACKBONE - VIEWS - labelSelector.js

var LabelSelectorView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "labelSelector",
  },
  
  template: App.templates.labelSelector,
  
  events: {
    "click .fa-times": "close",
  },
  
  close: function() {
    this.remove();
  },
  
  render: function() {
    this.$el.html(this.template({ labels: this.collection.toJSON() }));
    return this;
  },
});
