document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const caseType = urlParams.get('type');
    const itemsScroll = document.getElementById('itemsScroll');
    const caseTitle = document.getElementById('caseTitle');
    const actionBtn = document.getElementById('actionBtn');
    const spinSound = document.getElementById('spinSound');
    const winSound = document.getElementById('winSound');
    const resultItem = document.getElementById('resultItem');
    const resultImage = document.getElementById('resultImage');
    const resultName = document.getElementById('resultName');
    const resultPrice = document.getElementById('resultPrice');
    const caseOpening = document.querySelector('.case-opening-animation');
    
    // Настройки анимации
    const SCROLL_SPEED = 60;
    const SLOWDOWN_START = 2500;
    const SLOWDOWN_DURATION = 2500;
    
    // Данные кейсов
    const cases = {
        weapon: {
            name: 'KUKEN.naeb.case',
            items: [
                { name: 'AUG Хамелеон', price: 150, image: 'aug.png' },
                { name: 'AK-47 Плавный переход', price: 250, image: 'ak47.png' },
                { name: 'USP-S Вученный', price: 80, image: 'usp.png' },
                { name: 'M4A4 Утечка отхода', price: 200, image: 'm4a4.png' },
                { name: 'AWP Укус изумруда', price: 500, image: 'awp.png' }
            ]
        },
        money: {
            name: 'KUKEN.NEnaeb.case',
            items: [
                { name: '1 копейка', price: 0.01, image: 'coin.png' },
                { name: '100 рублей', price: 100, image: 'coin.png' },
                { name: '1000 рублей', price: 1000, image: 'coin.png' },
                { name: '100000 рублей', price: 100000, image: 'coin.png' }
            ]
        }
    };
    
    const currentCase = cases[caseType] || cases.weapon;
    caseTitle.textContent = currentCase.name;
    
    // Создаем элементы для прокрутки
    for (let i = 0; i < 8; i++) {
        currentCase.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'scroll-item';
            itemElement.innerHTML = `
                <img src="assets/${item.image}">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price}₽</div>
            `;
            itemsScroll.appendChild(itemElement);
        });
    }
    
    // Выбираем случайный предмет
    const winnerIndex = Math.floor(Math.random() * currentCase.items.length);
    const winner = currentCase.items[winnerIndex];
    const itemWidth = document.querySelector('.scroll-item').offsetWidth;
    const targetPosition = -(currentCase.items.length * itemWidth * 4 + winnerIndex * itemWidth);
    
    // Анимация открытия кейса
    caseOpening.classList.add('open');
    
    // Анимация прокрутки
    let startTime = null;
    let currentPosition = 0;
    let isSlowingDown = false;
    
    spinSound.volume = 0.5;
    spinSound.play().catch(e => console.log("Audio error:", e));
    
    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Ускорение
        let speed = SCROLL_SPEED;
        if (elapsed < 800) {
            speed = SCROLL_SPEED * (elapsed / 800);
        }
        
        // Замедление
        if (elapsed > SLOWDOWN_START) {
            isSlowingDown = true;
            const slowdownProgress = Math.min(1, (elapsed - SLOWDOWN_START) / SLOWDOWN_DURATION);
            speed = SCROLL_SPEED * (1 - slowdownProgress * slowdownProgress);
            
            if (slowdownProgress >= 1) {
                showResult(winner);
                return;
            }
        }
        
        currentPosition -= speed;
        itemsScroll.style.transform = `translateX(${currentPosition}px)`;
        
        // Подсветка ближайших предметов
        if (isSlowingDown) {
            const centerIndex = Math.floor(Math.abs(currentPosition) / itemWidth) % currentCase.items.length;
            document.querySelectorAll('.scroll-item').forEach((item, index) => {
                const distance = Math.abs(index - centerIndex);
                item.classList.toggle('highlight', distance < 2);
            });
        }
        
        requestAnimationFrame(animateScroll);
    }
    
    requestAnimationFrame(animateScroll);
    
    // Показ результата
    function showResult(item) {
        winSound.volume = 0.7;
        winSound.play();
        
        resultImage.src = `assets/${item.image}`;
        resultName.textContent = item.name;
        resultPrice.textContent = `${item.price}₽`;
        
        resultItem.style.display = 'flex';
        resultItem.classList.add('animate__fadeInUp');
        
        // Сохраняем в инвентарь
        let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        
        if (caseType === 'money') {
            let balance = parseInt(localStorage.getItem('balance')) || 1000;
            balance += item.price;
            localStorage.setItem('balance', balance);
        }
    }
    
    actionBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

