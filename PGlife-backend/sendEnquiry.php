<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/db.php"; 

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$user_id = isset($data['user_id']) ? (int)$data['user_id'] : null;
$property_id = isset($data['property_id']) ? (int)$data['property_id'] : null;
$message = isset($data['message']) ? trim($data['message']) : null;

if (!$user_id || !$property_id || !$message) {
    echo json_encode([
        "success" => false,
        "message" => "Missing required fields."
    ]);
    exit;
}

file_put_contents(__DIR__ . "/debug_input.json", json_encode($data));

$query = "INSERT INTO enquiries (user_id, property_id, message) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("iis", $user_id, $property_id, $message);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Enquiry sent successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to send enquiry: " . $stmt->error
    ]);
}
