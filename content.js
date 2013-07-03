// Remove all script tags.
function stripScripts(s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    stripComments(div);
    var tagsToFilter = ['script', 'iframe'];
    var blacklistedTags = [];
    tagsToFilter.map(function(n) {
      var nodes = Array.prototype.slice.call(div.getElementsByTagName(n));
      blacklistedTags = blacklistedTags.concat(nodes);
    });
    var i = blacklistedTags.length;
    while (i--) {
      blacklistedTags[i].parentNode.removeChild(blacklistedTags[i]);
      console.log("Removing element " + blacklistedTags[i].toString());
    }
    return div.innerHTML;
  }

// Sometimes script tags are hidden inside comments.
function stripComments(elem) {
  if (elem.childNodes && elem.childNodes.length) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      var child = elem.childNodes[i];
      if (child.nodeType == Node.COMMENT_NODE) {
        console.log("Removing comment " + child.toString());
        elem.removeChild(child);
      } else {
        stripComments(child);
      }
    };
  };
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "createTab") {
        var inner = document.documentElement.innerHTML;
        inner = stripScripts(inner);
        var title = document.title;
        var location = window.location.href;
        var html = inner;
        debugger;
        var newTab = window.open('about:blank', '_blank');
        newTab.history.pushState(html, title, location);
        var newTabDocument = newTab.document;
        newTabDocument.open();
        newTabDocument.write("<html>"+ html + "</html>");
        sendResponse({});
    }
    return true;
});
