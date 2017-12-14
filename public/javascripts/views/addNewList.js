// BACKBONE - VIEWS - addNewList.js

var AddNewListView = Backbone.View.extend({
  tagName: "li",
  
  attributes: {
    id: "addList",
  },
  
  template: App.templates.addNewList,
  
  events: {
    "click div:last-of-type": "openDrawer",
    "click div:first-of-type a": "closeDrawer",
    "submit form": "broadcastAddList"
  },
  
  openDrawer: function() {
    this.$("div:first-of-type").slideDown(100);
    this.$("input[type='text']").focus();
  },
  
  closeDrawer: function() {
    this.$("div:first-of-type").slideUp(100);
    this.$("input[type='text']").val("");
  },
  
  broadcastAddList: function(e) {
    e.preventDefault();
    
    var newName = this.$("form").serializeArray()[0].value;
    
    // broadcast "addList" event to App and send newName
    App.trigger("addList", newName);
  },
  
  render: function() {
    this.$parent.append(this.$el.html(this.template()));
  },
  
  initialize: function() {
    this.$parent = $("#lists");
    this.render();
  },
});
