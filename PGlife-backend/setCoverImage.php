<?php
header('Content-Type: application/json');
include("db.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->image_id) || !isset($data->property_id)) {
    echo json_encode(["status" => "error", "message" => "image_id and property_id are required"]);
    exit;
}

$imageId = intval($data->image_id);
$propertyId = intval($data->property_id);

$resetQuery = "UPDATE property_images SET is_cover = 0 WHERE property_id = $propertyId";
mysqli_query($conn, $resetQuery);

$updateQuery = "UPDATE property_images SET is_cover = 1 WHERE id = $imageId AND property_id = $propertyId";
if (mysqli_query($conn, $updateQuery)) {
    echo json_encode(["status" => "success", "message" => "Cover image updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update cover image"]);
}
?>
