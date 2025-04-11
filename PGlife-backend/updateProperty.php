<?php
header('Content-Type: application/json');
include("db.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "Property ID is required"]);
    exit;
}

$id = intval($data->id);
$name = isset($data->name) ? mysqli_real_escape_string($conn, $data->name) : '';
$location = isset($data->location) ? mysqli_real_escape_string($conn, $data->location) : '';
$price = isset($data->price) ? floatval($data->price) : 0;

if ($name === '' || $location === '' || $price <= 0) {
    echo json_encode(["status" => "error", "message" => "Name, location, and price are required"]);
    exit;
}

$query = "UPDATE properties SET name='$name', location='$location', price=$price WHERE id=$id";

if (mysqli_query($conn, $query)) {
    echo json_encode(["status" => "success", "message" => "Property updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update property: " . mysqli_error($conn)]);
}
?>
