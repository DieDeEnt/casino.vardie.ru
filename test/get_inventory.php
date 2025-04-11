<?php
session_start();
require_once __DIR__ . '/../source/helpers.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    $pdo = setPDO();
    
    $stmt = $pdo->prepare("
        SELECT i.* 
        FROM usersInventory ui
        JOIN items i ON ui.itemId = i.id
        WHERE ui.userId = ?
        ORDER BY ui.obtainedAt DESC
    ");
    $stmt->execute([$_SESSION['user']['id']]);
    $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($inventory);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}