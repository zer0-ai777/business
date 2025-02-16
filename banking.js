class BankAccount {
    constructor(balance = 50000, interestRate = 0.02) {
        this.balance = balance;
        this.interestRate = interestRate; // Monthly interest rate
        this.loans = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return `Deposited $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}.`;
        }
        return "Invalid deposit amount.";
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return `Withdrew $${amount.toFixed(2)}. New balance: $${this.balance.toFixed(2)}.`;
        }
        return "Insufficient funds or invalid amount.";
    }

    applyForLoan(amount, interestRate, duration) {
        if (amount <= 0) return "Invalid loan amount.";
        const loan = {
            principal: amount,
            interestRate,
            remainingPayments: duration,
            monthlyPayment: this.calculateMonthlyPayment(amount, interestRate, duration)
        };
        this.loans.push(loan);
        this.balance += amount;
        return `Loan approved: $${amount.toFixed(2)} at ${(interestRate * 100).toFixed(2)}% interest for ${duration} months.`;
    }

    calculateMonthlyPayment(principal, interestRate, duration) {
        const monthlyRate = interestRate / 12;
        return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    }

    payLoans() {
        let totalPayment = 0;
        this.loans.forEach(loan => {
            if (loan.remainingPayments > 0) {
                this.balance -= loan.monthlyPayment;
                totalPayment += loan.monthlyPayment;
                loan.remainingPayments--;
            }
        });
        return `Paid $${totalPayment.toFixed(2)} towards loans.`;
    }

    accrueInterest() {
        this.balance *= 1 + this.interestRate;
    }

    displayBankInfo() {
        const bankDiv = document.getElementById("bank-account");
        bankDiv.innerHTML = `Bank Balance: $${this.balance.toFixed(2)}`;
    }
}

const bankAccount = new BankAccount();
setInterval(() => bankAccount.accrueInterest(), 30000); // Interest accrues every 30 seconds
