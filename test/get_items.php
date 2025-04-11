<?php
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
    


    $stmt = $pdo->query("SELECT id,name,price,rarity,type,wear,souvenir,imgURL FROM items");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($items);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Ошибка загрузки предметов']));
}
