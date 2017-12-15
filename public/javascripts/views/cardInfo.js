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
  
  registerHelpers: function() {
    Handlebars.registerHelper("formatDate", function(datetime) {
      var date = new Date(datetime);
      var dateParts = date.toString().split(" ");
      var mon = dateParts[1];
      var dt = dateParts[2];
      var time = dateParts[4].slice(0, 5);
      
      return mon + " " + dt + " at " + time + " hrs"; 
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
    this.registerHelpers();
  },
});
