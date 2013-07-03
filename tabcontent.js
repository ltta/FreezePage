chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "setupTab") {
        document.open();
        document.write("<html>" + request.data.html + "</html>");
        window.history.pushState(request.data.html, request.data.title, request.data.location);
        sendResponse({});
    }
    return true;
});
