<?php
header('Content-Type: application/json'); // Set content type to JSON
include 'connection.php';

try {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = mysqli_real_escape_string($conn, $_POST['customerName']);
        $age = mysqli_real_escape_string($conn, $_POST['customerAge']);
        $food = mysqli_real_escape_string($conn, $_POST['customerFood']);
        
        $sql = "INSERT INTO customer_feedback (customer_name, customer_age, customer_food) 
                VALUES ('$name', '$age', '$food')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("status" => "success"));
        } else {
            echo json_encode(array("status" => "error", "message" => $conn->error));
        }
    }
} catch (Exception $e) {
    echo json_encode(array("status" => "error", "message" => $e->getMessage()));
}

$conn->close();
?>