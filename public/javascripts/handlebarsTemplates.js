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

this["JST"]["list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h4>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4><ul class=\"cardList\"></ul><div id=\"addCard\"><div><form method=\"post\" action=\"#\"><input type=\"text\" id=\"newCardName\" name=\"newCardName\" placeholder=\"Add a card...\" autofocus /><button class=\"btn\" type=\"submit\">Save</button><a class=\"fa fa-times\" href=\"#\"></a></form></div><div>Add a card...</div></div>";
},"useData":true});