const ctx = document.getElementById('cryptoChart').getContext('2d');

let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Bitcoin (USD)',
                data: [],
                borderColor: '#3498db',
                yAxisID: 'y', // Eixo da esquerda
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Ethereum (USD)',
                data: [],
                borderColor: '#9b59b6',
                yAxisID: 'y1', // Eixo da direita
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Cardano (USD)',
                data: [],
                borderColor: '#2ecc71',
                yAxisID: 'y1', // Eixo da direita
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: { display: true, text: 'BTC Price' }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: { display: true, text: 'ETH/ADA Price' },
                grid: { drawOnChartArea: false } // Não poluir o gráfico
            }
        }
    }
});

async function updatePrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();

        // Atualiza os textos dos cards
        document.getElementById('btc-price').innerText = `$ ${data.bitcoin.usd.toLocaleString()}`;
        document.getElementById('eth-price').innerText = `$ ${data.ethereum.usd.toLocaleString()}`;
        document.getElementById('ada-price').innerText = `$ ${data.cardano.usd.toLocaleString()}`;

        const now = new Date();
        const timeLabel = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');

        cryptoChart.data.labels.push(timeLabel);
        cryptoChart.data.datasets[0].data.push(data.bitcoin.usd);
        cryptoChart.data.datasets[1].data.push(data.ethereum.usd);
        cryptoChart.data.datasets[2].data.push(data.cardano.usd);

        if (cryptoChart.data.labels.length > 10) {
            cryptoChart.data.labels.shift();
            cryptoChart.data.datasets.forEach(dataset => dataset.data.shift());
        }

        cryptoChart.update();
    } catch (error) {
        console.error("Erro:", error);
    }
}

setInterval(updatePrices, 10000);
updatePrices();
