// BACKBONE - VIEWS - checklist.js

var ChecklistView = Backbone.View.extend({
  tagName: "div",
  
  template: App.templates.checklist,
  
  events: {
    "click a[data-anchor='hideChecked']": "hideChecked",
    "click a[data-anchor='delete']": "delete",
    "click a[data-anchor='add']": "broadcastAddItem",
    "click ul li span": "broadcastItemStatusToggle",
    "click ul li a.fa-times": "broadcastItemDelete",
  },
  
  hideChecked: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    
    // toggle text as needed
    if ($target.text() === "Hide completed items") {
      $target.text("Show complete items");
      this.$(".complete").closest("li").hide();
    } else {
      $target.text("Hide completed items");
      this.$("li").show();
    }
  },
  
  delete: function(e) {
    e.preventDefault();
    
    var checklistId = this.$el.data("check");
    
    App.trigger("deleteChecklist", checklistId);
    this.remove();
  },
  
  broadcastAddItem: function(e) {
    e.preventDefault();
    
    console.log("add an item!");
  },
  
  broadcastItemStatusToggle: function(e) {
    e.preventDefault();
    
    console.log("toggle item!");
  },
  
  broadcastItemDelete: function(e)  {
    e.preventDefault();
    
    console.log("delete item!");
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  initialize: function() {
    this.$el.attr("data-check", this.model.id);
  },
});
