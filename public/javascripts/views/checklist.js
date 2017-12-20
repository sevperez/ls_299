// BACKBONE - VIEWS - checklist.js

var ChecklistView = Backbone.View.extend({
  tagName: "div",
  
  template: App.templates.checklist,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  initialize: function() {
    this.$el.attr("data-check", this.model.id);
  },
});
