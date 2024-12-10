<?php
header('Content-Type: application/json');
include 'connection.php';

try {
    if (isset($_GET['food'])) {
        $searchFood = $_GET['food'];
        $keywords = explode(' ', strtolower($searchFood));
        
        $searchTerms = [];
        $params = [];
        $types = '';
        
        foreach ($keywords as $keyword) {
            $searchTerms[] = "LOWER(keywords) LIKE ?";
            $params[] = "%$keyword%";
            $types .= 's';
        }
        
        $sql = "SELECT * FROM menu_items WHERE " . implode(' OR ', $searchTerms);
        $stmt = $conn->prepare($sql);
        
        if ($stmt) {
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $result = $stmt->get_result();
            $menuItems = $result->fetch_all(MYSQLI_ASSOC);
            
            if (count($menuItems) > 0) {
                echo json_encode([
                    "status" => "success",
                    "data" => $menuItems
                ]);
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Menu items not found"
                ]);
            }
            $stmt->close();
        }
    }
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>