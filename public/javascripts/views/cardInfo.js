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
    "click #openEditDescription": "openEditDescription",
    "click #closeEditDescription": "closeEditDescription",
    "submit #editDescription form": "broadcastNewDescription",
  },
  
  broadcastLabelClick: function() {
    App.trigger("openLabelSelector", this.model.toJSON().labels);
  },
  
  broadcastDueDateClick: function() {
    App.trigger("openDueDateSelector");
  },
  
  openEditDescription: function() {
    $("#openEditDescription").hide();
    $("#cardDescription").hide();
    $("#newDescription").val(this.model.toJSON().description);
    $("#editDescription").show();
    $("#newDescription").select();
  },
  
  closeEditDescription: function(e) {
    if (e) {
      e.preventDefault();
    }
    
    $("#editDescription").hide();
    $("#newDescription").val("");
    $("#openEditDescription").show();
    $("#cardDescription").show();
  },
  
  broadcastNewDescription: function(e) {
    e.preventDefault();
    
    var newDescription = this.$("#editDescription form").serializeArray()[0].value;
    
    // broadcast "changeDescription" event to App and send newDescription
    if (newDescription !== this.model.toJSON().description) {
      App.trigger("changeDescription", newDescription);
    }
    
    this.closeEditDescription();
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
    // this.on("reRender", this.render());
  },
  
  initialize: function() {
    this.registerHelpers();
    this.bindEvents();
  },
});
