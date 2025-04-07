<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CS:GO Case Opening Simulator</title>

    <!-- main.css -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- normalize.css -->
    <link rel="stylesheet" href="css/normalize.css" />
    <!-- caseOpenStyle.css -->
    <link rel="stylesheet" type="text/css" href="/css/caseOpenStyle.css">


    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">

</head>
<body>
    <div class="header">
        <h1>CS:GO CASE OPENING SIMULATOR</h1>
    </div>
    
    <div class="container">
        <div class="case-container">
            <div class="center-line"></div>
            <div class="items-track" id="itemsTrack"></div>
        </div>
        
        <button class="open-btn" id="openBtn">OPEN</button>
        
        <div class="stats">
            <div class="stat-box">
                <div>BALANCE</div>
                <div class="stat-value" id="balance">1000</div>
            </div>
            <div class="stat-box">
                <div>CASES OPENED</div>
                <div class="stat-value" id="casesOpened">0</div>
            </div>
            <div class="stat-box">
                <div>TOTAL VALUE</div>
                <div class="stat-value" id="totalValue">0</div>
            </div>
        </div>
        
        <div class="inventory">
            <h2>YOUR INVENTORY</h2>
            <div class="inventory-items" id="inventory"></div>
        </div>
    </div>
    <script src="/js/caseOpenJs.js"></script>
</body>
</html>