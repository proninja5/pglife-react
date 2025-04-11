<?php  
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');  

include 'db.php';  

$properties = [];  
$query = "SELECT * FROM properties";  
$result = mysqli_query($conn, $query);  

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {  
        $properties[] = $row;  
    }  

    echo json_encode([
        "status" => "success",
        "data" => $properties
    ]);  
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to fetch properties"
    ]);  
}
?>
