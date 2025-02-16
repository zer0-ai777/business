class Player {
    constructor() {
        this.cash = 10000;
        this.stocks = 0;
        this.currentBusiness = null;
    }

    updateCash(amount) {
        this.cash += amount;
        document.getElementById('cash').textContent = this.cash;
    }

    updateStocks(amount) {
        this.stocks += amount;
        document.getElementById('stocks').textContent = this.stocks;
    }

    setCurrentBusiness(business) {
        this.currentBusiness = business;
        document.getElementById('current-business').textContent = business.name;
    }

    buyStock(stockPrice) {
        if (this.cash >= stockPrice) {
            this.updateCash(-stockPrice);
            this.updateStocks(1);
            console.log(`Bought stock for $${stockPrice}`);
        } else {
            console.log('Not enough cash!');
        }
    }

    sellStock(stockPrice) {
        if (this.stocks > 0) {
            this.updateCash(stockPrice);
            this.updateStocks(-1);
            console.log(`Sold stock for $${stockPrice}`);
        } else {
            console.log('You have no stocks to sell.');
        }
    }
}

const player = new Player();
