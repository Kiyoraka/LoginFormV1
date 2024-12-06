<?php
// Basic login processing (replace with your actual logic)
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Placeholder: Replace with your own username and password
    if ($username === "Kiyoraka" && $password === "12345") 
    { 
        // Successful login
        echo "Login successful!";
    } else {
        // Invalid credentials
        echo "Invalid username or password.";
    }
} else {
    // Redirect to index page if form is not submitted properly
    header("Location: index.html");
    exit();
}
?>