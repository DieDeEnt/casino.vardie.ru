<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../helpers.php';

try {
    $pdo = setPDO();


    $stmt = $pdo->query("SELECT id FROM items");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Ошибка загрузки предметов']));
}
