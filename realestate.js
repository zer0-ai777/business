class Property {
    constructor(name, price, rentIncome, appreciationRate, taxRate) {
        this.name = name;
        this.price = price;
        this.rentIncome = rentIncome;
        this.appreciationRate = appreciationRate; // % increase per year
        this.taxRate = taxRate; // Annual property tax as a percentage
        this.owned = false;
    }

    updatePropertyValue() {
        // Property appreciates or depreciates based on market conditions
        const fluctuation = (Math.random() * 0.1) - 0.05; // -5% to +5%
        this.price *= 1 + (this.appreciationRate + fluctuation);
        this.price = Math.max(this.price, 10000); // Ensure minimum value
    }

    collectRent() {
        return this.owned ? this.rentIncome : 0;
    }

    payTaxes() {
        return this.owned ? this.price * this.taxRate : 0;
    }
}

class RealEstateMarket {
    constructor() {
        this.properties = [
            new Property("Downtown Apartment", 150000, 1200, 0.04, 0.015),
            new Property("Suburban House", 300000, 2500, 0.035, 0.012),
            new Property("Luxury Penthouse", 950000, 8000, 0.05, 0.02),
            new Property("Office Building", 2500000, 20000, 0.03, 0.025),
            new Property("Shopping Mall", 5000000, 50000, 0.02, 0.03)
        ];
        this.playerProperties = [];
        this.playerCash = 500000;
    }

    buyProperty(propertyName) {
        const property = this.properties.find(p => p.name === propertyName);
        if (!property || this.playerCash < property.price) {
            return { success: false, message: "Not enough funds or invalid property." };
        }

        this.playerCash -= property.price;
        property.owned = true;
        this.playerProperties.push(property);

        return { success: true, message: `Successfully purchased ${property.name}.` };
    }

    collectAllRents() {
        return this.playerProperties.reduce((sum, prop) => sum + prop.collectRent(), 0);
    }

    payAllTaxes() {
        return this.playerProperties.reduce((sum, prop) => sum + prop.payTaxes(), 0);
    }

    updateRealEstateMarket() {
        this.properties.forEach(property => property.updatePropertyValue());
    }

    displayRealEstateMarket() {
        const realEstateDiv = document.getElementById("real-estate-market");
        realEstateDiv.innerHTML = "";

        this.properties.forEach(property => {
            const propertyElement = document.createElement("div");
            propertyElement.classList.add("property-item");
            propertyElement.innerHTML = `
                ${property.name} - Price: $${property.price.toFixed(2)}, 
                Rent: $${property.rentIncome.toFixed(2)} per month, 
                Appreciation: ${(property.appreciationRate * 100).toFixed(2)}%
            `;
            realEstateDiv.appendChild(propertyElement);
        });
    }

    displayPlayerProperties() {
        const playerRealEstateDiv = document.getElementById("player-properties");
        playerRealEstateDiv.innerHTML = "";

        this.playerProperties.forEach(property => {
            const propertyElement = document.createElement("div");
            propertyElement.classList.add("owned-property");
            propertyElement.innerHTML = `${property.name} - Current Value: $${property.price.toFixed(2)}, Rent Income: $${property.rentIncome.toFixed(2)}`;
            playerRealEstateDiv.appendChild(propertyElement);
        });
    }
}

const realEstateMarket = new RealEstateMarket();
setInterval(() => realEstateMarket.updateRealEstateMarket(), 15000); // Market updates every 15 seconds
