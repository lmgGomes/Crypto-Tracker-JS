// 1. Corrigido para bater com o ID 'cryptoChart' do seu HTML
const ctx = document.getElementById('cryptoChart').getContext('2d');

let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Bitcoin (USD)',
            data: [],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
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

        // Atualiza os cards
        document.getElementById('btc-price').innerText = `$ ${data.bitcoin.usd.toLocaleString()}`;
        document.getElementById('eth-price').innerText = `$ ${data.ethereum.usd.toLocaleString()}`;
        document.getElementById('ada-price').innerText = `$ ${data.cardano.usd.toLocaleString()}`;

        // 2. Corrigido o erro de hora que apareceu no seu console
        const now = new Date();
        const timeLabel = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');

        // Adiciona ao gráfico
        cryptoChart.data.labels.push(timeLabel);
        cryptoChart.data.datasets[0].data.push(data.bitcoin.usd);

        if (cryptoChart.data.labels.length > 10) {
            cryptoChart.data.labels.shift();
            cryptoChart.data.datasets[0].data.shift();
        }

        cryptoChart.update();
    } catch (error) {
        console.error("Erro ao atualizar:", error);
    }
}

// Atualiza a cada 10 segundos
setInterval(updatePrices, 10000);
updatePrices();
