// BACKBONE - VIEWS - labelList.js

var LabelListView = Backbone.View.extend({
  el: "#lblCtnr",
  
  template: App.templates.labelContainer,
  
  buildLabelSet: function() {
    var labels = [];
    
    this.model.toJSON().labels.forEach(function(id) {
      labels.push(App.labels.get(id).toJSON());
    });
    
    return labels;
  },
  
  render: function() {
    var current = this.buildLabelSet();
    this.$el.html(this.template({ labels: current }));
    return this;
  },
  
  bindEvents: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  initialize: function() {
    this.bindEvents();
  },
});
