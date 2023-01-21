
console.log("test2")

/*// Initialize butotn with users's prefered color
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
}*/



let popup = document.getElementById("popup");
let site = document.getElementById("site");

let url=""
let a = "google.com"
let result=""
/*
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
   url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
});
*/



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

let dd=""

let jsonData = document.getElementById("json");



/*fetch('./database/test.json')
    .then((response) => response.json())
    .then((json)=>
{

  console.log(json);
  dd = json


  console.log("dd2",dd)
}
);*/

async function fetchData() {
  const res=await fetch ('./database/test.json');
  const json=await res.json();

  document.getElementById("website").innerHTML=json[0].website;
  document.getElementById("thecorner").innerHTML=json[0].thecorner;
  document.getElementById("macif").innerHTML=json[0].macif;
  document.getElementById("advango").innerHTML=json[0].advango;
  document.getElementById("igraal").innerHTML=json[0].igraal;
  document.getElementById("widilo").innerHTML=json[0].widilo;


}
fetchData();
console.log("dd",dd)
