<?php
$conn = new mysqli("10.10.10.12", "root",  "c0relynx", "registration");
if (!$conn) {
    die("connection failed" . mysqli_connect_error());
}
//view all data
if (isset($_POST['mode']) && ($_POST['mode'] == 'view')) {
    $sql = "SELECT * FROM `reg02` where deleted='0' ORDER BY `created_date` DESC";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
}

//view details of a row or data
if (isset($_POST["mode"]) && (($_POST["mode"] == "viewspecific") || ($_POST["mode"] == 'updateuser'))) {
    if (isset($_POST["data"])) {
        $id = $_POST['data'];
        $sql = "select * from `reg02` where `reg02`.`id` = $id ORDER BY `created_date` DESC";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
        }else {
            echo "error";
        }
        echo json_encode($row);
    }
}

//delete selected items
if (isset($_POST["mode"]) && $_POST["mode"] == "delete") {
    $data = $_POST['data'];
    foreach ($data as $id) {
        $sql = "UPDATE `reg02` SET `deleted` = '1' WHERE `reg02`.`id` = '$id';";
        $conn->query($sql);
    }
    echo "success";
}

//search item
if (isset($_POST["operation"]) && $_POST["operation"] == "search") {
    require_once 'operations.php';
    searchItems($conn);
}

//create new record
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['mode'] == 'createrecord') {
        require_once 'operations.php';
        createRcord($conn);
    }
}

//update new record
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['mode'] == 'update') {
        require_once 'operations.php';
        editRecord($conn);
       
    }
}
$conn->close();
?>