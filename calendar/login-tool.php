<?php
    require 'calendar-database.php';

ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");
     
    // Use a prepared statement
    $stmt = $mysqli->prepare("SELECT COUNT(*), password FROM users WHERE username=?");
     
    // Bind the parameter
    $stmt->bind_param('s', $user);
    $user = $_POST['username'];
    $stmt->execute();
     
    // Bind the results
    $stmt->bind_result($cnt, $pwd_hash);
    $stmt->fetch();
     
    $pwd_guess = $_POST['password'];
    
    // Compare the submitted password to the actual password hash
    // In PHP < 5.5, use the insecure: if( $cnt == 1 && crypt($pwd_guess, $pwd_hash)==$pwd_hash){
     
    if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
        // Login succeeded!
        session_start();
        $_SESSION['username'] = $user;
        $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

        echo json_encode(array(
            "success" => true,
            "username" => $user,
            "token" => $_SESSION['token']));

         exit;
    } else{
        echo json_encode(array(
            "success" => false,
            "message" => "incorrect password or username"));
        exit;  
    }
?>