<?php
    require_once __DIR__ . '/source/helpers.php';
    
?>

<!DOCTYPE HTML>
<html LONG="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Page Name -->
    <title>Welcome</title>
    <!-- Page Logo -->
    <link rel="shortcut icon" href="icon/logo.png" type="image/png" />


    <!-- main.css -->
    <link rel="stylesheet" href="css/main.css">
    <!-- normalize.css -->
    <link rel="stylesheet" href="css/normalize.css" />
    <!-- registration.css -->
    <link rel="stylesheet" href="css/register.css">


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
    <main>
        <div class="mainTextConteiner">
            <label class="mainText"><p>Welcome</p><p>How about creating an account, m-m-m?</p></label>
        </div>
        <div class="block">
            <form action="source/actions/register.php" method="post">

                <lable class="reg text mx-4">Username</lable>

                <input 
                    type="text" 
                    class="inputType" 
                    name="username" 
                    placeholder=""  
                    value="<?php echo old('username')?>"
                /><br />

                <!-- ERROR -->
                <div class="mb-8"><label class="errorText"    for="username"><?php setErrorMessage('username')?></label></div>

                <lable>Email address</lable>

                <input 
                    type="email" 
                    class="inputType" 
                    name="email" 
                    placeholder=""  
                    value="<?php echo old('email')?>"
                /><br />

                <!-- ERROR -->
                <div class="mb-8"><label class="errorText"    for="email"><?php setErrorMessage('email')?></label></div>

                <lable>Password</lable>

                <input 
                    type="password" 
                    class="inputType" 
                    name="password" 
                    placeholder=""    
                /><br />

                <!-- ERROR -->
                <div class="mb-8"><label class="errorText"    for="password"><?php setErrorMessage('password')?></label></div>

                <lable>Re-Enter Password</lable>
                        
                <input 
                    type="password" 
                    class="inputType" 
                    name="re_enter_password" 
                    placeholder=""     
                />

                <!-- ERROR -->
                <div class="mb-8"><label class="errorText"    for="re_enter_password"><?php setErrorMessage('re_enter_password')?></label></div>
                
                <input class="buttonSuccess button" type="submit" value="Continue" />
            </form>
        </div>
        <div class="switchPageMenu">
            <a href="text/message.php">Where to get the Devcode?</a>
            <p class="mt-8">Already have an account? <a href="loginPage.php"> Sign in</a></p>
        </div>
    </main>
    <footer>
        <ul>
            <li><a href="#" class="footer-text">Info</a></li>
            <li><a href="#" class="footer-text">Public</a></li>
            <li><a href="text\privacyPolicy.php" class="footer-text">Privacy Policy</a></li>
            <li><a href="text\termsOfService.php" class="footer-text">Terms of service</a></li>
        </ul>
    </footer>
</body>
</html>
