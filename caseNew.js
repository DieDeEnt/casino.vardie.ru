class CaseAnimation {
    constructor() {
        this.items = [];
        this.carousel = document.getElementById('carousel');
        this.isSpinning = false;
        this.animationDuration = 8000;
        this.startTime = null;
        this.targetItem = null;
    }

    async init() {
        await this.loadItems();
        this.renderItems();
    }

    async loadItems() {
        try {
            const response = await fetch('/test/get_items.php');
            this.items = await response.json();
        } catch (error) {
            console.error('Error loading items:', error);
        }
    }

    renderItems() {
        // Дублируем предметы для бесшовной анимации
        const duplicatedItems = [...this.items, ...this.items, ...this.items];
        
        this.carousel.innerHTML = duplicatedItems.map(item => `
            <div class="case-item" data-rarity="${item.rarity}" data-id="${item.id}">
                <img src="${item.imgURL}" alt="${item.name}">
                <div class="item-glow"></div>
            </div>
        `).join('');
    }

    async openCase() {
        if (this.isSpinning) return;
        
        try {
            this.isSpinning = true;
            const result = await this.spinAnimation();
            this.showResult(result);
        } catch (error) {
            console.error('Error opening case:', error);
        } finally {
            this.isSpinning = false;
        }
    }

    async spinAnimation() {
        // Запускаем анимацию вращения
        this.startTime = Date.now();
        const initialPosition = this.carousel.offsetLeft;
        const targetPosition = initialPosition - 2000;
        
        this.animate(initialPosition, targetPosition);
        
        // Получаем результат от сервера
        const result = await this.getSpinResult();
        await this.stopAnimation(result);
        return result;
    }

    animate(start, end) {
        const duration = this.animationDuration;
        const startTime = Date.now();
        
        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPos = start + (end - start) * progress;
            
            this.carousel.style.left = `${currentPos}px`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    async getSpinResult() {
        const response = await fetch('/test/handle_spin.php', {
            method: 'POST',
            credentials: 'include'
        });
        return response.json();
    }

    async stopAnimation(result) {
        // Находим элемент в карусели
        const targetElement = this.carousel.querySelector(`[data-id="${result.itemId}"]`);
        const targetPosition = this.calculateTargetPosition(targetElement);
        
        // Плавная остановка
        await this.smoothStop(targetPosition);
        
        // Эффекты подсветки
        this.highlightItem(targetElement);
    }

    calculateTargetPosition(element) {
        const carouselRect = this.carousel.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        return carouselRect.left - (elementRect.left - window.innerWidth/2 + elementRect.width/2);
    }

    smoothStop(targetPosition) {
        return new Promise(resolve => {
            this.carousel.style.transition = 'left 2s cubic-bezier(0.25, 0.1, 0.25, 1)';
            this.carousel.style.left = `${targetPosition}px`;
            
            this.carousel.addEventListener('transitionend', resolve, { once: true });
        });
    }

    highlightItem(element) {
        element.classList.add('highlight');
        setTimeout(() => element.classList.remove('highlight'), 2000);
    }
}

// Инициализация
const caseAnimation = new CaseAnimation();
caseAnimation.init();

// Обработчик кнопки
document.getElementById('openBtn').addEventListener('click', () => caseAnimation.openCase());