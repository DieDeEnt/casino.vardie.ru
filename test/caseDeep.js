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

// Обновленная функция анимации
// async function animateRoulette(targetItem) {
//     const track = document.getElementById('itemsTrack');
//     const itemWidth = 180;
//     const containerWidth = track.parentElement.offsetWidth;
    
//     // Фильтрация уникальных ID
//     const uniqueItems = [...new Set(items.map(i => i.id))];
//     const targetIndex = uniqueItems.indexOf(targetItem.id);

//     // Новая формула:
//     const targetPosition = 
//         (containerWidth * 2) - // Стартовое смещение
//         (targetIndex * itemWidth) +
//         (itemWidth / 2);

//     track.style.transition = `transform ${Math.min(5000, items.length * 50)}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
//     track.style.transform = `translateX(${-targetPosition}px)`;
// }

// async function animateRoulette(targetItem) {
//     const track = document.getElementById('itemsTrack');
//     const itemWidth = 180; // Должно совпадать с CSS
//     const container = track.parentElement;
    
//     // Отладочная информация
//     console.log('[DEBUG] Container width:', container.offsetWidth);
//     console.log('[DEBUG] Track items:', track.children.length);
//     console.log('[DEBUG] Target item ID:', targetItem.id);

//     // 1. Найти позицию целевого элемента в оригинальном массиве
//     const targetIndex = items.findIndex(item => item.id === targetItem.id);
//     console.log('[DEBUG] Original index:', targetIndex);

//     // 2. Рассчитать позицию в средней копии (второй из трех)
//     const middleCopyIndex = items.length + targetIndex;
//     console.log('[DEBUG] Middle copy index:', middleCopyIndex);

//     // 3. Центрирование элемента
//     const targetPosition = 
//         middleCopyIndex * itemWidth - // Базовая позиция 
//         (container.offsetWidth / 2) +  // Смещение к центру
//         (itemWidth / 2); // Корректировка центра элемента

//     console.log('[DEBUG] Target position:', targetPosition);

//     // 4. Сброс позиции в конец первой копии
//     track.style.transition = 'none';
//     const resetPosition = items.length * itemWidth;
//     track.style.transform = `translateX(-${resetPosition}px)`;
//     console.log('[DEBUG] Reset position:', -resetPosition);

//     // 5. Дать браузеру обновить DOM
//     await new Promise(resolve => requestAnimationFrame(resolve));
    
//     // 6. Запуск анимации
//     track.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
//     track.style.transform = `translateX(-${targetPosition}px)`;
//     console.log('[DEBUG] Start animation to:', -targetPosition);

//     // 7. Ожидание завершения
//     await new Promise(resolve => {
//         track.addEventListener('transitionend', resolve, { once: true });
//     });
//     console.log('[DEBUG] Animation finished');
// }


async function animateRoulette(targetItem) {
    const track = document.getElementById('itemsTrack');
    const itemWidth = 180; // Должно совпадать с CSS
    const visibleItems = 5; // Количество видимых предметов
    
    // 1. Находим индекс целевого предмета
    const targetIndex = items.findIndex(item => item.id === targetItem.id);
    
    // 2. Рассчитываем позицию для плавной остановки
    const repetitions = 3; // Количество повторений элементов
    const middleSetStart = items.length * Math.floor(repetitions / 2);
    const targetPosition = -(middleSetStart + targetIndex) * itemWidth + (itemWidth * visibleItems)/2;

    // 3. Сброс анимации
    track.style.transition = 'none';
    track.style.transform = `translateX(${-items.length * itemWidth}px)`;
    
    // 4. Запуск анимации
    await new Promise(resolve => requestAnimationFrame(resolve));
    
    track.style.transition = `transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    track.style.transform = `translateX(${targetPosition}px)`;

    // 5. Ожидание завершения
    await new Promise(resolve => {
        track.addEventListener('transitionend', resolve, { once: true });
    });
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