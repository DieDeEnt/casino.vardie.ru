document.addEventListener('DOMContentLoaded', () => {
    // Инициализация данных
    let balance = parseInt(localStorage.getItem('balance')) || 1000;
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    
    // DOM элементы
    const balanceElement = document.getElementById('balance');
    const casesContainer = document.getElementById('cases');
    const inventoryContainer = document.getElementById('inventory');
    const confirmModal = document.getElementById('confirmModal');
    const sellModal = document.getElementById('sellModal');
    const casePreview = document.getElementById('casePreview');
    const itemToSell = document.getElementById('itemToSell');
    const clickSound = document.getElementById('clickSound');
    
    // Кейсы
    const cases = [
        {
            id: 'weapon',
            name: 'Kuken.naeb.case',
            price: 100,
            items: [
                { name: 'AUG Хамелеон', price: 150, type: 'weapon', image: 'aug.png' },
                { name: 'AK-47 Плавный переход', price: 250, type: 'weapon', image: 'ak47.png' },
                { name: 'USP-S Вученный', price: 80, type: 'weapon', image: 'usp.png' },
                { name: 'M4A4 Утечка отхода', price: 200, type: 'weapon', image: 'm4a4.png' },
                { name: 'AWP Укус изумруда', price: 500, type: 'weapon', image: 'awp.png' }
            ],
            bannerColor: 'linear-gradient(135deg, #1a2d57, #0d1b3a)'
        },
        {
            id: 'money',
            name: 'Kuken.NEnaeb.case',
            price: 1,
            items: [
                { name: '1 копейка', price: 0.01, type: 'money', image: 'coin.png' },
                { name: '100 рублей', price: 100, type: 'money', image: 'coin.png' },
                { name: '1000 рублей', price: 1000, type: 'money', image: 'coin.png' },
                { name: '100000 рублей', price: 100000, type: 'money', image: 'coin.png' }
            ],
            bannerColor: 'linear-gradient(135deg, #1a5732, #0d3a1b)'
        }
    ];
    
    // Обновление баланса
    function updateBalance() {
        balanceElement.textContent = balance;
        localStorage.setItem('balance', balance);
    }
    
    // Обновление инвентаря
    function updateInventory() {
        inventoryContainer.innerHTML = '';
        
        if (inventory.length === 0) {
            inventoryContainer.innerHTML = `
                <div class="empty-inventory">
                    <img src="assets/coin.png" alt="Empty">
                    <span>Инвентарь пуст</span>
                </div>
            `;
            return;
        }
        
        // Группируем предметы
        const groupedItems = inventory.reduce((acc, item) => {
            const key = `${item.name}-${item.price}`;
            if (!acc[key]) acc[key] = { ...item, count: 1 };
            else acc[key].count++;
            return acc;
        }, {});
        
        // Отображаем предметы
        Object.values(groupedItems).forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'inventory-item';
            itemElement.innerHTML = `
                <img src="assets/${item.image}" alt="${item.name}">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-details">
                        <span class="item-count">${item.count} шт.</span>
                        <span class="item-price">${item.price}₽</span>
                    </div>
                </div>
                <button class="sell-btn" data-id="${item.name}-${item.price}">Продать</button>
            `;
            inventoryContainer.appendChild(itemElement);
        });
        
        // Обработчики кнопок продажи
        document.querySelectorAll('.sell-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const [name, price] = btn.dataset.id.split('-');
                const item = inventory.find(i => i.name === name && i.price === parseFloat(price));
                if (item) showSellModal(item);
            });
        });
    }
    
    // Отображение кейсов
    function renderCases() {
        casesContainer.innerHTML = '';
        
        cases.forEach(caseItem => {
            const caseElement = document.createElement('div');
            caseElement.className = 'case';
            caseElement.dataset.id = caseItem.id;
            
            caseElement.innerHTML = `
                <div class="case-banner" style="background: ${caseItem.bannerColor}">
                    <div class="case-title">${caseItem.name}</div>
                    <div class="case-price">${caseItem.price}₽</div>
                </div>
                <div class="case-items">
                    ${caseItem.items.slice(0, 4).map(item => `
                        <div class="case-item">
                            <img src="assets/${item.image}" alt="${item.name}">
                            <span>${item.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            caseElement.addEventListener('click', () => {
                playSound(clickSound);
                showCaseModal(caseItem);
            });
            
            casesContainer.appendChild(caseElement);
        });
    }
    
    // Модальные окна
    function showCaseModal(caseItem) {
        document.getElementById('modalTitle').textContent = caseItem.name;
        document.getElementById('casePrice').textContent = caseItem.price;
        
        casePreview.innerHTML = `
            <div class="case-preview-header">
                <h4>Возможные предметы:</h4>
            </div>
            <div class="case-items-grid">
                ${caseItem.items.map(item => `
                    <div class="case-preview-item">
                        <img src="assets/${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">${item.price}₽</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        confirmModal.style.display = 'flex';
        
        // Обработчик подтверждения
        document.getElementById('confirmOpen').onclick = () => {
            if (balance >= caseItem.price) {
                balance -= caseItem.price;
                updateBalance();
                closeModal(confirmModal);
                window.location.href = `case.html?type=${caseItem.id}`;
            } else {
                alert('Недостаточно средств!');
                closeModal(confirmModal);
            }
        };
    }
    
    function showSellModal(item) {
        const sellPrice = Math.floor(item.price * 0.8);
        
        itemToSell.innerHTML = `
            <img src="assets/${item.image}" alt="${item.name}">
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Цена: ${item.price}₽</p>
                <p class="sell-price">Вы получите: ${sellPrice}₽</p>
            </div>
        `;
        
        document.getElementById('sellPrice').textContent = sellPrice;
        sellModal.style.display = 'flex';
        
        // Обработчик подтверждения
        document.getElementById('confirmSell').onclick = () => {
            balance += sellPrice;
            const index = inventory.findIndex(i => i.name === item.name && i.price === item.price);
            if (index !== -1) inventory.splice(index, 1);
            
            updateBalance();
            updateInventory();
            closeModal(sellModal);
        };
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
        playSound(clickSound);
    }
    
    function playSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Audio error:", e));
    }
    
    // Инициализация
    function init() {
        updateBalance();
        renderCases();
        updateInventory();
        
        // Обработчики модальных окон
        document.getElementById('closeModal').addEventListener('click', () => closeModal(confirmModal));
        document.getElementById('closeSellModal').addEventListener('click', () => closeModal(sellModal));
        document.getElementById('cancelOpen').addEventListener('click', () => closeModal(confirmModal));
        document.getElementById('cancelSell').addEventListener('click', () => closeModal(sellModal));
        
        // Переключение табов
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                playSound(clickSound);
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.getElementById('cases').style.display = 
                    tab.dataset.tab === 'cases' ? 'grid' : 'none';
                document.getElementById('inventory').style.display = 
                    tab.dataset.tab === 'inventory' ? 'grid' : 'none';
            });
        });
        
        // Закрытие по клику вне модалки
        window.addEventListener('click', (e) => {
            if (e.target === confirmModal) closeModal(confirmModal);
            if (e.target === sellModal) closeModal(sellModal);
        });
    }
    
    init();
});

