// BACKBONE - VIEWS - cardDescription.js

var CardDescriptionView = Backbone.View.extend({
  el: "#descCtnr",
  
  template: App.templates.cardDescription,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "change", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
