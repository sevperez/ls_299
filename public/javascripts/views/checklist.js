// BACKBONE - VIEWS - checklist.js

var ChecklistView = Backbone.View.extend({
  tagName: "div",
  
  template: App.templates.checklist,
  
  events: {
    "click a[data-anchor='hideChecked']": "hideChecked",
    "click a[data-anchor='delete']": "delete",
    "click a[data-anchor='add']": "openNewItemDrawer",
    "click .newItem a.fa-times": "closeNewItemDrawer",
    "submit .newItem form": "broadcastAddItem",
    "click ul li span": "broadcastToggleItem",
    "click ul li a.fa-times": "broadcastDeleteItem",
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
  
  openNewItemDrawer: function(e) {
    e.preventDefault();
    
    this.$("a[data-anchor='add']").hide();
    this.$(".newItem").show();
    this.$(".newItem input").focus();
  },
  
  closeNewItemDrawer: function(e) {
    e.preventDefault();
    
    this.$(".newItem").hide();
    this.$("a[data-anchor='add']").show();
  },
  
  broadcastAddItem: function(e) {
    e.preventDefault();

    var id = this.model.id;    
    var title = this.$("form").serializeArray()[0].value;
    
    App.trigger("addChecklistItem", id, title);
    
    this.$("form input").val("");
    this.$(".newItem").hide();
    this.$("a[data-anchor='add']").show();
  },
  
  broadcastToggleItem: function(e) {
    e.preventDefault();
    
    var checklistId = this.model.id;
    var itemId = $(e.target).closest("li").data("item");
    
    App.trigger("toggleChecklistItem", checklistId, itemId);
  },
  
  broadcastDeleteItem: function(e)  {
    e.preventDefault();
    
    var checklistId = this.model.id;
    var itemId = $(e.target).closest("li").data("item");
    
    App.trigger("deleteChecklistItem", checklistId, itemId);
  },
  
  update: function() {
    var card = App.currentCardView.model;
    card.trigger("sync");
    this.render();
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "sync", this.update);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  initialize: function() {
    this.$el.attr("data-check", this.model.id);
    this.bindEvents();
  },
});
