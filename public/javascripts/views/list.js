// BACKBONE - VIEWS - list.js

var ListView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    class: "list",
  },
  
  template: App.templates.list,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "all", this.render);
  },
  
  initialize: function() {
    this.$el.data("id", this.model.id);
    this.bindEvents();
  },
});
