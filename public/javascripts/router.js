// BACKBONE - ROUTER

App.router = new (Backbone.Router.extend({
  routes: {
    "boards/:board_id": "displayBoard",
    "boards/:board_id/lists/:list_id/cards/:card_id": "displayCardInfo",
  },
  
  displayBoard: function() {
    App.displayBoard();
  },
  
  displayCardInfo: function(board_id, list_id, card_id) {
    App.displayCardInfo(board_id, list_id, card_id);
  },
  
  initialize: function() {
    // create index route, using regex (avoid '/' requirement on routes object)
    this.route(/^\/?$/, "index", this.index);
  },
}))();

// start Backbone history
Backbone.history.start({
  pushState: true
});

// listen for any anchor clicks with a root path and defer to router
$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  
  // adjust href property to remove forward slash; pass to the router to handle
  App.router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});
