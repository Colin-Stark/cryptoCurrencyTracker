particlesJS.load("particles-js", "assets/particles.json", function () { });

function scrollToCryptoList() {
    document.getElementById("cryptictable").scrollIntoView({ behavior: "smooth" });
}

let section = document.getElementById("cryptictable");

function createTable(data) {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");

    let th2 = document.createElement("th");
    th2.innerHTML = "Logo";
    let th3 = document.createElement("th");
    th3.innerHTML = "Name";
    let th4 = document.createElement("th");
    th4.innerHTML = "Symbol";
    let th5 = document.createElement("th");
    th5.innerHTML = "Price (USD)";
    let th6 = document.createElement("th");
    th6.innerHTML = "Market Cap (USD)";
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    thead.appendChild(tr);
    table.appendChild(thead);
    data.forEach(function (asset) {
        let tr = document.createElement("tr");
        let td2 = document.createElement("td");

        td2.innerHTML =
            `
        <img src="https://assets.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png" alt="${asset.name}">`
        let td3 = document.createElement("td");
        td3.setAttribute("id", "name");
        td3.innerHTML = asset.name;
        let td4 = document.createElement("td");
        td4.innerHTML = asset.symbol;
        let td5 = document.createElement("td");
        td5.setAttribute("id", "price");
        td5.innerHTML = parseFloat(asset.priceUsd);
        let td6 = document.createElement("td");
        td6.setAttribute("id", "marketcap");
        td6.innerHTML = parseFloat(asset.marketCapUsd).toFixed(2);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    section.appendChild(table);
}

function apiCall() {
    fetch("https://api.coincap.io/v2/assets")
        .then(function (results) {
            return results.json();
        })
        .then(function (data) {
            createTable(data.data);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

apiCall();

function updatePrices(data) {
    let prices = document.querySelectorAll("#price");
    prices.innerHTML = "";
    prices.forEach(function (price, index) {
        let currentPrice = parseFloat(price.innerHTML);
        let newPrice = parseFloat(data[index].priceUsd);
        price.innerHTML = newPrice;
        if (newPrice > currentPrice) {
            price.style.color = "lightgreen";
        } else if (newPrice < currentPrice) {
            price.style.color = "red";
        }
    });
    let marketCaps = document.querySelectorAll("#marketcap");
    marketCaps.forEach(function (marketCap, index) {
        let newMarketCap = parseFloat(data[index].marketCapUsd);
        marketCap.innerHTML = newMarketCap.toFixed(2);
    });
}

function pricechange() {
    fetch("https://api.coincap.io/v2/assets")
        .then(function (results) {
            return results.json();
        })
        .then(function (data) {
            updatePrices(data.data);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

setInterval(pricechange, 1000);