

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({text: "1",});
  chrome.action.setBadgeBackgroundColor({color: '#81b1fc',});
});
chrome.runtime.onInstalled.addListener(function (changes, namespace) {
// set a badge
  //chrome.action.setBadgeText({text: changes.total.newValue.toString()});
 chrome.action.setBadgeText({text: "1"});
    chrome.action.setBadgeBackgroundColor({color: '#81b1fc',});
});