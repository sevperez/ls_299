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
  
  markChecked: function(ids) {
    var self = this;
    
    ids.forEach(function(id) {
      self.$("#labelOptions [data-label='" + String(id) + "'] > div").addClass("checked");
    });
  },
  
  render: function() {
    this.$el.html(this.template({ labels: this.collection.toJSON() }));
    return this;
  },
});