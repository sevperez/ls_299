// BACKBONE - COLLECTIONS - cardSet.js

var CardSet = Backbone.Collection.extend({
  model: Card,
  
  containsRequestedCard: function(collection) {
    var result = collection.find(function(card) {
      return card.id === App.requestedCard.cardId && card.toJSON().list_id === App.requestedCard.listId;
    });
    
    return result;
  },
  
  getCards: function(listId) {
    var self = this;
    
    this.fetch({
      success: function(collection, response) {
        console.log("card set " + String(listId) + " fetched");
        
        // if App contains a requested card, search for it
        if (App.requestedCard) {
          var result = self.containsRequestedCard(collection);
          
          // if search results return a card, trigger card modal
          if (result) {
            App.trigger("requestedCardFound", result);
          }
        }
      },
      error: function(collection, response, options) {
        console.log("error retrieving card set");
      },
    });
  },
  
  initialize: function(models, options) {
    this.url = "/boards/" + String(App.board.id) + "/lists/" + String(options.id) + "/cards";
  },
});
