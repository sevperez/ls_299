// BACKBONE - VIEWS - boardNameChange.js

var BoardNameChangeView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "changeBoardName"
  },
  
  template: App.templates.changeBoardName,
  
  events: {
    "click form > div > a": "close",
    "click .overlay": "close",
    "submit form": "broadcastNameChangeSubmit"
  },
  
  close: function() {
    this.remove();
  },
  
  render: function() {
    this.$el.html(this.template({ name: App.board.toJSON().title }));
    return this;
  },
  
  broadcastNameChangeSubmit: function(e) {
    e.preventDefault();
    
    var newName = this.$("form").serializeArray()[0].value;
    
    // broadcast event to App and send newName
    App.trigger("boardNameChangeSubmit", newName);
    
    // close form
    this.close();
  },
});
