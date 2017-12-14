// BACKBONE - VIEWS - cardInfo.js

var CardInfoView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "cardInfo"
  },
  
  template: App.templates.cardInfo,
  
  events: {
    "click #actions > a": "close",
    "click .overlay": "close",
  },
  
  close: function() {
    this.remove();
  },
  
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
  
  bindEvents: function() {
    
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
