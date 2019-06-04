(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['groups'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<p>No information available..</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"id_groupRecording\">\n  <h3 id=\"id_tableText\">Component words and recording</h3>\n  <div class=\"tbl-header\">\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n      <thead>\n        <tr>\n          <th>Order of words</th>\n          <th>Words in use</th>\n        </tr>\n      </thead>\n    </table>\n  </div>\n  <div class=\"tbl-content\">\n    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n      <tbody>\n        <table>\n          <td>Main word</td>\n          <td>"
    + alias4(((helper = (helper = helpers.word || (depth0 != null ? depth0.word : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"word","hash":{},"data":data}) : helper)))
    + "</td>\n          </tr>\n          <tr>\n            <td>First helpword</td>\n            <td>"
    + alias4(((helper = (helper = helpers.queword1 || (depth0 != null ? depth0.queword1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"queword1","hash":{},"data":data}) : helper)))
    + "</td>\n          </tr>\n          <tr>\n            <td>Second helpword</td>\n            <td>"
    + alias4(((helper = (helper = helpers.queword2 || (depth0 != null ? depth0.queword2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"queword2","hash":{},"data":data}) : helper)))
    + "</td>\n          </tr>\n          <tr>\n            <td>Third helpword</td>\n            <td>"
    + alias4(((helper = (helper = helpers.queword3 || (depth0 != null ? depth0.queword3 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"queword3","hash":{},"data":data}) : helper)))
    + "</td>\n          </tr>\n      </tbody>\n    </table>\n  </div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.path : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "  <div id=\"id_AudioControl\">\n    <audio controls>\n      <source src="
    + container.escapeExpression(container.lambda(depth0, depth0))
    + " type=\"audio/mp3\">\n    </audio>\n  </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.words : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.words : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();