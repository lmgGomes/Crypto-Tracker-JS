const ctx = document.getElementById('cryptoChart').getContext('2d');
let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Bitcoin Price (USD)',
            data: [],
            borderColor: '#3498db',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

async function updatePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();

        document.getElementById('btc-price').innerText = `$ ${data.bitcoin.usd.toLocaleString()}`;
        document.getElementById('eth-price').innerText = `$ ${data.ethereum.usd.toLocaleString()}`;
        document.getElementById('ada-price').innerText = `$ ${data.cardano.usd.toLocaleString()}`;

        const time = new Date().toLocaleTimeString();
        cryptoChart.data.labels.push(time);
        cryptoChart.data.datasets[0].data.push(data.bitcoin.usd);

        if (cryptoChart.data.labels.length > 10) {
            cryptoChart.data.labels.shift();
            cryptoChart.data.datasets[0].data.shift();
        }

        cryptoChart.update();
    } catch (error) {
        console.error("Erro ao buscar preços:", error);
    }
}

setInterval(updatePrices, 10000);
updatePrices();
