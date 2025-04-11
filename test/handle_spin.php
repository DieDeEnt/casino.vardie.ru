<?php

require_once __DIR__ . '/../source/helpers.php';
authUser();
$user = currentUser();

header('Content-Type: application/json');
$pdo = setPDO();

// // Проверка авторизации
// if (!isset($_SESSION['user']['id'])) {
//     die(json_encode(['error' => 'Требуется авторизация']));
// }

// Получение случайного предмета
try {
    // Система весов
    $rarityWeights = [
        // 'common' => 50,
        // 'uncommon' => 30,
        // 'rare' => 15,
        // 'mythical' => 4,
        // 'legendary' => 1
        'Consumer Grade'=>18,
        'Mil-Spec Grade'=>14,
        'Industrial Grade'=>10,
        'Restricted'=>10,
        'Classified'=>10,
        'High Grade'=>9,
        'Covert'=>8,

        // 21
        'StatTrak™ Consumer Grade'=>2,
        'StatTrak™ Mil-Spec Grade'=>3,
        'StatTrak™ Industrial Grade'=>2,
        'StatTrak™ Restricted'=>2,
        'StatTrak™ Classified'=>2,
        'StatTrak™ High Grade'=>2,
        'StatTrak™ Covert'=>0,
        '★ Covert'=>1,
        'Base Grade'=>0,
        'Remarkable'=>2,
        'Superior'=>0,
        'Distinguished'=>0,
        'Extraordinary'=>0,
        'Exceptional'=>0,
        'Master'=>5,
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
    die(json_encode(['error' => 'Ошибка выполнения операции']));
}