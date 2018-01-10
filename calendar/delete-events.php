<?php
    require 'calendar-database.php';

    ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");

    $response = array("success" => false, "message" => "");



    session_start();

    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }
  
    // Use a prepared statement
    $stmt = $mysqli->prepare("DELETE from events WHERE username=? AND id=?");
     
    // Bind the parameter
    $stmt->bind_param('ss', $user, $id);
    $user = $_SESSION['username'];
    $id = $_POST['id'];
    $stmt->execute();
    $stmt->close();
     
    $response['success'] = true;
    
    echo json_encode($response);
?>