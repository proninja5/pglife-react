<?php
include 'db_connection.php'; 

header('Content-Type: application/json');

$sql = "SELECT * FROM enquiries ORDER BY created_at DESC";
$result = mysqli_query($conn, $sql);

$enquiries = [];

while ($row = mysqli_fetch_assoc($result)) {
    $enquiries[] = $row;
}

echo json_encode($enquiries);
?>
