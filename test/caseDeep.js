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
        
        // Валидация данных
        if (!Array.isArray(data) || !data.every(i => i.id && i.name)) {
            throw new Error('Некорректный формат предметов');
        }
        
        items = data;
        initRoulette();
    } catch (error) {
        showError(error.message);
    }
}


// Внутри animateRoulette()


function initRoulette() {
    const track = document.getElementById('itemsTrack');
    track.innerHTML = [...items, ...items, ...items].map(item => `
        <div class="roulette-item ${item.rarity}" data-id="${item.id}">
            <img src="${item.imgURL}" alt="${item.name}">
        </div>
    `).join('');

    // Валидация
    console.log('Total items in track:', track.children.length);
    console.log('First item width:', track.children[0].offsetWidth);
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
        for (let i = 0; i < selectedCount; i++) {
            const result = await performSingleSpin();
            if (result && result.id) { // Добавлена проверка
                spinResults.push(result);
                updateBalance(-10);
                totalSpins++;
            } else {
                throw new Error('Не удалось получить предмет');
            }
        }
        
        if (spinResults.length > 0) {
            showResults(spinResults);
            updateInventory();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        isSpinning = false;
        disableUI(false);
    }
}

// В файле caseDeep.js

async function performSingleSpin() {
    try {
        const response = await fetch('handle_spin.php', {
            method: 'POST',
            credentials: 'include'
        });

                // Проверка HTTP-статуса
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        // Чтение сырого ответа и проверка на пустоту
        const text = await response.text();
        console.log('[DEBUG] Ответ сервера:', text);
        if (!text.trim()) {
            throw new Error('Сервер вернул пустой ответ');
        }

        // Парсинг JSON с обработкой ошибок
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Невалидный JSON:', text);
            throw new Error('Ошибка обработки данных');
        }

        // Проверка наличия itemId
        if (!data.itemId) {
            throw new Error('Некорректные данные предмета');
        }

        const item = items.find(i => i.id == data.itemId);
        if (!item) throw new Error('Item not found');

        // Новая логика анимации
        await animateRoulette(item);
        
        return item;
    } catch (error) {
        showError(error.message);
        throw error;
    }
}


async function animateRoulette(targetItem) {
    const track = document.getElementById('itemsTrack');
    const itemWidth = 180; // Совпадает с CSS
    const containerWidth = track.parentElement.offsetWidth;
    
    // 1. Находим индекс в исходном массиве
    const targetIndex = items.findIndex(item => item.id === targetItem.id);
    
    // 2. Учитываем 3 копии элементов
    const totalClones = 3;
    const middleCloneSet = Math.floor(totalClones / 2) * items.length;
    
    // 3. Новая формула позиции
    const targetPosition = 
        (middleCloneSet + targetIndex) * itemWidth - 
        (containerWidth / 2) + 
        (itemWidth / 2);

    // 4. Логирование
    console.log(
        `Индекс: ${targetIndex}, 
        Позиция: ${-targetPosition}px,
        Ширина контейнера: ${containerWidth}px`
    );

    // 5. Запуск анимации
    track.style.transition = 'none';
    track.style.transform = `translateX(${-containerWidth * 2}px)`;
    await new Promise(r => requestAnimationFrame(r));
    track.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    track.style.transform = `translateX(${-targetPosition}px)`;
    await new Promise(resolve => track.addEventListener('transitionend', resolve, { once: true }));
}

// async function animateRoulette(targetItem) {
//     const track = document.getElementById('itemsTrack');
//     const items = Array.from(track.children);
//     const itemWidth = items[0].offsetWidth;
//     const containerWidth = track.parentElement.offsetWidth;
    
//     // Создаём клоны для бесконечного эффекта
//     const cloneCount = 3; // Количество копий элементов
//     const totalItems = items.length * cloneCount;
    
//     // Находим индекс целевого элемента в исходном массиве
//     const targetIndex = items.findIndex(item => item.dataset.id === targetItem.id);
    
//     // Рассчитываем смещение для центрирования
//     const targetPosition = (targetIndex * itemWidth) 
//         + (items.length * itemWidth * Math.floor(cloneCount/2))
//         - (containerWidth - itemWidth) / 2;

//     // Начальная позиция для плавного старта
//     track.style.transition = 'none';
//     track.style.transform = `translateX(${-items.length * itemWidth}px)`;
    
//     // Ждём обновления кадра
//     await new Promise(r => requestAnimationFrame(r));
    
//     // Запускаем анимацию
//     track.style.transition = 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)';
//     track.style.transform = `translateX(${-targetPosition}px)`;
    
//     // Ожидаем завершения анимации
//     await new Promise(resolve => {
//         track.addEventListener('transitionend', resolve, { once: true });
//     });

//     // Сбрасываем позицию без анимации
//     track.style.transition = 'none';
//     const finalPosition = targetPosition % (items.length * itemWidth);
//     track.style.transform = `translateX(${-finalPosition}px)`;
// }


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

    // Проверка наличия данных
    if (!results || !results.length || !results[0]) {
        showError('Не удалось получить результат');
        resultDiv.style.display = 'none';
        return;
    }

    const firstResult = results[0];
    
    // Проверка обязательных полей
    if (!firstResult.imgURL || !firstResult.name || !firstResult.rarity || !firstResult.price) {
        showError('Некорректные данные предмета');
        return;
    }

    // Обновление интерфейса
    resultDiv.style.display = 'block';
    resultImage.src = firstResult.imgURL;
    resultName.textContent = firstResult.name;
    resultRarity.className = `rarity rarity-${firstResult.rarity.replace(/\s+/g, '-')}`;
    resultRarity.textContent = firstResult.rarity;
    resultPrice.textContent = `$${firstResult.price}`;
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