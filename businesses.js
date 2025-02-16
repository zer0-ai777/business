class Business {
    constructor(name, income, expenses, growthRate, marketDemand) {
        this.name = name;
        this.income = income;
        this.expenses = expenses;
        this.growthRate = growthRate || 0.05; // Annual growth rate
        this.marketDemand = marketDemand || 1; // Market demand coefficient
        this.cashFlow = this.calculateCashFlow();
    }

    updateBusiness() {
        // Simulate market changes
        const randomFactor = (Math.random() * 0.1) - 0.05; // +/- 5% fluctuation on business growth
        this.growthRate += randomFactor;

        // Increase or decrease income/expenses based on demand and growth rate
        this.income *= 1 + (this.growthRate * this.marketDemand);
        this.expenses *= 1 + (Math.random() * 0.03); // Expenses grow at a slower rate
        this.cashFlow = this.calculateCashFlow();
    }

    calculateCashFlow() {
        return this.income - this.expenses;
    }

    displayBusinessInfo() {
        const businessInfoDiv = document.getElementById('business-info');
        businessInfoDiv.innerHTML = ''; // Clear previous info

        const businessElement = document.createElement('div');
        businessElement.classList.add('business-item');
        businessElement.innerHTML = `
            ${this.name} - Income: $${this.income.toFixed(2)}, 
            Expenses: $${this.expenses.toFixed(2)}, 
            Cash Flow: $${this.cashFlow.toFixed(2)}, 
            Growth Rate: ${(this.growthRate * 100).toFixed(2)}%`;
        businessInfoDiv.appendChild(businessElement);
    }

    collectProfits() {
        return this.cashFlow;
    }
}

class BusinessEmpire {
    constructor() {
        this.businesses = [];
        this.totalCashFlow = 0;
    }

    openNewBusiness(name, income, expenses, growthRate) {
        const newBusiness = new Business(name, income, expenses, growthRate);
        this.businesses.push(newBusiness);
        newBusiness.displayBusinessInfo();
    }

    updateAllBusinesses() {
        this.businesses.forEach(business => business.updateBusiness());
        this.calculateTotalCashFlow();
    }

    calculateTotalCashFlow() {
        this.totalCashFlow = this.businesses.reduce((sum, business) => sum + business.cashFlow, 0);
    }

    displayEmpireCashFlow() {
        const empireDiv = document.getElementById('empire-cash-flow');
        empireDiv.innerHTML = `Total Empire Cash Flow: $${this.totalCashFlow.toFixed(2)}`;
    }
}

const businessEmpire = new BusinessEmpire();

// Example usage: Open a new business empire
businessEmpire.openNewBusiness('Online Retail', 5000, 2000, 0.06);
businessEmpire.openNewBusiness('Consulting Firm', 8000, 3000, 0.05);
