
/*
// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

*/

let popup = document.getElementById("popup");
let site = document.getElementById("site");

let url=""
let a = "google.com"
let result=""
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
   url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
});




popup.addEventListener("click", ()=> {
  console.log("The URL of this page is: " + url)
  if(url.match("google.com"))
  {
    result = a
  }else{
    result=url
  }
  site.textContent=result

} );

