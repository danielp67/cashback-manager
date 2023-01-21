
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
let label = ["website", "thecorner", "macif", "advango", "igraal", "widilo"]
let match = false
async function fetchData() {
  const res=await fetch ('./database/data.json');
  const json=await res.json();
  const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const url = await tabs[0].url;

  console.log("url",url)



  //console.log(url)
  const index = await function index(){
    for(let i=1; i<=json.length;i++)
    {
      console.log(json[0].url,i, url)
      console.log(json[i].url, url)

      if(url.includes(json[i].url))
      {
        console.log("match")
       return i
        break;
      }
    }
  }

  return[url, json]
}

//setTimeout(() => {  fetchData(); }, 5000);
fetchData()
    // log response or catch error of fetch promise
    .then((data) => {

      const url = data[0]
      const json = data[1]

      for(let i=0; i<=json.length+1;i++)
        {

          if(url.includes(json[i].url))
          {
            match = true

            for(let j=0; j<label.length;j++)
            {
              document.getElementById(label[j]).innerHTML=json[i][label[j]];

            }
          }
      }

    })
    .catch((reason) => console.log("Message:" + reason.message));

