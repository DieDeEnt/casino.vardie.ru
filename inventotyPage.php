<?php
    require_once __DIR__ . '/source/helpers.php';
    require_once __DIR__ . '/source/actions/inventory.php';
    authUser();
    $user = currentUser();
    
    //ghostAuth();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- <div class="inventory">
        {% for item in inventory %}
        <div class="item">
            <img src="{{ item.image_url }}" alt="{{ item.name }}">
            <h3>{{ item.name }}</h3>
            <p>Качество: {{ item.quality }}</p>
            <p>Float: {{ item.float_value }}</p>
        </div>
        {% endfor %}
    </div> -->
    
    <div class="inventory">
        {% for item in inventory %}
        <div class="item">
            <img src="{{ item.image_url }}" alt="{{ item.name }}">
            <h3>{{ item.name }}</h3>
            <p>Качество: {{ item.quality }}</p>
            <p>Float: {{ item.float_value }}</p>
        </div>
        {% endfor %}
    </div>
</body>
</html>