<?php
    require 'calendar-database.php';

    ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");

    session_start();

    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }
    if($_POST['iscomplete'] != 'true' && $_POST['iscomplete'] != 'false')
    {
        $response['message'] = "unexpected istask entry";
        echo json_encode($response);
        exit;
    }
     
    // Use a prepared statement
    $stmt = $mysqli->prepare("UPDATE events SET iscomplete=? WHERE username=? AND id=?");
     
    // Bind the parameter
    $stmt->bind_param('sss', $complete, $user, $id );
    $complete = $_POST['iscomplete'];
    $user = $_SESSION['username'];
    $id = $_POST['id'];
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    $trueOrFalse = $_POST['iscomplete'] == 'true';

     $echo = array('success'=>true, 'iscomplete'=>$trueOrFalse);


    echo json_encode($echo);
?>