<?php
// Запрет неявного вывода
ob_start();
header('Content-Type: application/json; charset=utf-8');

// Жесткая проверка сессии
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 86400,
        'read_and_close' => true
    ]);
}

// Запрет кеширования
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
require_once __DIR__ . '/../source/helpers.php';
authUser();
$user = currentUser();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
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
    
    file_put_contents('spin.log', 
    date('[Y-m-d H:i:s]') . " User: {$user['id']}, Item: {$item['id']}\n", 
    FILE_APPEND
    );

} catch (PDOException $e) {
    die(json_encode(['error' => $e->getMessage()]));
}

file_put_contents('spin.log', 
    date('[Y-m-d H:i:s]') . " User: {$user['id']}, Item: {$item['id']}\n", 
    FILE_APPEND
);

// Гарантированная очистка буфера
ob_end_clean();
die(); // Обязательный выход