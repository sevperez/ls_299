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
    "click #addLabelBtn": "broadcastLabelClick",
    "click #actions li:first-of-type": "broadcastLabelClick",
  },
  
  broadcastLabelClick: function() {
    App.trigger("openLabelSelector", this.model.toJSON().labels);
  },
  
  close: function() {
    // remove view from DOM, and from storage on App object
    this.remove();
    App.currentCardView = undefined;
  },
  
  setLabels: function() {
    var self = this;
    
    this.model.toJSON().labels.forEach(function(id) {
      var $li = self.$("[data-label='" + id + "']");
      var label = App.labels.get(id).toJSON();
      var color = label.color;
      var title = label.title;
      
      $li.addClass(color);
      $li.text(title);
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
    this.listenTo(this.model, "sync", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
    this.registerHelpers();
  },
});
