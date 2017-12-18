// APP CONTROLLER

var App = {
  templates: JST,
  
  setupBoard: function() {
    // add Board model and view to App
    this.board = new Board({ id: 1 });
    this.boardHeader = new BoardHeaderView({ model: this.board });
  },
  
  setupLists: function() {
    // create new lists collection and view
    this.lists = new Lists([], { comparator: "position" });
    this.listsView = new ListsView({ collection: this.lists });
  },
  
  attachCardSetView: function(listId) {
    var collection = this.cardSets[String(listId)];
    var view = new CardSetView({ collection: collection, listId: listId });
  },
  
  addCardSet: function(listId) {
    this.cardSets[String(listId)] = new CardSet([], { id: listId });
    this.attachCardSetView(listId);
    
    // if the list has cards, retrieve them
    if (this.lists.get(listId).toJSON().cards.length !== 0) {
      this.cardSets[String(listId)].getCards(listId);
    }
  },
  
  getNextId: function(collection) {
    return _.max(collection.toJSON(), function(item) {
      return item.id;
    }).id + 1;
  },
  
  buildNewList: function(name) {
    return {
      title: name,
      position: this.lists.length,
      board_id: this.board.toJSON().id,
      cards: [],
    };
  },
  
  addList: function(name) {
    if (name) {
      this.lists.create(this.buildNewList(name), { wait: true });
    }
  },
  
  buildNewCard: function(name, setId) {
    return {
      title: name,
      position: this.lists.get(setId).toJSON().cards.length,
      description: "",
      labels: [],
      comments: [],
      due_date: "",
      assigned_users: [],
      list_id: setId,
      checklists: [],
    };
  },
  
  addCard: function(name, setId) {
    var self = this;
    
    if (name) {
      this.cardSets[setId].create(this.buildNewCard(name, setId), {
        success: function(response) {
          // add card ID to corresponding List model's "cards" attribute
          var currentList = self.lists.get(setId);
          currentList.get("cards").push(response.id);
        },
      });
    }
  },
  
  openCardModal: function(card) {
    // create new card modal view and store
    this.currentCardView = new CardInfoView({ model: card });
    $(document.body).append(this.currentCardView.render().el);
    this.currentLabelsListView = new LabelListView({ model: card });
    
    // if current card has labels, create a vew and render
    if (card.toJSON().labels.length !== 0) {
      this.currentLabelsListView.render();
    }
  },
  
  openBoardNameForm: function() {
    var view = new BoardNameChangeView();
    $(document.body).append(view.render().el);
    $("#changeBoardName input[type='text']").focus();
  },
  
  changeBoardName: function(name) {
    console.log("changing board to :", name);
    
    // if board name is new, set it and save to the server
    if (this.board.get("title") !== name) {
      this.board.set("title", name);
      this.board.save();
    }
  },
  
  openLabelSelector: function(checkedIds) {
    var view = new LabelSelectorView({ collection: this.labels });
    $("#cardInfoModal").append(view.render().el);
    view.markChecked(checkedIds);
  },
  
  adjustCardLabel: function(id) {
    var card = App.currentCardView.model;
    var labels = card.get("labels");
    var idx = labels.indexOf(id);
    
    // add/remove label id from card model, as necessary
    if (idx !== -1) {
      labels.splice(idx, 1);
    } else {
      labels.push(id);
    }
    
    // update card model and save to the server
    card.set("labels", labels);
    card.save();
  },
  
  bindEvents: function() {
    // extend Backbone.Events to the App object
    _.extend(this, Backbone.Events);
    
    this.on("boardLoaded", this.setupLists);
    this.on("addList", this.addList);
    this.on("addCard", this.addCard);
    this.on("addCardSet", this.addCardSet);
    this.on("cardClick", this.openCardModal);
    this.on("boardNameChangeClick", this.openBoardNameForm);
    this.on("boardNameChangeSubmit", this.changeBoardName);
    this.on("openLabelSelector", this.openLabelSelector);
    this.on("labelSelection", this.adjustCardLabel);
  },
  
  init: function(data) {
    // initialize cardSets object
    this.cardSets = {};
    
    // store labels
    this.labels = new Labels();
    
    // store checklists
    this.checklists = new Checklists();
    
    this.bindEvents();
    this.setupBoard();
  },
};
