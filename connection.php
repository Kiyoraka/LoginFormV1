<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myrestaurant"; // CHANGE BASED ON YOUR WEBSITE

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>