
let popup = document.getElementById("popup");
let site = document.getElementById("site");
let label = ["website", "thecorner", "macif", "advango", "igraal", "widilo"]
let match = false

async function fetchData() {
    const res = await fetch('./database/data.json');
    const json = await res.json();
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const url = await tabs[0].url;

    const index = await function index() {
        for (let i = 1; i <= json.length; i++) {
            console.log(json[0].url, i, url)
            console.log(json[i].url, url)

            if (url.includes(json[i].url)) {
                console.log("match")
                return i
                break;
            }
        }
    }

    return [url, json]
}

//setTimeout(() => {  fetchData(); }, 5000);
//
fetchData()
    // log response or catch error of fetch promise
    .then((data) => {

        const url = data[0]
        const json = data[1]
        let jsonIgraal=false
        let jsonWidilo=false

        for (let i = 0; i <= json.length + 1; i++) {

            if (url.includes(json[i].url)) {
                match = true

                document.getElementById(label[0]).innerHTML = json[i][label[0]]

                const urlIgraal = 'https://fr.igraal.com/ajax/search?limitMerchants=2&limitVouchers=0&limitCoupons=0&term='
                fetch(urlIgraal+ json[i][label[0]], {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },

                })
                    .then(response => response.json())
                    .then(response =>
                    {
                        console.log(response)

                        if(response["merchant"].length>0)
                        {
                            jsonIgraal=true
                            console.log("iggr")
                            json[i][label[3]]=true
                        }
                    })


                const urlWidilo = 'https://www.widilo.fr/api/search?searchtext='
                fetch(urlWidilo + json[i][label[0]], {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',

                    },
                })
                    .then(response => response.json())
                    .then(response =>
                    {
                        console.log(response)

                        if(response["shops"].length>0)
                        {
                            jsonWidilo=true
                            console.log("widil")
                            json[i][label[4]]=true

                        }
                    })


                for (let j = 1; j < label.length; j++) {

                    document.getElementById(label[j]).innerHTML = "<img src='./images/remove.png' width=\'30px\' height=\'30px\'>";

                    if (json[i][label[j]] === true) {
                        document.getElementById(label[j]).innerHTML = "<img src='./images/yes.png' width=\'30px\' height=\'30px\'>";

                    }

                }
            }
        }

    })
    .catch((reason) => console.log("Message:" + reason.message));



