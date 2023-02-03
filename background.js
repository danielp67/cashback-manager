

//If we want notification on the top right corner
/*
chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'notification') {
        chrome.notifications.create('', data.options);
    }
});
*/
let label = ["website", "thecorner", "macif", "advango", "igraal", "widilo"]


async function fetchData() {
    const res = await fetch('./database/data.json');
    const json = await res.json();
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const url = await tabs[0].url;
    let jsonIgraal = false
    let jsonWidilo = false
    let keyword = url.replace(/.+\/\/|www.|\..+/g, '')
    const urlIgraal = 'https://fr.igraal.com/ajax/search?limitMerchants=2&limitVouchers=0&limitCoupons=0&term='
    const urlWidilo = 'https://www.widilo.fr/api/search?searchtext='

    jsonIgraal = await fetch(urlIgraal + keyword, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },

    })
        .then(response => response.json())
        .then(response => {
            console.log(response)

            return response["merchant"] != null ? response["merchant"].length > 0 : false;

        })

    jsonWidilo = await fetch(urlWidilo + keyword, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },

    })
        .then(response => response.json())
        .then(response => {
            console.log(response)

            return response["shops"] != null ? response["shops"].length > 0 : false;
        })

    return [url, keyword, json, jsonIgraal, jsonWidilo]
}


async function fetchDataBG(){

let data = await fetchData()
    .then((data) => {
        const url = data[0]
        const keyword = data[1].charAt(0).toUpperCase() + data[1].slice(1)
        const json = data[2]
        let shops = [keyword, false, false, false, data[3], data[4]]

        for (let i = 0; i < json.length; i++) {

            if (url.includes(json[i].url)) {
                match = true
                for (let j = 1; j < label.length - 2; j++) {
                    shops[j] = json[i][label[j]]
                }

                return shops

            }
        }

        if (!match) {
            return shops
        }

    }).then(shops => {
        let count = 0

        for (let j = 1; j < label.length; j++) {

            if (shops[j] === true) {
                count++

            }
        }

        console.log(count)
        return count
    })
    .catch((reason) => console.log("Message:" + reason.message));




return data
}



chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(changeInfo.status==="complete")
    {
        let result = await fetchDataBG()
        console.log("update", tabId, result)
        if(!isNaN(result)){
        chrome.action.setBadgeText({text: result.toString(),});
        chrome.action.setBadgeBackgroundColor({color: '#81b1fc',});
        }
    }

});



chrome.tabs.onActivated.addListener(async (tabId, changeInfo, tab) => {

    let result = await fetchDataBG()
    let text = isNaN(result) ? '' : result.toString()
    if(!isNaN(result)){
        chrome.action.setBadgeText({text: text,});
        chrome.action.setBadgeBackgroundColor({color: '#81b1fc',});
    }

});


