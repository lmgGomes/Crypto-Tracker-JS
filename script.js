async function getPrices() {
    try {
        // Busca os dados da API gratuita CoinGecko
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano&vs_currencies=usd');
        const data = await response.json();

        // Atualiza os valores no HTML usando os IDs que criamos
        document.getElementById('btc-price').innerText = `$${data.bitcoin.usd.toLocaleString()}`;
        document.getElementById('eth-price').innerText = `$${data.ethereum.usd.toLocaleString()}`;
        document.getElementById('ada-price').innerText = `$${data.cardano.usd.toLocaleString()}`;
        
        console.log("Preços atualizados com sucesso!");
    } catch (error) {
        console.error("Erro ao buscar preços:", error);
        document.getElementById('btc-price').innerText = "Erro ao carregar";
    }
}

// Executa a função assim que a página abre
getPrices();

// Configura para atualizar sozinho a cada 30 segundos (30000ms)
setInterval(getPrices, 30000);
