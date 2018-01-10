<?php
    //destroy session and go back to homepage
    session_start();
    session_destroy();
    header("Location: calendar.html");
?>