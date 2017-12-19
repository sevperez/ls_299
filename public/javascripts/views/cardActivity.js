// BACKBONE - VIEWS - cardActivity.js

var CardActivityView = Backbone.View.extend({
  el: "#activity",
  
  template: App.templates.cardActivity,
  
  events: {
    "click [data-anchor='delete']": "broadcastDeleteComment",
    "click [data-anchor='edit']": "openEditForm",
    "click .editCommentForm form a": "closeEditForm",
    "submit .editCommentForm form": "broadcastEditComment",
  },
  
  broadcastDeleteComment: function(e) {
    var commentId = $(e.target).closest("li").data("comment");
    
    App.trigger("deleteComment", commentId);
  },
  
  openEditForm: function(e) {
    e.preventDefault();
    
    var $li = $(e.target).closest("li");
    
    $li.find(".commentArea").hide();
    $li.find(".editCommentForm").show();
  },
  
  closeEditForm: function(e) {
    e.preventDefault();
    
    var $li = $(e.target).closest("li");
    
    $li.find(".editCommentForm").hide();
    $li.find(".commentArea").show();
  },
  
  broadcastEditComment: function(e) {
    e.preventDefault();
    
    var $li = $(e.target).closest("li");
    var commentId = $li.data("comment");
    var text = this.$(".editCommentForm form").serializeArray()[0].value;
    
    // broadcast "editComment" event to App and send comment value
    App.trigger("editComment", commentId, text);
    
    $li.find(".editCommentForm").hide();
    $li.find(".commentArea").show();
  },
  
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
