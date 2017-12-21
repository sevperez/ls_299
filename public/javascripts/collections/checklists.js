// BACKBONE - COLLECTIONS - checklists.js

var Checklists = Backbone.Collection.extend({
  model: Checklist,
  
  setup: function() {
    this.fetch({
      success: function() {
        console.log("checklists fetched");
      },
    });
  },
  
  initialize: function() {
    this.url = "/checklists";
    this.setup();
  },
});
