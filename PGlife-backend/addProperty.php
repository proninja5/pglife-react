<?php
include("db.php");

header("Content-Type: application/json");

$name = trim($_POST['name'] ?? '');
$location = trim($_POST['location'] ?? '');
$price = trim($_POST['price'] ?? '');

if (empty($name) || empty($location) || empty($price)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO properties (name, location, price) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $location, $price);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Property added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$stmt->close();
$conn->close();
?>
