


console.log("test");

let contextMenuItem = {
  "id": "workTime",
  "title": "WorkTime",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(
    // callback function
    function(OnClickData) {
      console.log(OnClickData.menuItemId);
     // alert(OnClickData.menuItemId);
    }
);

// listen to event for changes from saved data in storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
// set a badge

//  chrome.action.setBadgeText({text: 12});
 chrome.action.setBadgeText({text: 'ON'});
  chrome.action.setBadgeBackgroundColor({color: '#ef4141'});
});
