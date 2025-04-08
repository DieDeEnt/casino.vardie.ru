<?php
    require_once __DIR__ . '/source/helpers.php';
    authUser();
    $user = currentUser();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <div><?php echo $user['id']?></div>
    <div>
        <?php 
                $pdo = setPDO();
                // Получение ID пользователя (например, из сессии)
        $userId = $user['id'];

        // Запрос к базе данных
        $stmt = $pdo->prepare("
            SELECT 
                i.name, 
                i.rarity, 
                i.imageUrl,
                ui.floatValue,
                ui.pattern,
                ui.quality
            FROM usersInventory ui
            JOIN items i ON ui.itemId = i.id
            WHERE ui.userId = ?
        ");
        $stmt->execute([$userId]);
        $inventory = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Вывод данных в HTML
        foreach ($inventory as $item) {
            echo '<div class="item">';
            echo '<img src="' . htmlspecialchars($item['image_url']) . '">';
            echo '<h3>' . htmlspecialchars($item['name']) . '</h3>';
            echo '<p>Float: ' . $item['float_value'] . '</p>';
            echo '<p>Quality: ' . $item['quality'] . '</p>';
            echo '</div>';
        }
        ?>
    </div>
</body>
</html>