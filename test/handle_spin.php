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
        'Consumer Grade'=>18,
        'Mil-Spec Grade'=>14,
        'Industrial Grade'=>13,
        'Restricted'=>13,
        'Classified'=>9,
        // 'High Grade'=>7,
        'Covert'=>5,
        // 'StatTrak™ Consumer Grade'=>5,
        'StatTrak™ Mil-Spec Grade'=>8,
        // 'StatTrak™ Industrial Grade'=>8,
        'StatTrak™ Restricted'=>6,
        'StatTrak™ Classified'=>4,
        // 'StatTrak™ High Grade'=>4,
        // 'StatTrak™ Covert'=>0,
        '★ Covert'=>1,
        // 'Base Grade'=>0,
        // 'Remarkable'=>8,
        // 'Superior'=>0,
        // 'Distinguished'=>0,
        // 'Extraordinary'=>0,
        // 'Exceptional'=>0,
        'Master'=>4,
        // 'Exotic'=>0,
        // 'Contraband' =>0

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
    $stmt->execute([$user['id'], $item['id']]);

    echo json_encode(['itemId' => $item['id']]);
    
} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage()]));
}