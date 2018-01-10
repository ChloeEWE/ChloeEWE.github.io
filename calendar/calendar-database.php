<?php
// Content of database.php
 
$mysqli = new mysqli('localhost', 'site_mod', 'm0d_p4ss', 'calendar');
 
if($mysqli->connect_errno) {
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}
?>