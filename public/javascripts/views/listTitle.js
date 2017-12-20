// BACKBONE - VIEWS - listTitle.js

var ListTitleView = Backbone.View.extend({
  template: App.templates.listTitle,
  
  events: {
    "click h4": "openEditInput",
    "click .listTitleEdit .editOverlay": "closeEditInput",
  },
  
  openEditInput: function() {
    // hide h4 and open edit input
    this.$("h4").hide();
    this.$(".listTitleEdit").show();
    this.$(".listTitleEdit input").focus();
  },
  
  closeEditInput: function() {
    var newTitle = this.$(".listTitleEdit input").val();
    
    // trigger "listTitleEdit" on App and send newTitle
    if (newTitle !== this.model.toJSON().title) {
      App.trigger("editListTitle", this.model, newTitle);
    }
    
    // hide input and display h2
    this.$(".listTitleEdit").hide();
    this.$("h4").show();
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "change", this.render);
  },
  
  initialize: function() {
    // set $el
    var el = $("#lists .list[data-id='" + this.model.id + "'] .listTitleCtnr")[0];
    this.setElement(el);
    
    this.bindEvents();
    this.openEditInput();
  },
});
