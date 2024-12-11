<?php

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // CHANGE BASED ON YOUR WEBSITE
    if ($username === "Kiyoraka" && $password === "12345") 
    { 
        
        echo "Login successful!";
        header("Location: menu.html");
    } else {
        
        echo "Invalid username or password.";
    }
} else {
    
    header("Location: index.html");
    exit();
}
?>
