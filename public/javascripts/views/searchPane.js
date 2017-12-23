// BACKBONE - VIEWS - searchPane.js

var SearchPaneView = Backbone.View.extend({
  tagName: "div",
  
  template: App.templates.searchPane,
  
  events: {
    "click .overlay": "close",
    "click a": "close",
  },
  
  close: function() {
    $("#searchBar").val("");
    App.searchPaneView = undefined;
    this.remove();
  },
  
  search: function(val) {
    var searchVal = val.toLowerCase();
    
    if (val) {
      this.results = _.filter(this.allCards, function(card) {
        var title = card.title.toLowerCase();
        var desc = card.description.toLowerCase();
        
        return title.includes(searchVal) || desc.includes(searchVal);
      });
    } else {
      this.results = [];
    }
    
    this.render();
  },
  
  loadCards: function() {
    var self = this;
    
    _.each(App.cardSets, function(cardSet) {
      cardSet.each(function(card) {
        self.allCards.push(card.toJSON());
      });
    });
  },
  
  setLabels: function() {
    var self = this;
    
    App.labels.each(function(label) {
      var color = label.toJSON().color;
      
      self.$("[data-label='" + label.id + "']").addClass(color);
    });
  },
  
  registerHelpers: function() {
    Handlebars.registerHelper("getListName", function(listId) {
      return App.lists.get(listId).toJSON().title;
    });
    
    Handlebars.registerHelper("getBoardId", function() {
      return App.board.id;
    });
  },
  
  render: function() {
    this.$el.html(this.template({ cards: this.results }));
    this.setLabels();
    return this;
  },
  
  initialize: function() {
    this.allCards = [];
    this.results = [];
    this.$el.attr("id", "searchPane");
    this.registerHelpers();
    this.loadCards();
    $("#board").append(this.render().el)
  },
});
