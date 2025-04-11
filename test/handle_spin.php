<?php

require_once __DIR__ . '/../source/helpers.php';
authUser();
$user = currentUser();

header('Content-Type: application/json');
$pdo = setPDO();

// Проверка авторизации
if (!isset($_SESSION['userId'])) {
    die(json_encode(['error' => 'Требуется авторизация']));
}

// Получение случайного предмета
try {
    // Система весов
    $rarityWeights = [
        'common' => 50,
        'uncommon' => 30,
        'rare' => 15,
        'mythical' => 4,
        'legendary' => 1
    ];

    $totalWeight = array_sum($rarityWeights);
    $random = mt_rand(1, $totalWeight);

    foreach ($rarityWeights as $rarity => $weight) {
        $random -= $weight;
        if ($random <= 0) {
            $selectedRarity = $rarity;
            break;
        }
    }

    // Выбор предмета выбранной редкости
    $stmt = $pdo->prepare("SELECT * FROM items WHERE rarity = ? ORDER BY RAND() LIMIT 1");
    $stmt->execute([$selectedRarity]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    // Добавление в инвентарь
    $stmt = $pdo->prepare("INSERT INTO usersInventory (user_id, item_id) VALUES (?, ?)");
    $stmt->execute([$_SESSION['user_id'], $item['id']]);

    echo json_encode(['item_id' => $item['id']]);
    
} catch (PDOException $e) {
    die(json_encode(['error' => 'Ошибка выполнения операции']));
}