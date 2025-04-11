<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
require_once __DIR__ . '/../source/helpers.php';

error_reporting(E_ALL);
ini_set('display_errors', 0);

try {
    $pdo = setPDO();
} catch (PDOException $e) {
  http_response_code(500);
  die(json_encode(['error' => 'Database connection failed']));
}

try {
    $stmt = $pdo->prepare("
        SELECT i.* 
        FROM usersInventory ui
        JOIN items i ON ui.itemId = i.id
        WHERE ui.userId = ?
        ORDER BY ui.obtained_at DESC
    ");
    $stmt->execute([$_SESSION['user']['id']]);
    $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($inventory);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Ошибка загрузки инвентаря']));
}