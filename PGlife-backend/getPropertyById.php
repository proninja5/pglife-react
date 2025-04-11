<?php
header('Content-Type: application/json');
include("db.php");

if (!isset($_GET["id"])) {
    echo json_encode(["status" => "error", "message" => "Property ID is required"]);
    exit;
}

$id = intval($_GET["id"]);
if ($id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid Property ID"]);
    exit;
}

$query = "SELECT id, name, location, price, description FROM properties WHERE id = $id";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["status" => "error", "message" => "Database query failed: " . mysqli_error($conn)]);
    exit;
}

if (mysqli_num_rows($result) > 0) {
    $property = mysqli_fetch_assoc($result);
    echo json_encode(["status" => "success", "property" => $property]);
} else {
    echo json_encode(["status" => "error", "message" => "Property not found"]);
}
?>
