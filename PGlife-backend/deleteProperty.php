<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("delete_log.txt", print_r($data, true));

if (!isset($data['property_id'])) {
    echo json_encode(["status" => "error", "message" => "Property ID is required."]);
    exit;
}

$propertyId = intval($data['property_id']);

$imageQuery = "SELECT image_path FROM property_images WHERE property_id = $propertyId";
$imageResult = mysqli_query($conn, $imageQuery);
while ($row = mysqli_fetch_assoc($imageResult)) {
    $path = $row['image_path'];
    if (file_exists($path)) {
        unlink($path); 
    }
}
mysqli_query($conn, "DELETE FROM property_images WHERE property_id = $propertyId");

$deleteQuery = "DELETE FROM properties WHERE id = $propertyId";
if (mysqli_query($conn, $deleteQuery)) {
    echo json_encode(["status" => "success", "message" => "Property deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete property from DB."]);
}
?>
