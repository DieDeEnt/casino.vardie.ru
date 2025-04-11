<?php
    require_once __DIR__ . '/source/helpers.php';
    authUser();
    $user = currentUser();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="caseNew1.css">
    <link rel="stylesheet" href="caseNew.css">
    <title>Document</title>
</head>
<body>
<div class="case-container">
    <div class="case-animation">
        <div class="items-carousel" id="carousel">
            <!-- Предметы будут добавлены через JS -->
        </div>
        <div class="center-indicator"></div>
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
<script src="caseNew.js"></script>
</body>
</html>