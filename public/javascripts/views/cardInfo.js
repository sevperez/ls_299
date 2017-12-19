// BACKBONE - VIEWS - cardInfo.js

var CardInfoView = Backbone.View.extend({
  tagName: "div",
  
  attributes: {
    id: "cardInfo"
  },
  
  template: App.templates.cardInfo,
  
  events: {
    "click #actions > a": "close",
    "click .overlay": "close",
    "click #addLabelBtn": "broadcastLabelClick",
    "click #labelAction": "broadcastLabelClick",
    "click #dueDateAction": "broadcastDueDateClick",
    "click #dueDate": "broadcastDueDateClick",
    "submit #cardComments form": "broadcastNewComment",
    "keyup #newComment": "checkCommentReady",
    // "click [data-anchor='delete']": "broadcastDeleteComment",
  },
  
  broadcastNewComment: function(e) {
    e.preventDefault();
    
    var text = this.$("#cardComments form").serializeArray()[0].value;
    
    // broadcast "addComment" event to App and send comment value
    App.trigger("addComment", text);
    
    // reset comment form to empty
    this.$("#newComment").val("");
    this.checkCommentReady();
  },
  
  // broadcastDeleteComment: function(e) {
  //   var commentId = $(e.target).closest("li").data("comment");
    
  //   App.trigger("deleteComment", commentId);
  // },
  
  checkCommentReady: function() {
    var val = this.$("#newComment").val();
    var $btn = this.$("#cardComments form button");
    
    if (val.length > 0) {
      $btn.removeAttr("disabled");
    } else {
      $btn.attr("disabled", "disabled");
    }
  },
  
  broadcastLabelClick: function() {
    App.trigger("openLabelSelector", this.model.toJSON().labels);
  },
  
  broadcastDueDateClick: function() {
    App.trigger("openDueDateSelector");
  },
  
  close: function() {
    // remove view from DOM, and subviews App object storage
    this.remove();
    App.currentCardView = undefined;
    App.currentDescriptionView = undefined;
    App.currentLabelsListView = undefined;
    App.currentDueDateView = undefined;
    App.currentActivityView = undefined;
  },
  
  registerHelpers: function() {
    Handlebars.registerHelper("formatDate", function(datetime) {
      var date = new Date(datetime);
      var dateParts = date.toString().split(" ");
      var mon = dateParts[1];
      var dt = dateParts[2];
      var time = dateParts[4].slice(0, 5);
      
      return mon + " " + dt + " at " + time + " hrs"; 
    });
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    
    return this;
  },
  
  initialize: function() {
    this.registerHelpers();
  },
});
