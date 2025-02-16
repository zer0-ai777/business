class StockMarket {
    constructor() {
        this.stocks = [
            { symbol: 'AAPL', name: 'Apple', price: 145, volatility: 0.02, trend: 'neutral', sector: 'Tech', dividends: 1.5 },
            { symbol: 'GOOGL', name: 'Google', price: 2750, volatility: 0.015, trend: 'neutral', sector: 'Tech', dividends: 2.0 },
            { symbol: 'AMZN', name: 'Amazon', price: 3450, volatility: 0.03, trend: 'neutral', sector: 'Retail', dividends: 0 },
            { symbol: 'TSLA', name: 'Tesla', price: 800, volatility: 0.05, trend: 'neutral', sector: 'Automotive', dividends: 0.5 },
            { symbol: 'MSFT', name: 'Microsoft', price: 300, volatility: 0.01, trend: 'neutral', sector: 'Tech', dividends: 2.2 }
        ];
        this.userStocks = [];
        this.userCash = 100000; // Initial cash for the player
    }

    simulateMarketChanges() {
        this.stocks.forEach(stock => {
            // Simulate price fluctuation
            const randomFluctuation = (Math.random() * stock.volatility * 2) - stock.volatility;
            stock.price += randomFluctuation;
            stock.price = Math.max(stock.price, 1); // Ensure price doesn't drop below 1

            // Simulate sector-wide trends or news
            const sectorTrend = Math.random() > 0.95 ? this.getSectorTrend(stock.sector) : 'neutral';
            stock.trend = sectorTrend;

            // Update stock list
            this.displayStockPrices();
        });
    }

    getSectorTrend(sector) {
        // Simulate trends based on sectors (Tech boom, Retail slowdown, etc.)
        const sectorTrends = {
            'Tech': ['Bullish', 'Bearish'],
            'Retail': ['Bearish', 'Neutral'],
            'Automotive': ['Neutral', 'Bullish']
        };
        return sectorTrends[sector][Math.floor(Math.random() * sectorTrends[sector].length)];
    }

    buyStock(stockSymbol, quantity) {
        const stock = this.stocks.find(s => s.symbol === stockSymbol);
        if (!stock) return { success: false, message: 'Stock not found!' };

        const totalPrice = stock.price * quantity;
        if (totalPrice > this.userCash) {
            return { success: false, message: 'Insufficient funds!' };
        }

        this.userCash -= totalPrice;
        const userStock = this.userStocks.find(s => s.stock.symbol === stockSymbol);
        if (userStock) {
            userStock.quantity += quantity;
        } else {
            this.userStocks.push({ stock, quantity });
        }

        return { success: true, message: `Successfully bought ${quantity} shares of ${stock.name}.` };
    }

    sellStock(stockSymbol, quantity) {
        const userStock = this.userStocks.find(s => s.stock.symbol === stockSymbol);
        if (!userStock || userStock.quantity < quantity) {
            return { success: false, message: 'Not enough stocks to sell!' };
        }

        const stock = userStock.stock;
        const totalSalePrice = stock.price * quantity;
        this.userCash += totalSalePrice;
        userStock.quantity -= quantity;

        if (userStock.quantity === 0) {
            this.userStocks = this.userStocks.filter(s => s.stock.symbol !== stockSymbol);
        }

        return { success: true, message: `Successfully sold ${quantity} shares of ${stock.name}.` };
    }

    collectDividends() {
        let totalDividends = 0;
        this.userStocks.forEach(userStock => {
            totalDividends += userStock.quantity * userStock.stock.dividends;
        });

        this.userCash += totalDividends;
        return totalDividends;
    }

    displayStockPrices() {
        const stockListDiv = document.getElementById('stock-list');
        stockListDiv.innerHTML = ''; // Clear existing stock list

        this.stocks.forEach(stock => {
            const stockElement = document.createElement('div');
            stockElement.classList.add('stock-item');
            stockElement.innerHTML = `${stock.symbol} (${stock.name}) - $${stock.price.toFixed(2)} <span class="trend">${stock.trend}</span>`;
            stockListDiv.appendChild(stockElement);
        });
    }

    displayUserPortfolio() {
        const portfolioDiv = document.getElementById('user-portfolio');
        portfolioDiv.innerHTML = ''; // Clear existing portfolio info

        this.userStocks.forEach(userStock => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item');
            portfolioItem.innerHTML = `${userStock.quantity} x ${userStock.stock.symbol} (${userStock.stock.name}) - $${(userStock.stock.price * userStock.quantity).toFixed(2)}`;
            portfolioDiv.appendChild(portfolioItem);
        });
    }

    displayUserCash() {
        const cashDiv = document.getElementById('user-cash');
        cashDiv.innerHTML = `Cash: $${this.userCash.toFixed(2)}`;
    }
}

const stockMarket = new StockMarket();
setInterval(() => stockMarket.simulateMarketChanges(), 10000); // Update stock prices every 10 seconds
