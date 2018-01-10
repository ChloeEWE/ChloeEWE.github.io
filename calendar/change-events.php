<?php
    require 'calendar-database.php';

    ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");

    $response = array("success" => false, "message" => "");

    session_start();

    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }

    $time = $_POST['time'];

    if( !preg_match("/^([012]?\d(:[012345]\d){1,2})( ?[AP]M)?$/",$time, $matches ) )
    {
        $response['message'] = "The time had the wrong format";
        echo json_encode($response);
        exit;
    }
    else
    {
        $time = $matches[1];
        if(preg_match("/P/",@$matches[3]))
        {
            $hours = substr($time,0,2);
            if( substr($hours,1) == ":") $hours = substr($hours,0,1);
            $hours += 12;
            if( substr($time,1) != ":" ) $hours .= ":";
            
            $time=$hours.substr($time,2);
        }
        if(!preg_match("/:+:/",$time))
        {
            $time.=":00";
        }
    }


     
    // Use a prepared statement
    $stmt = $mysqli->prepare("UPDATE events SET title=?, date=?, time=?, blurb=? WHERE username=? AND id=?");
     
    // Bind the parameter
    $stmt->bind_param('ssssss', $title, $day, $time, $blurb, $user, $id);
    $user = $_SESSION['username'];
    $title = htmlentities($_POST['title']);
    $day = $_POST['day'];
    $blurb = htmlentities(@$_POST['blurb']);
    $id = $_POST['id'];
    $stmt->execute();
    $stmt->close();
     
    $response['success'] = true;

    echo json_encode($response);
?>