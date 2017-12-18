// BACKBONE - VIEWS - dueDate.js

var DueDateView = Backbone.View.extend({
  el: "#dueCtnr",
  
  template: App.templates.dueDate,
  
  render: function() {
    this.$el.html(this.template({ due_date: this.model.toJSON().due_date }));
    
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
