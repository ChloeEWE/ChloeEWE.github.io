<?php
    require 'calendar-database.php';

    ini_set("session.cookie_httponly", 1);
    header("Content-Type: application/json");

    session_start();

    if(!hash_equals($_SESSION['token'], $_POST['token'])){
        die("Request forgery detected");
    }
     
    // Use a prepared statement
    $stmt = $mysqli->prepare("SELECT id, title, date, time, blurb, istask, iscomplete, timecreated FROM events WHERE username=? AND month(date) = month(?) AND year(date) = year(?) ORDER BY date, time;");
     
    // Bind the parameter
    $stmt->bind_param('sss', $user, $day, $day);
    $user = $_SESSION['username'];
    $day = $_POST['day'];
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

     $echo = [];

     while($row = $result->fetch_assoc() )
     {
        $row['blurb'] = is_null($row['blurb']) ? "" : htmlentities($row['blurb']);
        $row['title'] = htmlentities($row['title']);
         $echo[] =  array('id'=>$row['id'],'title'=>$row['title'],'date'=>$row['date'],'time'=>$row['time'], 'blurb'=>$row['blurb'], 'istask'=>$row['istask'], 'iscomplete'=>$row['iscomplete'], 'timecreated'=>$row['timecreated']);
     }


    echo json_encode($echo);
?>