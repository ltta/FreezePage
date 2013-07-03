
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "content.js"}, function() {
        chrome.tabs.sendMessage(tab.id, {method: "createTab", tabId: tab.id}, function(dataResponse) {
            // Close original tab.
            chrome.tabs.remove(tab.id);
        });
    });
});
