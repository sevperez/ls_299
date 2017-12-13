// BACKBONE - VIEWS - list.js

var ListView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    class: "list",
  },
  
  template: App.templates.list,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$parent.append(this.$el);
  },
  
  initialize: function() {
    this.$el.data("id", this.model.id);
    this.$parent = $("#lists");
    this.render();
  },
});
