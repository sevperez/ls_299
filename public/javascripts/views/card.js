// BACKBONE - VIEWS - card.js

var CardView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    class: "card",
  },
  
  events: {
    "click": "broadcastCardClick",
  },
  
  template: App.templates.card,
  
  broadcastCardClick: function() {
    App.trigger("cardClick", this.model);
  },
  
  registerHelpers: function() {
    Handlebars.registerHelper("hasDueDate", function(dueDate) {
      return dueDate !== "";
    });
    
    Handlebars.registerHelper("hasComments", function(comments) {
      return comments && comments.length !== 0;
    });
    
    Handlebars.registerHelper("hasChecklists", function(checklists) {
      return checklists && checklists.length !== 0;
    });
    
    Handlebars.registerHelper("hasDescription", function(description) {
      return description !== "";
    });
    
    Handlebars.registerHelper("countArr", function(arr) {
      return arr.length;
    });
    
    Handlebars.registerHelper("shortDate", function(dateStr) {
      var parts = new Date(dateStr).toDateString().split(" ");
      
      return parts[1] + " " + parts[2];
    });
    
    Handlebars.registerHelper("checklistStatus", function(checklists) {
      var total = 0;
      var completed = 0;
      
      checklists.forEach(function(id) {
        var currentListItems = App.checklists.get(id).toJSON().items;
        total += currentListItems.length;
        completed += _.where(currentListItems, { complete: true }).length;
      });
      
      return String(completed) + "/" + String(total);
    });
    
    Handlebars.registerHelper("hasIcons", function() {
      return Handlebars.helpers.hasDueDate(this.due_date) ||
               Handlebars.helpers.hasComments(this.comments) ||
               Handlebars.helpers.hasChecklists(this.checklists) ||
               Handlebars.helpers.hasDescription(this.description);
    });
  },
  
  setLabels: function() {
    var self = this;
    
    this.model.toJSON().labels.forEach(function(id) {
      var color = App.labels.get(id).toJSON().color;
      
      self.$("[data-label='" + id + "']").addClass(color);
    });
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.setLabels();
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  initialize: function() {
    this.$el.attr("data-id", this.model.id);
    this.$el.attr("data-pos", this.model.toJSON().position);
    this.registerHelpers();
    this.bindEvents();
  },
});
