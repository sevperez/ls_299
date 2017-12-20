// BACKBONE - VIEWS - newChecklist.js

var NewChecklistView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "newChecklist",
  },
  
  template: App.templates.newChecklist,
  
  events: {
    "click .fa-times": "close",
    "submit form": "broadcastNewChecklistSubmit",
  },
  
  close: function() {
    this.remove();
  },
  
  broadcastNewChecklistSubmit: function(e) {
    e.preventDefault();
    
    var title = this.$("form").serializeArray()[0].value;
    
    if (title) {
      App.trigger("addChecklist", title);
    }
    
    this.close();
  },
  
  render: function() {
    this.$el.html(this.template());
    return this;
  },
});
