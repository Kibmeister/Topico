(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dictionary'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<p>No entries to show..</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"id_entries_list\">\n  <div class=\"dictionary_mainWord\">"
    + alias4(((helper = (helper = helpers.word || (depth0 != null ? depth0.word : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"word","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"audio_container\">\n    <audio controls>\n      <source src=\""
    + alias4(((helper = (helper = helpers.rpath || (depth0 != null ? depth0.rpath : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rpath","hash":{},"data":data}) : helper)))
    + "\" type=\"audio/wav\">\n    </audio>\n  </div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.pair : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pair : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();