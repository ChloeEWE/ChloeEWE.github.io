<?php
require 'calendar-database.php';
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");

$response = array("success" => false, "message" => "");



//make sure the formats are correct
if(!isset($_POST['username']))
{
    $response["message"] = "There must be a username.";
    echo json_encode($response);
    exit;
}
if(!isset($_POST['password']) )
{
    $response["message"] = "There must be a password.";
    echo json_encode($response);
    exit;
}

$username = htmlentities($_POST['username']);

//check username against databse to make sure that no duplicate users are being created
$stmt = $mysqli->prepare("select COUNT(*) from users where username=?");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
 
$stmt->bind_param('s', $username);
$stmt->execute();
$stmt->bind_result($cnt);
$stmt->fetch();

if( $cnt > 0 )
{
    $response["message"] = "That username is taken!";
    echo json_encode($response);
    exit;
}

$stmt->close();
//actually put everything together
$password = password_hash( (string) $_POST['password'], PASSWORD_DEFAULT);

$_SESSION['username'] = $username;
$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
 
$stmt = $mysqli->prepare("INSERT into users (username, password) values (?, ?)");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
 
$stmt->bind_param('ss', $username, $password);
$stmt->execute();
$stmt->close();

 $response["success"] = true;
 $response["token"] = $_SESSION['token'];
 $response["username"] = $_SESSION['username'];
 echo json_encode($response);
 
?>