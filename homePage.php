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
<button onclick="addItem()">Добавить предмет (ID: 20)</button>
    <p id="result"></p>

    <script>
        function addItem() {
            // Отправляем запрос на сервер
            fetch('add_item.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: 20  // Можно динамически передавать другой ID
                })
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById("result").textContent = data;
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        }
    </script>
</body>
</html>