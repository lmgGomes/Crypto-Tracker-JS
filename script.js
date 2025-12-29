let priceHistory = [];
let timeLabels = [];
let myChart;

// Inicia o gráfico vazio
const ctx = document.getElementById('cryptoChart').getContext('2d');
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [{
            label: 'Bitcoin (USD)',
            data: priceHistory,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#64748b' } },
            y: { grid: { color: '#334155' }, ticks: { color: '#64748b' } }
        }
    }
});

async function updateDashboard() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();

        // Valores atuais
        const btc = data.bitcoin.usd;
        const eth = data.ethereum.usd;
        const ada = data.cardano.usd;

        // Atualiza textos
        document.getElementById('btc-price').innerText = `$${btc.toLocaleString()}`;
        document.getElementById('eth-price').innerText = `$${eth.toLocaleString()}`;
        document.getElementById('ada-price').innerText = `$${ada.toLocaleString()}`;

        // Atualiza Gráfico
        const now = new Date().toLocaleTimeString([], { hour: '2min', minute: '2-digit' });
        
        if (priceHistory.length > 12) {
            priceHistory.shift();
            timeLabels.shift();
        }

        priceHistory.push(btc);
        timeLabels.push(now);
        myChart.update();

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Atualiza a cada 10 segundos
setInterval(updateDashboard, 10000);
updateDashboard();
