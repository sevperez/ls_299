// BACKBONE - VIEWS - cardTitle.js

var CardTitleView = Backbone.View.extend({
  el: "#titleCtnr",
  
  template: App.templates.cardTitle,
  
  events: {
    "click h2": "openEditInput",
    "click #cardTitleEdit .editOverlay": "closeEditInput",
  },
  
  openEditInput: function() {
    // hide h2 and open edit input
    this.$("h2").hide();
    this.$("#cardTitleEdit").show();
    this.$("#cardTitleEdit input").focus();
  },
  
  closeEditInput: function() {
    var newTitle = $("#cardTitleEdit input").val();
    
    // trigger "editCardTitle" on App and send newTitle
    if (newTitle !== this.model.toJSON().title) {
      App.trigger("editCardTitle", newTitle);
    }
    
    // hide input and display h2
    this.$("#cardTitleEdit").hide();
    this.$("h2").show();
  },
  
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
