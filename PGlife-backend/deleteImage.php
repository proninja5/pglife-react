<?php
header('Content-Type: application/json');
include("db.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->image_id)) {
    $imageId = intval($data->image_id);

    $getQuery = "SELECT image_path FROM property_images WHERE id = $imageId";
    $getResult = mysqli_query($conn, $getQuery);

    if ($getResult && mysqli_num_rows($getResult) > 0) {
        $row = mysqli_fetch_assoc($getResult);
        $filePath = $row['image_path'];

        $deleteQuery = "DELETE FROM property_images WHERE id = $imageId";
        if (mysqli_query($conn, $deleteQuery)) {
            
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            echo json_encode(["status" => "success", "message" => "Image deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete image from DB"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Image not found"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "image_id is required"]);
}
?>
