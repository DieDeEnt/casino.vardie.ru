<?php
    require_once __DIR__ . '/source/helpers.php';
    
    //ghostAuth();
?>

<!DOCTYPE html>
<html LONG="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Page Name -->
    <title>Vardie sign in</title>
    <!-- Page Logo -->
    <link rel="shortcut icon" href="icon/caseImg1.png" type="image/png" />


    <!-- main.css -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- normalize.css -->
    <link rel="stylesheet" href="/css/normalize.css" />
    <!-- sign-in.css -->
    <link rel="stylesheet" href="/css/login.css">


    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet">
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L78E4KSNQD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L78E4KSNQD');
</script>
<body>
    <header>
        <a href="index.php"><img src="/icon/logo.png" class="logo" height="70" width="70"/></a>
    </header>
    <main>
        <div class="mainTextConteiner">
            <lable class="mainText">Sign in to Vardie</lable>
        </div>
        <div class="block">
            <form action="source/actions/login.php" method="post">

                <lable>Username or e-mail</lable>

                <input 
                    type="text" 
                    name="usernameOrEmail" 
                    id="usernameOrEmail" 
                    placeholder="" 
                    class="inputType" 
                    value="<?php echo old('usernameOrEmail')?>"
                /><br />

                <!-- ERROR -->
                <div class="mb-8"><label class="errorText" for="usernameOrEmail"><?php setErrorMessage('usernameOrEmail')?></label></div>
                    
                <lable>Password</lable>

                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="" 
                    class="inputType"     
                /><br />

                <!-- ERROR -->
                <div><label class="errorText" for="password"><?php setErrorMessage('password')?></label></div>

                <input type="submit" value="Sign in" class="buttonSuccess button" />
            </form>
        </div>
        <div class="switchPageMenu">
            <a href="text/message.php">Where to get the Devcode?</a>
            <p class="mt-8">New to Site? <a href="registerPage.php">Create account</a></p>
        </div>
    </main>
    <footer>
        <ul>
            <li><a href="#" class="footer-text">Info</a></li>
            <li><a href="#" class="footer-text">Public</a></li>
            <li><a href="/text/privacyPolicy.php" class="footer-text">Privacy Policy</a></li>
            <li><a href="/text/termsOfService.php" class="footer-text">Terms of service</a></li>
        </ul>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>
