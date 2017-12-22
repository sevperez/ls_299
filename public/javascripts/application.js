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
        wait: true,
      });
    }
  },
  
  openCardModal: function(card) {
    // create new card modal view and store
    this.currentCardView = new CardInfoView({ model: card });
    $(document.body).append(this.currentCardView.render().el);
    
    // create and store partial views
    this.currentDescriptionView = new CardDescriptionView({ model: card });
    this.currentLabelsListView = new LabelListView({ model: card });
    this.currentDueDateView = new DueDateView({ model: card });
    this.currentActivityView = new CardActivityView({ model: card });
    this.currentTitleView = new CardTitleView({ model: card });
    this.currentChecklistViews = [];
    
    // rendering of partial views (conditional where appropriate)
    this.currentTitleView.render();
    this.currentDescriptionView.render();
    this.currentActivityView.render();
    
    if (card.toJSON().labels.length !== 0) {
      this.currentLabelsListView.render();
    }
    
    if (card.toJSON().due_date) {
      this.currentDueDateView.render();
    }
    
    if (card.toJSON().checklists.length > 0) {
      this.setupChecklistViews(card.toJSON().checklists);
    }
    
    this.router.navigate("/boards/" + String(this.board.id) + "/lists/" + String(card.toJSON().list_id) + "/cards/" + String(card.id));
  },
  
  setupChecklistViews: function(checklistIds) {
    var self = this;
    var $parent = $("#cardChecklists");
    
    // if currentChecklistViews is populated, remove each
    if (this.currentChecklistViews.length !== 0) {
      this.currentChecklistViews.forEach(function(view) {
        view.remove();
      });
    }
    
    checklistIds.forEach(function(id) {
      var current = self.checklists.get(id);
      var view = new ChecklistView({ model: current });
      self.currentChecklistViews.push(view);
      $parent.append(view.render().el);
    });
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
  
  openDueDateSelector: function() {
    var view = new DueDateSelectView();
    $("#cardInfoModal").append(view.render().el);
  },
  
  openLabelSelector: function(checkedIds) {
    var view = new LabelSelectorView({ collection: this.labels });
    $("#cardInfoModal").append(view.render().el);
    view.markChecked(checkedIds);
  },
  
  adjustCardLabel: function(id) {
    var card = this.currentCardView.model;
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
  
  changeDueDate: function(datetime) {
    var card = this.currentCardView.model;
    card.set("due_date", datetime);
    card.save();
  },
  
  removeDueDate: function() {
    var card = this.currentCardView.model;
    card.set("due_date", "");
    card.save();
  },
  
  changeDescription: function(newDescription) {
    var card = this.currentCardView.model;
    card.set("description", newDescription);
    card.save();
  },
  
  getNextCommentId: function() {
    var allComments = [];
    
    // retrieve and push each comment to allComments array
    _.each(this.cardSets, function(element) {
      var currentComments = element.pluck("comments");
      allComments.push(currentComments);
    });
    
    // flatten allComments array
    allComments = _.flatten(allComments);
    
    // return current max ID + 1
    return _.max(allComments, function(comment) {
      return comment.id;
    }).id + 1;
  },
  
  buildNewComment: function(newCommentText) {
    var d = new Date();
    var newDateTime = d.toISOString().slice(0, 19);
    
    return {
      id: this.getNextCommentId(),
      user_id: 1,
      content: newCommentText,
      datetime: newDateTime,
    };
  },
  
  addComment: function(newCommentText) {
    var card = this.currentCardView.model;
    var newComment = this.buildNewComment(newCommentText);
    var comments = card.get("comments");
    
    // update comment array
    comments.push(newComment);
    card.set("comments", comments);
    
    card.save();
  },
  
  deleteComment: function(commentId) {
    var card = this.currentCardView.model;
    var comments = card.get("comments");
    
    // filter comment array
    var updatedComments = _.reject(comments, function(comment) {
      return comment.id === commentId;
    });
    
    card.set("comments", updatedComments);
    card.save();
  },
  
  editComment: function(commentId, newText) {
    var card = this.currentCardView.model;
    var comments = card.get("comments");
    
    // retrieve comment to edit
    var commentToEdit = _.find(comments, function(comment) {
      return comment.id === commentId;
    });
    
    // set content of relevant comment
    commentToEdit.content = newText;
    
    // save card to server
    card.save();
  },
  
  editCardTitle: function(newTitle) {
    var card = this.currentCardView.model;
    
    // set new title to relevant card
    card.set("title", newTitle);
    
    // save card to server
    card.save();
  },
  
  editListTitle: function(list, newTitle) {
    // set new title to list
    list.set("title", newTitle);
    
    // save list to server
    list.save();
  },
  
  openNewChecklist: function() {
    var view = new NewChecklistView();
    $("#cardInfoModal").append(view.render().el);
    $("#newChecklistTitle").focus();
  },
  
  addChecklist: function(title) {
    var self = this;
    // var card = this.currentCardView.model;
    
    var newChecklist = {
      "title": title,
      "items": []
    };
    
    // add new checklist to checklists collection and save
    this.checklists.create(newChecklist, {
      success: function(model, response, options) {
        App.trigger("updateCardChecklistArr", model.id);
      },
    });
  },
  
  updateCardChecklistArr: function(checklistId) {
    var self = this;
    
    // delay card update to ensure that server is available on card PUT
    setTimeout(function() {
      var card = self.currentCardView.model;
      var checklists = card.get("checklists");
      checklists.push(checklistId);
      card.set("checklists", checklists);
      card.save();
      self.setupChecklistViews(card.toJSON().checklists);
    }, 500);
  },
  
  deleteChecklist: function(checklistId) {
    var self = this;
    var card = this.currentCardView.model;
    var checklists = card.get("checklists");
    
    var newChecklists = checklists.filter(function(id) {
      return id !== checklistId;
    });
    
    // update and save card
    card.set("checklists", newChecklists);
    card.save();
    this.setupChecklistViews(card.toJSON().checklists);
    
    // remove checklist from collection after server is available
    setTimeout(function() {
      self.checklists.get(checklistId).destroy();
    }, 1000);
  },
  
  buildNewChecklistItem: function(title) {
    var allItems = _.flatten(App.checklists.pluck("items"));
    
    if (allItems.length === 0) {
      var id = 0;
    } else {
      var id = _.max(allItems, function(item) {
        return item.id;
      }).id;
    }
    
    return {
      "id": id + 1,
      "title": title,
      "complete": false,
    };
  },
  
  addChecklistItem: function(checklistId, itemTitle) {
    var checklist = this.checklists.get(checklistId);
    var items = checklist.get("items");
    var newItem = this.buildNewChecklistItem(itemTitle);
    items.push(newItem);
    
    checklist.set("items", items);
    checklist.save();
  },
  
  deleteChecklistItem: function(checklistId, itemId) {
    var checklist = this.checklists.get(checklistId);
    var items = checklist.get("items");
    var updatedItems = items.filter(function(item) {
      return item.id !== itemId;
    });
    
    checklist.set("items", updatedItems);
    checklist.save();
  },
  
  toggleChecklistItem: function(checklistId, itemId) {
    var checklist = this.checklists.get(checklistId);
    var items = checklist.get("items");
    
    var updatedItems = items.map(function(item) {
      if (item.id === itemId) {
        if (item.complete) {
          item.complete = false;
        } else {
          item.complete = true;
        }
        
        return item;
      } else {
        return item;
      }
    });
    
    checklist.set("items", updatedItems);
    checklist.save();
  },
  
  saveListOrder: function() {
    this.lists.each(function(list) {
      var idx = $("#lists li.list[data-id='" + list.id + "']").index();
      list.set("position", idx);
    });
    
    Backbone.sync("update", this.lists);
  },
  
  updateCardListAssociation: function(card, newId) {
    var self = this;
    
    card.set("list_id", newId);
    card.save();
    
    // update lists
    setTimeout(function() {
      self.lists.each(function(list) {
        var newCards = App.cardSets[list.id].pluck("id");
        list.set("cards", newCards);
      });
      
      Backbone.sync("update", self.lists);
    }, 750);
  },
  
  saveCardPositions: function() {
    // instantiate temporary AllCards collection
    var allCards = new AllCards();
    
    // adjust each card's position and add to allCards collection
    _.each(this.cardSets, function(cardSet) {
      cardSet.each(function(card) {
        var idx = $("#lists li.list[data-id='" + card.toJSON().list_id + "'] .cardList li.card[data-id='" + card.id + "']").index();
        card.set("position", idx);
        allCards.add(card);
      });
    });
    
    Backbone.sync("update", allCards);
  },
  
  handleCardMove: function(el, source, target) {
    var self = this;
    
    // collect relevant models/collections
    var origList = this.lists.get($(source).data("cardlist"));
    var origCardSet = this.cardSets[$(source).data("cardlist")];
    var newList = this.lists.get($(target).data("cardlist"));
    var newCardSet = this.cardSets[$(target).data("cardlist")];
    var card = origCardSet.get($(el).data("id"));
    
    // adjust cardsets and card
    if (origCardSet !== newCardSet) {
      console.log("adjusting card sets");
      
      // switch card between card sets
      origCardSet.remove(card, { silent: true });
      newCardSet.add(card, { silent: true });
      
      // save card with new list_id
      this.updateCardListAssociation(card, $(target).data("cardlist"));
    }
    
    // adjust card positions
    setTimeout(function() {
      self.saveCardPositions();
    }, 1500);
  },
  
  displayBoard: function() {
    if (this.currentCardView) {
      this.currentCardView.close();
    } else {
      this.router.navigate("/boards/" + String(this.board.id));
    }
  },
  
  setupDragula: function() {
    var self = this;
    
    this.drake = dragula({
      accepts: function(el, target, source, sibling) {
        // allow cards to drop on cardlists and lists on overall list list
        var $el = $(el);
        var $target = $(target);
        var elType = $el.hasClass("card") ? "card" : "list";
        var targetType = $target.hasClass("cardList") ? "cardList" : "lists";
        
        if (elType === "card" && targetType === "cardList") {
          return true;
        } else if (elType === "list" && targetType === "lists") {
          return true;
        } else {
          return false;
        }
      },
    }).on("drop", function(el, target, source) {
      // save list and/or card positions
      if ($(el).hasClass("list")) {
        self.saveListOrder();
      } else if ($(el).hasClass("card")) {
        self.handleCardMove(el, source, target);
      }
    });
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
    this.on("openDueDateSelector", this.openDueDateSelector);
    this.on("changeDueDate", this.changeDueDate);
    this.on("removeDueDate", this.removeDueDate);
    this.on("openNewChecklist", this.openNewChecklist);
    this.on("addChecklist", this.addChecklist);
    this.on("deleteChecklist", this.deleteChecklist);
    this.on("addChecklistItem", this.addChecklistItem);
    this.on("deleteChecklistItem", this.deleteChecklistItem);
    this.on("toggleChecklistItem", this.toggleChecklistItem);
    this.on("updateCardChecklistArr", this.updateCardChecklistArr);
    this.on("changeDescription", this.changeDescription);
    this.on("addComment", this.addComment);
    this.on("deleteComment", this.deleteComment);
    this.on("editComment", this.editComment);
    this.on("editCardTitle", this.editCardTitle);
    this.on("editListTitle", this.editListTitle);
  },
  
  init: function() {
    // initialize cardSets object
    this.cardSets = {};
    
    // store labels
    this.labels = new Labels();
    
    // store checklists
    this.checklists = new Checklists();
    
    this.bindEvents();
    this.setupBoard();
    this.setupDragula();
    this.displayBoard();
  },
};
