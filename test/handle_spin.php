<?php

require_once __DIR__ . '/../source/helpers.php';
authUser();
$user = currentUser();

header('Content-Type: application/json');
$pdo = setPDO();

// Получение случайного предмета
try {
    // Система весов
    $rarityWeights = [
        'Consumer Grade'=>11,
        'Mil-Spec Grade'=>10,
        'Industrial Grade'=>8,
        'Restricted'=>8,
        'Classified'=>8,
        'High Grade'=>8,
        'Covert'=>7,

        // 21
        'StatTrak™ Consumer Grade'=>5,
        'StatTrak™ Mil-Spec Grade'=>3,
        'StatTrak™ Industrial Grade'=>3,
        'StatTrak™ Restricted'=>3,
        'StatTrak™ Classified'=>3,
        'StatTrak™ High Grade'=>3,
        'StatTrak™ Covert'=>0,
        '★ Covert'=>2,
        'Base Grade'=>0,
        'Remarkable'=>8,
        'Superior'=>0,
        'Distinguished'=>0,
        'Extraordinary'=>0,
        'Exceptional'=>0,
        'Master'=>10,
        'Exotic'=>0,
        'Contraband' =>0

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
    $stmt = $pdo->prepare("INSERT INTO usersInventory (userId, itemId) VALUES (?, ?)");
    $stmt->execute([$_SESSION['user'], $item['id']]);

    echo json_encode(['itemId' => $item['id']]);
    
} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage(),$_SESSION['user']['id']," ",$item['id']]));
}