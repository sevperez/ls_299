// BACKBONE - VIEWS - cardActivity.js

var CardActivityView = Backbone.View.extend({
  el: "#activity",
  
  template: App.templates.cardActivity,
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
