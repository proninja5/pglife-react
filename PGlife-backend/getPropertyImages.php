<?php
require "config.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $property_id = $_GET["property_id"] ?? null;

    if (!$property_id) {
        echo json_encode(["status" => "error", "message" => "Missing property ID"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, image_path FROM property_images WHERE property_id = ?");
    $stmt->bind_param("i", $property_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $images = [];
    while ($row = $result->fetch_assoc()) {
        $images[] = [
            "id" => $row["id"],
            "path" => $row["image_path"] 
        ];
    }

    echo json_encode([
        "status" => "success",
        "images" => $images
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
}
?>
