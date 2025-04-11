<?php
// Запрет неявного вывода
ob_start();

// Жесткая проверка сессии
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 86400,
        'read_and_close' => true
    ]);
}

require_once __DIR__ . '/../source/helpers.php';
authUser();
$user = currentUser();

// Установка заголовков
header('Content-Type: application/json; charset=utf-8');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

try {
    $pdo = setPDO();

    // Система весов
    $rarityWeights = [
        'Consumer Grade' => 18,
        'Mil-Spec Grade' => 14,
        'Industrial Grade' => 13,
        'Restricted' => 13,
        'Classified' => 9,
        'Covert' => 5,
        'StatTrak™ Mil-Spec Grade' => 8,
        'StatTrak™ Restricted' => 6,
        'StatTrak™ Classified' => 4,
        '★ Covert' => 1,
        'Master' => 4
    ];

    $totalWeight = array_sum($rarityWeights);
    $random = mt_rand(1, $totalWeight);
    $selectedRarity = 'Consumer Grade';

    foreach ($rarityWeights as $rarity => $weight) {
        $random -= $weight;
        if ($random <= 0) {
            $selectedRarity = $rarity;
            break;
        }
    }

    // Выбор предмета
    $stmt = $pdo->prepare("SELECT * FROM items WHERE rarity = ? ORDER BY RAND() LIMIT 1");
    $stmt->execute([$selectedRarity]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$item) {
        throw new Exception("Item not found for rarity: $selectedRarity");
    }

    // Добавление в инвентарь
    $stmt = $pdo->prepare("INSERT INTO usersInventory (userId, itemId) VALUES (?, ?)");
    $stmt->execute([$user['id'], $item['id']]);

    // Логирование
    file_put_contents('spin.log', 
        date('[Y-m-d H:i:s]') . " User: {$user['id']}, Item: {$item['id']}\n", 
        FILE_APPEND
    );

    echo json_encode(['itemId' => $item['id']]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    ob_end_clean();
    exit;
}