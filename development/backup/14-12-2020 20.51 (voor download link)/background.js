chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            urlMatches: '(|)brightspace(\.tudelft|\.universiteitleiden|\.ru|\.wur|)(\.nl)'
          },
        })
                  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
