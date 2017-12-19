// BACKBONE - VIEWS - cardDescription.js

var CardDescriptionView = Backbone.View.extend({
  el: "#descCtnr",
  
  template: App.templates.cardDescription,
  
  events: {
    "click #openEditDescription": "openEditDescription",
    "click #closeEditDescription": "closeEditDescription",
    "submit #editDescription form": "broadcastNewDescription",
  },
    
  openEditDescription: function() {
    $("#openEditDescription").hide();
    $("#cardDescription").hide();
    $("#newDescription").val(this.model.toJSON().description);
    $("#editDescription").show();
    $("#newDescription").select();
  },
  
  closeEditDescription: function(e) {
    if (e) {
      e.preventDefault();
    }
    
    $("#editDescription").hide();
    $("#newDescription").val("");
    $("#openEditDescription").show();
    $("#cardDescription").show();
  },
  
  broadcastNewDescription: function(e) {
    e.preventDefault();
    
    var newDescription = this.$("#editDescription form").serializeArray()[0].value;
    
    // broadcast "changeDescription" event to App and send newDescription
    if (newDescription !== this.model.toJSON().description) {
      App.trigger("changeDescription", newDescription);
    }
    
    this.closeEditDescription();
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
