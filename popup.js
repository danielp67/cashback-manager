let popup = document.getElementById("popup");
let site = document.getElementById("site");
let label = ["website", "thecorner", "macif", "advango", "igraal", "widilo"]
let match = false
let count = 0

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


fetchData()
    // log response or catch error of fetch promise
    .then((data) => {

        const url = data[0]
        const keyword = data[1].charAt(0).toUpperCase() + data[1].slice(1)
        const json = data[2]
        let shops = [keyword, false, false, false, data[3], data[4]]
        document.getElementById(label[0]).innerHTML = keyword

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

    console.log(shops)

    for (let j = 1; j < label.length; j++) {

        document.getElementById(label[j]).innerHTML = "<img src='./images/remove.png' width=\'30px\' height=\'30px\'>";

        if (shops[j] === true) {
            count++
            document.getElementById(label[j]).innerHTML = "<img src='./images/yes.png' width=\'30px\' height=\'30px\'>";

        }

    }

    console.log(count)
    return count
})
    .catch((reason) => console.log("Message:" + reason.message));



chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // listen for messages sent from background.js
        if (request.message === 'hello!') {
            console.log(request.url) // new url is now in content scripts!
        }
    });




//If we want notification on the top right corner

/*

popup.addEventListener('click', () => {

    chrome.runtime.sendMessage('', {
        type: 'notification',
        options: {
            title: 'Just wanted to notify you',
            message: 'How great it is!' +nb ,
            iconUrl: '/images/yes.png',
            type: 'basic'
        }
    });
});

*/



