<?php
    session_start();
    
    require_once __DIR__ . '/config.php';


    function redirect(string $path)
    {
        header("Location: $path");
        die();
    }

    // function setErrorOutline(string $fieldName)
    // {
    //     echo isset($_SESSION['validation'][$fieldName]) ? 'aria-invalid="true"' : '';
    // php php setErrorOutline(fieldName:'re_enter_password') 
    // }

    //Email confirmation
    function emailConfirm(string $email)
    {
        mail($email, "Please confirm email", "Message");
    }


    function setErrorMessage(string $fieldName)
    {
        $message = ($_SESSION['validation'][$fieldName]) ?? '';
        unset($_SESSION['validation'][$fieldName]);
        echo $message;
    }

    function setOldValue(string $key, mixed $value)
    {
        $_SESSION['old'][$key] = $value;
    }

    function old(string $key) 
    {
        $value = $_SESSION['old'][$key] ?? '';
        unset($_SESSION['old'][$key]);
        return $value;
    }

    function setPDO() :PDO
    {
        try{
            return new \PDO('mysql:host=' . DB_HOST . ';charset=utf8;dbname=' . DB_NAME, DB_USERNAME, DB_PASSWORD);
        }catch(\PDOException $e)
        {
            die("Connection error: {$e->getMessage()}");

        }
        
    }

    function findUser(string $usernameOrEmail):array|bool
    {
        $pdo = setPDO();

        // check email
        
        $query = $pdo->prepare("SELECT * FROM users WHERE :usernameOrEmail IN (email, username);");
        //$query = $pdo->prepare("SELECT * FROM users WHERE email =:email LIMIT 1");
        $query->execute([':usernameOrEmail'=> $usernameOrEmail]);
        return $query->fetch(\PDO::FETCH_ASSOC);
    }

    function currentUser() : array|false {
        
        $pdo = setPDO();

        if(!isset($_SESSION['user'])){
            return false;
        }

        if(!isset($_SESSION['user']['id'])){
            redirect('/loginPage.php');
        }

        $userId = $_SESSION['user']['id'] ?? null;

        // check email
        $query = $pdo->prepare("SELECT * FROM users WHERE id =:id LIMIT 1");
        $query->execute([':id'=> $userId]);
        
        return $query->fetch(\PDO::FETCH_ASSOC);


    }

    function authUser() : void{
        if(!isset($_SESSION['user']['id'])){
            redirect('/loginPage.php');
        }
    }

    function ghostAuth() : void{
        if(!isset($_SESSION['user']['id'])){
            redirect('/homePage.php');
        }
    }

    function logout()
    {
        unset($_SESSION['user']['id']);
        redirect('/loginPage.php');
    }


    function downloadFile(array $file, $user, $path, $prefix)
    {
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
		
		$fileName = $prefix . $user['id'] . '_' . time() . ".$ext";

		if(!move_uploaded_file($file['tmp_name'], "$path/$fileName")){
            echo "$path/$fileName";
			$_SESSION['validation']['newAvatar'] = 'The image download error.';
            redirect('/../editProfilePage.php');
		}

        return $fileName;
    }

    function updateData($user, $tableName, $columnName, $data)
    {
        try{
			$pdo = setPDO();
	
			$query = "UPDATE $tableName SET $columnName = :a WHERE id = :userid";
			$stmt = $pdo->prepare($query);
			$stmt->bindValue(":userid", $user["id"]);
			$stmt->bindValue(":a", $data);
			
			$stmt->execute();
	
		}catch(\PDOException $e)
		{
			die("Connection error: {$e->getMessage()}");
		}
    }

    // function addItemToInventory($tableName, $columnName, $itemName, $itemImageUrl, $itemBasePrice, $itemRarity, $itemType)
    // {
    //     $itemName = $_POST['name'];
    //     $itemRarity = $_POST['rarity'];
    //     $itemType = $_POST['type'];
    //     $itemImageUrl = $_POST['imageUrl'];
    //     $itemBasePrice = $_POST['basePrice'];

    //     $pdo = setPDO();
    //     $stmt = $pdo->prepare("
    //         INSERT INTO items 
    //         (name, rarity, type, imageUrl, basePrice)
    //         VALUES (?, ?, ?, ?, ?)
    //     ");
    //     $stmt->execute([$itemName, $itemRarity, $itemType, $itemImageUrl, $itemBasePrice]);
    //     echo "Предмет добавлен!";
    // }

    function addItemToInventory($user, $itemId)
    {
        // Подключение к базе данных
        $pdo = setPDO();

            // // Данные предмета
            $userId = $user["id"]; // ID пользователя из сессии
        
        // Подготовленный запрос для защиты от SQL-инъекций
        $stmt = $pdo->prepare("
            INSERT INTO usersInventory 
            (userId, itemId)
            VALUES (?, ?)
        ");
        
        // Выполнение запроса
        try {
            $stmt->execute([$userId, $itemId]);
            echo "Предмет добавлен в инвентарь!";
        } catch (PDOException $e) {
            echo "Ошибка: " . $e->getMessage();
        }
    }

    function getUserInventory($user)
    {
        $pdo = setPDO();
                // Получение ID пользователя (например, из сессии)
        $userId = $user["id"];

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
    }



?>