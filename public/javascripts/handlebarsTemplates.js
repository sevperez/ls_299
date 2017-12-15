this["JST"] = this["JST"] || {};

this["JST"]["addNewList"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div><form method=\"post\" action=\"#\"><input type=\"text\" id=\"newListName\" name=\"newListName\" placeholder=\"Add a list...\" autofocus /><button class=\"btn\" type=\"submit\">Save</button><a class=\"fa fa-times\" href=\"#\"></a></form></div><div>Add a list...</div>";
},"useData":true});

this["JST"]["boardHeader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3 class=\"left\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3><a class=\"right\" href=\"#\"><span class=\"fa fa-ellipsis-h\"></span> Show Menu</a>";
},"useData":true});

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<li data-label="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "></li>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<ul class=\"icons\">"
    + ((stack1 = helpers["if"].call(alias1,(helpers.hasDueDate || (depth0 && depth0.hasDueDate) || alias2).call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"hasDueDate","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.hasDescription || (depth0 && depth0.hasDescription) || alias2).call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"hasDescription","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.hasComments || (depth0 && depth0.hasComments) || alias2).call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"hasComments","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.hasChecklists || (depth0 && depth0.hasChecklists) || alias2).call(alias1,(depth0 != null ? depth0.checklists : depth0),{"name":"hasChecklists","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"fa fa-clock-o\"></span> "
    + container.escapeExpression((helpers.shortDate || (depth0 && depth0.shortDate) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.due_date : depth0),{"name":"shortDate","hash":{},"data":data}))
    + "</li>";
},"7":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"fa fa-bars\"></span></li>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"fa fa-comment-o\"></span>"
    + container.escapeExpression((helpers.countArr || (depth0 && depth0.countArr) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.comments : depth0),{"name":"countArr","hash":{},"data":data}))
    + "</li>";
},"11":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"fa fa-check-square-o\"></span>"
    + container.escapeExpression((helpers.checklistStatus || (depth0 && depth0.checklistStatus) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.checklists : depth0),{"name":"checklistStatus","hash":{},"data":data}))
    + "</li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>"
    + ((stack1 = helpers["if"].call(alias1,(helpers.hasIcons || (depth0 && depth0.hasIcons) || alias2).call(alias1,{"name":"hasIcons","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["cardInfo"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"lblCtnr\"><p>Labels</p><ul id=\"labelList\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<li id=\"addLabelBtn\"><span class=\"fa fa-plus\"></span></li></ul></div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<li data-label="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "></li>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<div id=\"dueCtnr\"><p>Due Date</p><div id=\"dueDate\"><a href=\"#\">"
    + container.escapeExpression((helpers.formatDate || (depth0 && depth0.formatDate) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.due_date : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</a></div></div>";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"clear\" id=\"commentList\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li data-comment="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "><div class=\"userIcon\">LS</div><h4>Launch School Student</h4><div class=\"comment\">"
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "</div><p>"
    + alias4((helpers.formatDate || (depth0 && depth0.formatDate) || alias2).call(alias1,(depth0 != null ? depth0.datetime : depth0),{"name":"formatDate","hash":{},"data":data}))
    + " - <a href=\"#\">Edit</a> - <a href=\"#\">Delete</a></p></li>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"overlay\"></div><div id=\"cardInfoModal\"><div id=\"details\" class=\"left\"><div id=\"cardData\"><span class=\"fa fa-tasks\"></span><div><h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2><p>in list "
    + alias4(((helper = (helper = helpers.list_id || (depth0 != null ? depth0.list_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_id","hash":{},"data":data}) : helper)))
    + "</p>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>Description <a href=\"#\"> Edit </a></p><p id=\"cardDescription\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p></div></div><div id=\"cardComments\"><span class=\"fa fa-comment-o\"><div class=\"userIcon\">LS</div></span><div><h3>Add Comment</h3><form method=\"post\" action=\"#\"><textarea id=\"newComment\" name=\"newComment\" placeholder=\"Write a comment...\"></textarea><button type=\"submit\" class=\"btn\" disabled>Save</button></form></div></div><div id=\"activity\"><span class=\"fa fa-sticky-note-o\"></span><div><h3 class=\"left\">Activity</h3><a class=\"right\" href=\"#\">Show Details</a>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div></div></div><div id=\"actions\" class=\"right\"><a class=\"fa fa-times right\" href=\"#\"></a><div class=\"clear\"><h3>Add</h3><ul><li><span class=\"fa fa-tags\"></span> Labels</li><li><span class=\"fa fa-check-square-o\"></span> Checklist</li><li><span class=\"fa fa-clock-o\"></span> Due Date</li></ul></div></div></div>";
},"useData":true});

this["JST"]["changeBoardName"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"overlay\"></div><div><form action=\"#\" method=\"post\"><div><p>Rename Board</p><a class=\"fa fa-times\" href=\"#\"></a></div><h3>Name</h3><input type=\"text\" id=\"newBoardName\" name=\"newBoardName\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "\" autofocus /><button class=\"btn\" type=\"submit\">Rename</button></form></div>";
},"useData":true});

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h4>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4><ul class=\"cardList\"></ul><div id=\"addCard\"><div><form method=\"post\" action=\"#\"><input type=\"text\" id=\"newCardName\" name=\"newCardName\" placeholder=\"Add a card...\" autofocus /><button class=\"btn\" type=\"submit\">Save</button><a class=\"fa fa-times\" href=\"#\"></a></form></div><div>Add a card...</div></div>";
},"useData":true});