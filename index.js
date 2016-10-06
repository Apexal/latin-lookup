var self = require("sdk/self");
var tabs = require("sdk/tabs");
var Request = require("sdk/request").Request;
var Panels = require("sdk/panel");
var contextMenu = require("sdk/context-menu");

var definitionPanel = Panels.Panel({
  contentURL: "./panel.html",
  contentScriptFile: "./panelScript.js"
});

var menuItem = contextMenu.Item({
  label: "Define Latin Word",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
  image: 'http://payload136.cargocollective.com/1/10/343214/5021699/SPQR%202%20Final.jpg',
  onMessage: function (selectionText) {
    var translation = Request({
      url: "https://glosbe.com/gapi/translate?from=lat&dest=eng&format=json&pretty=false&phrase="+selectionText,
      onComplete: function(response) {
        definitionPanel.port.emit("translation", response.json);
      }
    }).get();
    definitionPanel.show();
  }
});

definitionPanel.on("hide", function() { definitionPanel.port.emit("hide"); });


