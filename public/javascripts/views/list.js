// BACKBONE - VIEWS - list.js

var ListView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    class: "list",
  },
  
  template: App.templates.list,
  
  events: {
    "click div:last-of-type": "openDrawer",
    "click div:first-of-type a": "closeDrawer",
    "submit form": "broadcastAddCard"
  },
  
  openDrawer: function() {
    this.$("#addCard div:first-of-type").slideDown(100);
    this.$("#addCard input[type='text']").focus();
  },
  
  closeDrawer: function(e) {
    e.stopPropagation();
    this.$("#addCard div:first-of-type").slideUp(100);
    this.$("#addCard input[type='text']").val("");
  },

  broadcastAddCard: function(e) {
    e.preventDefault();
    
    var newName = this.$("form").serializeArray()[0].value;
    
    // broadcast "addList" event to App and send newName
    App.trigger("addCard", newName, this.model.id);
    this.closeDrawer(e);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "add", this.render);
  },
  
  initialize: function() {
    this.$el.attr("data-id", this.model.id);
    this.bindEvents();
  },
});
