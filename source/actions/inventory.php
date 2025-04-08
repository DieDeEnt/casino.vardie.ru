<?php
class Inventory {
    private $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    // Получить инвентарь пользователя
    public function getInventory($userId) {
        $stmt = $this->pdo->prepare("
            SELECT i.name, i.rarity, ui.float_value, ui.quality
            FROM user_inventory ui
            JOIN items i ON ui.item_id = i.id
            WHERE ui.user_id = ?
        ");
        $stmt->execute([$userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Добавить предмет в инвентарь
    public function addItem($userId, $itemId, $float, $pattern, $quality) {
        $this->pdo->beginTransaction();
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO user_inventory 
                (user_id, item_id, float_value, pattern, quality)
                VALUES (?, ?, ?, ?, ?)
            ");
            $stmt->execute([$userId, $itemId, $float, $pattern, $quality]);
            $this->pdo->commit();
            return true;
        } catch (Exception $e) {
            $this->pdo->rollBack();
            return false;
        }
    }
}
?>