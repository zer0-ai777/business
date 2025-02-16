class EventManager {
    constructor() {
        this.events = [
            { name: "Tech Boom", type: "stocks", effect: "increase", sector: "Tech", impact: 0.15 },
            { name: "Recession", type: "global", effect: "decrease", impact: 0.2 },
            { name: "Housing Market Crash", type: "realEstate", effect: "decrease", impact: 0.3 },
            { name: "Retail Surge", type: "stocks", effect: "increase", sector: "Retail", impact: 0.1 },
            { name: "Banking Crisis", type: "banking", effect: "decrease", impact: 0.25 }
        ];
    }

    triggerEvent() {
        const event = this.events[Math.floor(Math.random() * this.events.length)];
        console.log(`Event Triggered: ${event.name}`);

        if (event.type === "stocks") {
            stockMarket.stocks.forEach(stock => {
                if (!event.sector || stock.sector === event.sector) {
                    stock.price *= 1 + (event.effect === "increase" ? event.impact : -event.impact);
                }
            });
        } else if (event.type === "realEstate") {
            realEstateMarket.properties.forEach(property => {
                property.price *= 1 + (event.effect === "increase" ? event.impact : -event.impact);
            });
        } else if (event.type === "banking") {
            bankAccount.balance *= 1 - event.impact;
        }
    }
}

const eventManager = new EventManager();
setInterval(() => eventManager.triggerEvent(), 60000); // Trigger a random event every 60 seconds
