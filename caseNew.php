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
</div>
<script src="caseNew.js"></script>
</body>
</html>