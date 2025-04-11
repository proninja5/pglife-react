<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$targetDir = "uploads/";
$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['property_id']) && isset($_FILES['images'])) {
        $property_id = $_POST['property_id'];
        $uploadedFiles = $_FILES['images'];
        $successfulUploads = [];

        require_once "db.php";

        for ($i = 0; $i < count($uploadedFiles['name']); $i++) {
            $fileName = basename($uploadedFiles["name"][$i]);
            $targetFilePath = $targetDir . uniqid() . "_" . $fileName;
            $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

            $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            if (in_array($fileType, $allowedTypes)) {
                if (move_uploaded_file($uploadedFiles["tmp_name"][$i], $targetFilePath)) {
                    $stmt = $conn->prepare("INSERT INTO property_images (property_id, image_path, is_cover) VALUES (?, ?, 0)");
                    $stmt->bind_param("is", $property_id, $targetFilePath);
                    if ($stmt->execute()) {
                        $successfulUploads[] = $targetFilePath;
                    }
                    $stmt->close();
                }
            }
        }

        if (!empty($successfulUploads)) {
            $response = [
                "status" => "success",
                "message" => "Images uploaded successfully!",
                "uploaded" => $successfulUploads
            ];
        } else {
            $response = [
                "status" => "error",
                "message" => "No images were uploaded."
            ];
        }
    } else {
        $response = [
            "status" => "error",
            "message" => "Missing property ID or files."
        ];
    }
} else {
    $response = [
        "status" => "error",
        "message" => "Invalid request method."
    ];
}

echo json_encode($response);
?>
