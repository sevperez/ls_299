// BACKBONE - VIEWS - dueDateSelect.js

var DueDateSelectView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "dueDateSelect"
  },
  
  template: App.templates.dueDateSelect,
  
  events: {
    "click .fa-times": "close",
    "click .btn[type='submit']": "broadcastDueDateSubmit",
    "click .btn[type='button']": "broadcastDueDateRemove",
  },
  
  
  close: function() {
    this.remove();
  },
  
  broadcastDueDateSubmit: function(e) {
    e.preventDefault();
    
    var date = this.$("form").serializeArray()[0].value;
    var time = this.$("form").serializeArray()[1].value || "00:00";
    
    // if valid date, broadcast change
    if (date) {
      var datetime = date + "T" + time;
      
      // broadcast event to App and send newName
      App.trigger("changeDueDate", datetime);
    }
    
    // close form
    this.close();
  },
  
  broadcastDueDateRemove: function(e) {
    e.preventDefault();
    
    // broadcast event to App
    App.trigger("removeDueDate");
    
    // close form
    this.close();
  },
  
  getDateData: function() {
    var card = App.currentCardView.model;
    
    if (card.toJSON().due_date) {
      var dateParts = card.toJSON().due_date.split("T");
      var date = dateParts[0];
      var time = dateParts[1].slice(0, 5);
      
      return { date: date, time: time };
    } else {
      return { date: "", time: "" };
    }
  },
  
  render: function() {
    this.$el.html(this.template(this.getDateData()));
    return this;
  },
});
