// Данные предметов
const items = [
    { name: "P250 | Sand Dune", rarity: "common", price: 0.5, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzbcDNG09C_k4if2fSjZLmGwDkBsZZz3r6Zo4mliwTj-0BtZDz1dYSUcAdtYw3XqFXtyejxxcjrr8fSJ40" },
    { name: "Glock-18 | Groundwater", rarity: "common", price: 0.7, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3fjFL-tmJmImMn-O6YrrXxWoJvJMp2euQ892n21DkqRBtZGryLdKUdg85aAqG_QC_w-_ugIj84sq2hgy4GQ" },
    { name: "USP-S | Forest Leaves", rarity: "common", price: 0.8, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08-mq4yOluHxIITdn2xZ_Itw3bjCrYj23AzmrRY9ZziidYfGdFQ7MlnR_wS9xu6-gsO9v5mdnSQ3pGB8stw9ewh8" },
    { name: "Desert Eagle | Urban Rubble", rarity: "uncommon", price: 2.5, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PvRTitD_tW1lY2EqOLmMbrfqWdY781lxOiYotWkjATk_0VuY2-lLI6VegNoYwzQ8lS-lL3qgpHvusvMyncyvic8pSGK-KHzzSg" },
    { name: "AK-47 | Elite Build", rarity: "uncommon", price: 3.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09G3h5SOhe7LP7LWnn8fvJYh3-qR942higTmqBZpYGild4adIQQ5ZA6B_AC3lebo0ce-78vOnGwj5HeAJ9sV6g" },
    { name: "M4A4 | Dragon King", rarity: "rare", price: 8.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW0924l4WYg-X1P4Tdn2xZ_ItyiO2Yot-n3gztrUduMW6icdWcc1RqM1HR_FfswLu6gZe4tZrNmiBkpGB8smM7Zio1" },
    { name: "AWP | Worm God", rarity: "rare", price: 10.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZx7PLfYQJW-9W4kb-HnvD8J_XXzzwH65EgiLHHrNutjAa28xdtYG7wINCUdlA4ZFDW81m8lebqjMC9ot2XnlThvpXE" },
    { name: "Karambit | Damascus Steel", rarity: "mythical", price: 150.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0k_b5MqjSg3hu5Mx2gv2Podv03wKy_EtqMGjzcNXBelM-MgmCqAe5le6508fp75TKnCNqsyYitGGdwUJqhGR_eA" },
    { name: "Butterfly Knife | Crimson Web", rarity: "legendary", price: 350.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqODxMajummJW4NE_0uyS9N-j3gy180Vrazj3d9OQdFQ8Z1_VqVe-lem61pDtu5jPwXBk6z5iuyhUtHBvlA" },
    { name: "AWP | Medusa", rarity: "ancient", price: 500.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0m_7zO6-fxj5SvsMkib-W9N7zilLjr0NoYW_wI4OTelRvYwmC-FTrxeq915a074OJlyVOUzvCjQ" },
    { name: "Dragon Lore | AWP", rarity: "immortal", price: 2000.0, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv2P9o6migzl_Us5ZmCmLYDDJgU9NA6B81S5yezvg8e-7cycnXJgvHZx5WGdwUJqz1Tl4g" },
    { name: "AWP | Hyper Beast", rarity: "mythical", price: 27.5, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-JkvbnJ4Tdn2xZ_Ismju2To9qm31Hsr0ZsMTryJo_BcANrMwyCrFLrx7vrhJa1vZrByXo2pGB8sr2_Epwm" },
    { name: "Desert Eagle | Blaze", rarity: "ancient", price: 700, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLJTjtO7dGzh7-HnvD8J_XVkjoFuMYiiLqUrI-k3le3r0s5amj7d9eTI1I-M1rW-Fm_xO-50Jfvot2XnhS4_w8U" },
    { name: "Desert Eagle | Printstream", rarity: "mythical", price: 30, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7duJhJKCmePnJ6nUl2Zu5Mx2gv3--Y3nj1H6qUdqazz2IoCVdVJvYlGGqFPtyea6gZ-_uJjPy3tj7HQnsS3cmBHkiQYMMLIjaxhhAw" },
    { name: "Desert Eagle | Conspiracy", rarity: "rare", price: 6.55, image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH7du6kb-KguXxJqjummJW4NE_3e_Aotql3QO3qUNpNWugddSdcA9sNFzU8ge_w-6-0JO4vJrIzCZj7z5iuygmT5QrCQ" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },
    // { name: "", rarity: "", price: , image: "" },

];

// Инициализация трека с предметами
const itemsTrack = document.getElementById('itemsTrack');
const inventory = document.getElementById('inventory');
const openBtn = document.getElementById('openBtn');
const balanceEl = document.getElementById('balance');
const casesOpenedEl = document.getElementById('casesOpened');
const totalValueEl = document.getElementById('totalValue');

let balance = 1000;
let casesOpened = 0;
let totalValue = 0;
let userItems = [];

// Создаем трек с предметами (дублируем для бесконечного списка)
function initItemsTrack() {
    itemsTrack.innerHTML = '';
    
    // Дублируем массив предметов несколько раз для эффекта бесконечности
    const multipliedItems = [
        ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, 
        ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items,
        // ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items,
        // ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, 




    ];
    
    multipliedItems.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = `item ${item.rarity}`;
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-rarity ${item.rarity}">$${item.price.toFixed(2)}</div>
        `;
        itemsTrack.appendChild(itemEl);
    });
}

// Открытие кейса
function openCase() {
    if (balance < 10) {
        alert("Not enough credits!");
        return;
    }
    
    balance -= 10;
    balanceEl.textContent = balance;
    
    openBtn.disabled = true;
    
    // Определяем выигрышный предмет (с разными шансами)
    const random = Math.random();
    let winningItem;
    



    //its very bad, its need corrected
    if (random < 0.5) {
        // 50% шанс на common
        winningItem = items[Math.floor(Math.random() * 3)];
    } else if (random < 0.8) {
        // 30% шанс на uncommon
        winningItem = items[3 + Math.floor(Math.random() * 2)];
    } else if (random < 0.95) {
        // 15% шанс на rare
        winningItem = items[5 + Math.floor(Math.random() * 2)];
    } else if (random < 0.99) {
        // 4% шанс на mythical
        winningItem = items[7];
    } else if (random < 0.999) {
        // 0.9% шанс на legendary
        winningItem = items[8];
    } else {
        // 0.1% шанс на ancient/immortal
        winningItem = items[9];
    }



    
    // Находим индекс выигрышного предмета в треке
    const winningIndex = [...itemsTrack.children].findIndex(
        item => item.querySelector('.item-name').textContent === winningItem.name
    );
    
    // Анимация прокрутки
    const trackWidth = itemsTrack.offsetWidth;
    const containerWidth = document.querySelector('.case-container').offsetWidth;
    const targetPosition = -(winningIndex * 170) + (containerWidth / 2) - 85;
    
    // Начальная позиция (быстрая прокрутка)
    itemsTrack.style.transition = 'transform 0.1s';
    itemsTrack.style.transform = `translateX(${-trackWidth / 2}px)`;
    
    // Даем время для рендера
    setTimeout(() => {
        // Медленная прокрутка к выигрышному предмету
        itemsTrack.style.transition = 'transform 7s cubic-bezier(0.1, 0.8, 0.2, 1)';
        itemsTrack.style.transform = `translateX(${targetPosition}px)`;
        
        // По завершении анимации
        setTimeout(() => {
            // Добавляем предмет в инвентарь
            userItems.push(winningItem);
            totalValue += winningItem.price;
            casesOpened++;
            
            // Обновляем статистику
            casesOpenedEl.textContent = casesOpened;
            totalValueEl.textContent = totalValue.toFixed(2);
            
            // Обновляем инвентарь
            updateInventory();
            
            openBtn.disabled = false;
        }, 7000);
    }, 50);
}

// Обновление инвентаря
function updateInventory() {
    inventory.innerHTML = '';
    
    userItems.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `item ${item.rarity}`;
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-rarity ${item.rarity}">$${item.price.toFixed(2)}</div>
        `;
        inventory.appendChild(itemEl);
    });
}

// Инициализация
initItemsTrack();
openBtn.addEventListener('click', openCase);
