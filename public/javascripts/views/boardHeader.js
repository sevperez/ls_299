// BACKBONE - VIEWS - brdHeader.js

var BoardHeaderView = Backbone.View.extend({
  el: "#boardHeader",
  template: App.templates.boardHeader,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  
  bindEvents: function() {
    // render on board title change
    this.listenTo(this.model, "change:title", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
