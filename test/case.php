<?php
    require_once __DIR__ . '/../source/helpers.php';
    authUser();
    $user = currentUser();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Page Name -->
    <title>KukenCase Opening</title>
    <!-- Page Logo -->
    <link rel="shortcut icon" href="/icon/caseImg1.png" type="image/png" />

    <!-- main.css -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- normalize.css -->
    <link rel="stylesheet" href="/css/normalize.css" />
    <!-- case.css -->
    <link rel="stylesheet" href="/css/case.css">
    <link rel="stylesheet" href="/test/add.css">

    <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">Kuken<span>Case</span></div>
            <div class="user-panel">
                <div class="balance" id="balance">1000$</div>
                <a class="btn-deposit">Deposit</a>
            </div>
        </header>
        
        <div class="case-container">
            <div class="case-display">
                <img src="/icon/caseImg1.png" alt="CS:GO Case" class="case-image" id="caseImage">
                <h2 class="case-name">KukenCase</h2>
                <p class="case-price">Prise: 10$</p>
                <div id="casesOpened"></div>
                <div id="totalValue"></div>
            </div>

            <div class="roulette-section">
                <div class="roulette-header">
                    <h3 class="section-title">Opening case</h3>
                    <div class="win-history">
                        <div class="win-item">$</div>
                        <div class="win-item">R</div>
                        <div class="win-item">C</div>
                        <div class="win-item">L</div>
                        <div class="win-item">M</div>
                    </div>
                </div>
                
                <div class="roulette-container">
                    <div class="indicator"></div>
                    <div class="roulette-items" id="itemsTrack"></div>
                </div>
                
                <div class="controls">
                    <div class="price-selector">
                        <div class="price-option active">1 case (10$)</div>
                        <div class="price-option">3 case (27$)</div>
                        <div class="price-option">5 case (45$)</div>
                    </div>
                    <button class="open-btn" id="openBtn">Open</button>
                </div>


                
                <div class="result" id="result">
                    <div class="result-item">
                        <img id="resultImage" src="" alt="Выигрыш">
                        <div class="item-info">
                            <h2 id="resultName"></h2>
                            <div class="rarity" id="resultRarity"></div>
                            <div class="item-price" id="resultPrice"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="inventory-section">
            <h3 class="section-title">Your inventory</h3>
            <div class="inventory-items" id="inventory"></div>
        </div>
    </div>

    <script>
        // Same JavaScript functionality as before, but with the new design elements
        // (The JavaScript from the previous example would work here)
        
        // Initialize the roulette when page loads
        window.onload = function() {
            // This would be replaced with the full initialization code
            // from the previous example
            console.log("Site loaded");
            const firstItem = track.children[0];
console.log('Реальная ширина элемента:', firstItem.offsetWidth); // Должно быть 180px
console.log('Полученный предмет:', targetItem);
console.log('Существует в items:', items.some(i => i.id === targetItem.id));
console.log(
    'Рассчитанная позиция:', -targetPosition,
    'Индекс:', targetIndex,
    'Смещение:', containerWidth / 2
);
console.log('Всего элементов в рулетке:', track.children.length);
console.log('Загруженные предметы:', items);
        };
    </script>
    <script src="/test/caseDeep.js"></script>
</body>
</html>