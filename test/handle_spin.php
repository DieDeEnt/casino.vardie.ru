<?php
// Запуск буфера вывода
ob_start();

// Инициализация сессии с обработкой ошибок
if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 86400,
        'read_and_close'  => true
    ]);
}

// Подключение зависимостей
require_once __DIR__ . '/../source/helpers.php';

try {
    // Проверка авторизации
    authUser();
    $user = currentUser();

    // Установка заголовков
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');

    // Подключение к БД
    $pdo = setPDO();

    // Система редкостей
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

    // Выбор редкости
    $totalWeight = array_sum($rarityWeights);
    $random = mt_rand(1, $totalWeight);
    $selectedRarity = array_key_first($rarityWeights);

    foreach ($rarityWeights as $rarity => $weight) {
        $random -= $weight;
        if ($random <= 0) {
            $selectedRarity = $rarity;
            break;
        }
    }

    // Получение предмета
    $stmt = $pdo->prepare("SELECT * FROM items WHERE rarity = ? ORDER BY RAND() LIMIT 1");
    $stmt->execute([$selectedRarity]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);

    
    if (!$item) {
        throw new RuntimeException("Предмет с редкостью $selectedRarity не найден");
    }

    // Добавление в инвентарь
    $stmt = $pdo->prepare("INSERT INTO usersInventory (userId, itemId) VALUES (?, ?)");
    $stmt->execute([$user['id'], $item['id']]);

    // Успешный ответ
    echo json_encode([
        'itemId' => $item['id'],
        'rarity' => $selectedRarity
    ]);

} catch (Throwable $e) {
    // Логирование ошибки
    error_log($e->getMessage());
    
    // Отправка ошибки клиенту
    http_response_code(500);
    echo json_encode([
        'error' => 'Произошла ошибка',
        'code' => $e->getCode()
    ]);
} finally {
    // Очистка буфера и завершение
    ob_end_flush();
    exit;
}