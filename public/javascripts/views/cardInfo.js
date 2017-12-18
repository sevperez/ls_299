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
    "click #labelAction": "broadcastLabelClick",
    "click #dueDateAction": "broadcastDueDateClick",
    "click #dueDate": "broadcastDueDateClick",
  },
  
  broadcastLabelClick: function() {
    App.trigger("openLabelSelector", this.model.toJSON().labels);
  },
  
  broadcastDueDateClick: function() {
    App.trigger("openDueDateSelector");
  },
  
  close: function() {
    // remove view from DOM, and from storage on App object
    this.remove();
    App.currentCardView = undefined;
    App.currentLabelsListView = undefined;
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
    
    return this;
  },
  
  bindEvents: function() {
    // TEMP
  },
  
  initialize: function() {
    this.bindEvents();
    this.registerHelpers();
  },
});
