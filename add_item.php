<?php
// Включим вывод ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Подключим вашу функцию setPDO()
require_once __DIR__ . '/../helpers.php';



// Получаем данные из AJAX-запроса
$data = json_decode(file_get_contents('php://input'), true);
$itemId = $data['itemId'] ?? 20; // ID предмета (по умолчанию 20)

// Ваша функция (адаптированная)
function addItemToInventory($itemId) {
    $pdo = setPDO();
    $userId = 0; // Здесь можно брать ID из сессии, например: $_SESSION['userId']

    $stmt = $pdo->prepare("
        INSERT INTO userInventory (userId, itemId)
        VALUES (?, ?)
    ");

    try {
        $stmt->execute([$userId, $itemId]);
        echo "Предмет (ID: $itemId) добавлен в инвентарь!";
    } catch (PDOException $e) {
        echo "Ошибка: " . $e->getMessage();
    }
}

// Вызываем функцию
addItemToInventory($itemId);
?>