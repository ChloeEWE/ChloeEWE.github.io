<?php

    ini_set("session.cookie_httponly", 1);

    session_start();
    header("Content-Type: application/json");

    $username = isset($_SESSION['username']) ? $_SESSION['username'] : "";

    $array = array("user" => $username);

    echo json_encode($array);

?>