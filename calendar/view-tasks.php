<?php
    require 'calendar-database.php';

    ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");

    session_start();

    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }
     
    // Use a prepared statement
    $stmt = $mysqli->prepare("SELECT id, title, date, time, blurb, timecreated, iscomplete FROM events WHERE username=? AND istask = 'true' ORDER BY date, time;");
     
    // Bind the parameter
    $stmt->bind_param('s', $user );
    $user = $_SESSION['username'];
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

     $echo = [];

     while($row = $result->fetch_assoc() )
     {
        $row['blurb'] = is_null($row['blurb']) ? "" : htmlentities($row['blurb']);
        $row['title'] = htmlentities($row['title']);
         $echo[] =  array('id'=>$row['id'],'title'=>$row['title'],'date'=>$row['date'],'time'=>$row['time'], 'blurb'=>$row['blurb'], 'timecreated'=>$row['timecreated'], 'iscomplete' => $row['iscomplete']);
     }


    echo json_encode($echo);
?>