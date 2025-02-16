// 📈 Smoothly updates the displayed money count
function animateMoneyChange(element, start, end, duration = 1000) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 30); // Smooth step calculation

    let timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            current = end; // Ensure exact value
        }
        element.textContent = `$${current.toFixed(2)}`;
    }, 30);
}

// 📊 Smooth animation for stock price fluctuations
function animateStockPrice(element, newValue) {
    let oldValue = parseFloat(element.textContent.replace("$", ""));
    let difference = newValue - oldValue;

    let step = difference / 20; // Spread animation over 20 frames
    let count = 0;

    let interval = setInterval(() => {
        oldValue += step;
        count++;

        element.textContent = `$${oldValue.toFixed(2)}`;

        if (count >= 20) {
            clearInterval(interval);
            element.textContent = `$${newValue.toFixed(2)}`;
        }
    }, 50);
}

// 💰 UI pop-up animation for purchases
function showPurchaseEffect(itemName) {
    let notification = document.createElement("div");
    notification.classList.add("purchase-notification");
    notification.textContent = `Purchased: ${itemName}`;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 1500);
}

// 📜 Apply fade-in animation for new items in inventory
function fadeInItem(element) {
    element.style.opacity = 0;
    element.style.transition = "opacity 0.8s ease-in-out";
    setTimeout(() => element.style.opacity = 1, 50);
}
function animateMoneyChange(element, start, end, duration = 1000) {
    let range = end - start;
    let current = start;
    let increment = range / (duration / 30);

    let timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            clearInterval(timer);
            current = end;
        }
        element.textContent = `$${current.toFixed(2)}`;
    }, 30);
}

function animateStockPrice(element, newValue) {
    let oldValue = parseFloat(element.textContent.replace("$", ""));
    let difference = newValue - oldValue;
    let step = difference / 20;
    let count = 0;

    let interval = setInterval(() => {
        oldValue += step;
        count++;

        element.textContent = `$${oldValue.toFixed(2)}`;

        if (count >= 20) {
            clearInterval(interval);
            element.textContent = `$${newValue.toFixed(2)}`;
        }
    }, 50);
}

function showPurchaseEffect(itemName) {
    let notification = document.createElement("div");
    notification.classList.add("purchase-notification");
    notification.textContent = `Purchased: ${itemName}`;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 1500);
}

function fadeInItem(element) {
    element.style.opacity = 0;
    element.style.transition = "opacity 0.8s ease-in-out";
    setTimeout(() => element.style.opacity = 1, 50);
}
