let items = [];
let isSpinning = false;
let selectedCount = 1;
let totalSpins = 0;
let userBalance = 1000;

// Инициализация
document.addEventListener('DOMContentLoaded', async () => {
    await loadItems();
    setupEventListeners();
});

async function loadItems() {
    try {
        const response = await fetch('get_items.php');
        const data = await response.json();
        if(data.error) throw new Error(data.error);
        
        items = data;
        initRoulette();
    } catch (error) {
        showError(error.message);
    }
}

function initRoulette() {
    const track = document.getElementById('itemsTrack');
    // Дублируем предметы для бесшовной анимации
    const duplicatedItems = [...items, ...items, ...items];
    
    track.innerHTML = duplicatedItems.map(item => `
        <div class="roulette-item ${item.rarity}">
            <img src="${item.imgURL}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-rarity">${item.rarity}</div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Выбор количества кейсов
    document.querySelectorAll('.price-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.price-option').forEach(el => el.classList.remove('active'));
            option.classList.add('active');
            selectedCount = parseInt(option.textContent.match(/\d+/)[0]);
        });
    });

    // Кнопка открытия
    document.getElementById('openBtn').addEventListener('click', async () => {
        if (isSpinning) return;
        if (userBalance < selectedCount * 10) {
            showError('Недостаточно средств');
            return;
        }
        
        startSpin();
    });
}

async function startSpin() {
    isSpinning = true;
    disableUI(true);
    
    try {
        const spinResults = [];
        for(let i = 0; i < selectedCount; i++) {
            const result = await performSingleSpin();
            spinResults.push(result);
            updateBalance(-10);
            totalSpins++;
        }
        
        showResults(spinResults);
        updateInventory();
    } catch (error) {
        showError(error.message);
    } finally {
        isSpinning = false;
        disableUI(false);
    }
}

async function performSingleSpin() {
    try {
        const response = await fetch('handle_spin.php', {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const text = await response.text();
        console.log(text);
        
        if (!text) {
            throw new Error('Empty server response');
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonError) {
            throw new Error('Failed to parse JSON: ' + jsonError.message);
        }

        if (!data.itemId) {
            throw new Error('Invalid item data');
        }

        const item = items.find(i => i.id === data.itemId);
        if (!item) {
            throw new Error('Item not found in local database');
        }

        animateRoulette(item);
        updateWinHistory(item);
        
        return item;

    } catch (error) {
        showError(error.message);
        throw error;
    }
}

async function fetchItemData(itemId) {
    const response = await fetch(`get_item.php?id=${itemId}`);
    const data = await response.json();
    return data;
}

function animateRoulette(targetItem) {
    const track = document.getElementById('itemsTrack');
    const itemsWidth = 180 * items.length * 3; // 3 дублированных набора
    const targetPosition = (items.indexOf(targetItem) + items.length) * 180;
    
    track.style.transition = 'none';
    track.style.transform = `translateX(-${itemsWidth}px)`;
    
    requestAnimationFrame(() => {
        track.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        track.style.transform = `translateX(-${targetPosition}px)`;
    });
}

function updateWinHistory(item) {
    const history = document.querySelector('.win-history');
    const newItem = document.createElement('div');
    newItem.className = `win-item ${item.rarity}`;
    newItem.textContent = item.rarity[0].toUpperCase();
    history.appendChild(newItem);
    
    if(history.children.length > 5) {
        history.removeChild(history.children[0]);
    }
}

function showResults(results) {
    const resultDiv = document.getElementById('result');
    const resultImage = document.getElementById('resultImage');
    const resultName = document.getElementById('resultName');
    const resultRarity = document.getElementById('resultRarity');
    const resultPrice = document.getElementById('resultPrice');
    
    resultDiv.style.display = 'block';
    resultImage.src = results[0].image;
    resultName.textContent = results[0].name;
    resultRarity.className = `rarity rarity-${results[0].rarity}`;
    resultRarity.textContent = results[0].rarity;
    resultPrice.textContent = `$${results[0].price}`;
}

function updateBalance(amount) {
    userBalance += amount;
    document.getElementById('balance').textContent = `${userBalance}$`;
}

async function updateInventory() {
    try {
        const response = await fetch('get_inventory.php');
        const inventory = await response.json();
        
        const container = document.getElementById('inventory');
        container.innerHTML = inventory.map(item => `
            <div class="inventory-item ${item.rarity}">
                <img src="${item.imgURL}" alt="${item.name}">
                <div class="item-name">${item.name}</div>
            </div>
        `).join('');
    } catch (error) {
        showError('Ошибка загрузки инвентаря');
    }
}

function disableUI(disabled) {
    document.getElementById('openBtn').disabled = disabled;
    document.querySelectorAll('.price-option').forEach(el => {
        el.style.pointerEvents = disabled ? 'none' : 'auto';
    });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}