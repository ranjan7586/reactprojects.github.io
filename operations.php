<?php
function createRcord($conn){
    $name = $_POST["name"];
        $mode = $_POST["mode"]; {
            $firstname = $_POST["firstname"];
            $lastname = $_POST["lastname"];
            $phone = $_POST["phone_number"];
            $email = $_POST["email"];
            $password = md5($_POST["password"]);
            $cpassword = md5($_POST["cpassword"]);
            $dob = $_POST["dateofbirth"];
            $gender = strtolower($_POST["gender"]);
            $country = $_POST["country"];
            $language = $_POST["language"];
            $date = $_POST['date'];
            $about = $_POST["about_user"];
            $sql = "select * from `reg02` where `email` = '$email' or `phone`='$phone'";
            $result = mysqli_query($conn, $sql);
            if ($result->num_rows > 0) {
                $row = mysqli_fetch_array($result);
                if ($row['email'] == $email) {
                    echo "'Email already exists'";
                    exit;
                } else if ($row['phone'] == $phone) {
                    echo "'Phone Number already exists'";
                    exit;
                }
            } else {
                // echo "hi";
                $lang = "";
                foreach ($language as $item) {
                    $lang .= $item . ",";
                }
                $newdirname = $firstname . " " . $lastname . " " . $email;
                $filelocation = strtolower(trim($newdirname)) . "/";
                $fileupdatedlocation = str_replace(" ", "", $filelocation);
                $createfile = mkdir("uploads/" . $fileupdatedlocation);
                echo $filelocation;
                if (isset($_FILES['image'])) {
                    $filename = basename($_FILES['image']['name']);

                    $extension = pathinfo($filename, PATHINFO_EXTENSION);

                    $imgnamedatabase = str_replace(" ", "", strtolower(trim($newdirname)) . "." . $extension);


                    $filetempname = $_FILES['image']['tmp_name'];
                    print_r($_FILES);
                    $target_path = "uploads/" . $fileupdatedlocation . $imgnamedatabase;
                    echo "kii", $target_path;
                    $newfilepath = $target_path;
                    // echo $newfilepath.$$extension;
                    if (move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
                        echo "File uploaded successfully!";
                    } else {
                        echo "Sorry, file not uploaded, please try again!";
                    }
                }


                $creator = "Ranjan";
                $modifier = "Ranjan";

                $sql = "INSERT INTO `reg02` (`firstname`, `lastname`, `phone`, `email`, `password`, `dob`, `gender`, `language`, `country`, `image`, `about`,`created_by`, `modified_by`) VALUES ('$firstname', '$lastname', '$phone', '$email', '$password', '$dob', '$gender', '$lang', '$country', '$imgnamedatabase', '$about','$creator', '$modifier');";

                if ($result = $conn->query($sql)) {
                    echo "<script>
                    alert('Registration Successful');
                    </script>";
                    echo "success";
                } else {
                    echo "error" . $conn->error;
                }
            }
        }
}



function editRecord($conn){
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $phone = $_POST["phone_number"];
    $email = strtolower($_POST["email"]);
    $password = md5($_POST["password"]);
    $cpassword = md5($_POST["cpassword"]);
    $dob = $_POST["dateofbirth"];
    $gender = strtolower($_POST["gender"]);
    $country = $_POST["country"];
    $language = $_POST["language"];
    $id = $_POST['id'];



    $sql = "select `phone`,`email` from `reg02` where `deleted`='0' AND `id` != '$id'";
    $result = mysqli_query($conn, $sql);
    if ($result->num_rows > 0) {
        while ($row = mysqli_fetch_array($result)) {
            if ($row['phone'] == $phone) {
                echo "
            Phone Number already exists
           ";
                exit;
            } else if ($row['email'] == $email) {
                echo "
            'Email already exists'
           
            ";
                exit;
            }
        }
    }

    $sqlImage = "SELECT `image`,`firstname`,`lastname`,`email`,`phone` FROM `reg02` WHERE `id`='$id';";
    $resultImage = mysqli_query($conn, $sqlImage);
    if ($resultImage) {
        $row = mysqli_fetch_assoc($resultImage);
    }
    $oldfirstname = $row['firstname'];
    $oldlastname = $row['lastname'];
    $oldemail = $row['email'];
    $oldimage = $row['image'];
    $oldphone = $row['phone'];

    $newImageName="";
    if ($_FILES['newImage']['error'] === UPLOAD_ERR_OK) {
        $newExtension = pathinfo(basename($_FILES['newImage']['name']), PATHINFO_EXTENSION);
        // echo $newExtension;
        global $newImageName;
        $newImageName = strtolower(str_replace(" ", "", $firstname . $lastname . $email . "." . $newExtension));
        $newImageFileName = strtolower(str_replace(" ", "", $firstname . $lastname . $email));
        $newFolder = 'uploads/' . $newImageFileName;
        if (!file_exists($newFolder)) {
            mkdir(strtolower($newFolder), 0777, true);
            if (($firstname != $oldfirstname) || ($lastname != $oldlastname) || ($email != $oldemail)) {
                unlink(strtolower("uploads/" . $oldfirstname . $oldlastname . $oldemail) . "/" . $oldimage);
                rmdir(strtolower("uploads/" . $oldfirstname . $oldlastname . $oldemail));
            }
        } else {
            unlink($newFolder . "/" . $oldimage);
        }

        move_uploaded_file($_FILES['newImage']['tmp_name'], strtolower($newFolder . "/" . $newImageName));
    } else {
        echo "else";
        if (($firstname != $oldfirstname) || ($lastname != $oldlastname) || ($email != $oldemail)) {
            $oldUserFolder = str_replace(" ", "", "uploads/" . $oldfirstname . $oldlastname . $oldemail);
            $newUserFolder = strtolower("uploads/" . str_replace(" ", "", $firstname . $lastname . $email));
            $lastDot = strrpos($oldimage, '.');
            $ext = substr($oldimage, $lastDot, strlen($oldimage));
            $withoutext = substr($oldimage, 0, $lastDot);
            $newImageFileName = strtolower($newUserFolder . "/" . str_replace(" ", "", $firstname . $lastname . $email . $ext));
            if (!file_exists($newUserFolder)) {
                mkdir($newUserFolder);
            }
            if (copy(strtolower($oldUserFolder . "/" . $oldimage), $newImageFileName) && unlink(strtolower($oldUserFolder . "/" . $oldimage))) {
                rmdir(strtolower($oldUserFolder));
                echo 'File renamed successfully.';
            } else {
                echo 'Error renaming the file.';
            }


            global $newImageName;
            $newImageName = strtolower(str_replace(" ", "", $firstname . $lastname . $email . $ext));
        }
    }

    if ($newImageName == "") {
        $newImageName = $oldimage;
    }

    $about = $_POST["about_user"];
    // echo "hi";
    $lang = "";
    foreach ($language as $item) {
        $lang .= $item . ",";
    }

    $creator = "Ranjan";
    $modifier = "Ranjan";

    $sql = "UPDATE `reg02` SET `firstname` = '$firstname', `lastname` = '$lastname',`phone` = '$phone', `email` = '$email', `password` = '$password', `dob` = '$dob', `gender` = '$gender', `language` = '$lang', `country` = '$country', `image` = '$newImageName', `about` = '$about' WHERE `reg02`.`id` ='$id' ;";

    if ($result = $conn->query($sql)) {
        // echo "success";
        echo "
        alert('Updation Successful')";
    } else {
        echo "error" . $conn->error;
    }
}

function searchItems($conn){
    $olddata = $_POST['allData'];
    $data = json_decode($olddata, true);
    $searchstr = $data["searchstr"];
    $fromdate = $data['fromDate'];
    $todate = $data['toDate'];
    $filterdate = $data['filterDate'];
    if ($todate == "" && !$filterdate) {
        $todate = date("Y-m-d");
    }
    if ($fromdate == "" && !$filterdate) {
        $fromdate = date("1990-01-01");
    }
    if ($todate) {
        $newtodate = date("Y-m-d", strtotime($data['toDate'] . "+1 day"));
    }
    $todaydate = date("Y-m-d G:i:s");
    $yesterdaydate = date("Y-m-d", strtotime("-1 days"));
    $last7daysdate = date("Y-m-d", strtotime("-7 days"));
    $last15daysdate = date("Y-m-d", strtotime("-15 days"));
    $last30daysdate = date("Y-m-d", strtotime("-30 days"));
    $last365daysdate = date("Y-m-d", strtotime("-365 days"));
    $lastyeardate = date("Y-m-d", strtotime("-730 days"));
    $where = "";
    $start=" 00:00:00";
    $end=" 12:00:00";
    if ($filterdate && $fromdate && $todate) {
        $filterdate = null;
    }

    if ($searchstr != "") {
        $where .= "and (`firstname` like '%$searchstr%' or `lastname` like '%$searchstr%' or `phone` like '%$searchstr%' or `email` like '%$searchstr%' or `gender` = '$searchstr' or `country` like '%$searchstr%' or `language` like '%$searchstr%')";
    }

    if (($fromdate != "") && ($todate != "")) {
        // echo "enters";
        $where .= "and `created_date`>='$fromdate' and `created_date`<='$newtodate'";
    }
    if ($filterdate != "" && ($filterdate == 'today')) {
        $where .= "and `created_date` <= '$todaydate' and `created_date`>='$yesterdaydate.$end  '";
    }
    if ($filterdate != "" && ($filterdate == 'yesterday')) {
        $where .= "and `created_date` like '%$yesterdaydate%'";
    }
    if ($filterdate != "" && ($filterdate == 'last7days')) {
        $where .= "and `created_date`<='$todaydate' and `created_date`>='$last7daysdate'";
    }
    if ($filterdate != "" && ($filterdate == 'last15days')) {
        $where .= "and `created_date`<='$todaydate' and `created_date`>='$last15daysdate'";
    }
    if ($filterdate != "" && ($filterdate == 'last30days')) {
        $where .= "and `created_date`<='$todaydate' and `created_date`>='$last30daysdate'";
    }
    if ($filterdate != "" && ($filterdate == 'last365days')) {
        $where .= "and `created_date`<='$todaydate' and `created_date`>='$last365daysdate'";
    }
    if ($filterdate != "" && ($filterdate == 'lastyear')) {
        $where .= "and `created_date`<='$last365daysdate' and `created_date`>='$lastyeardate'";
    }

    $sql = "select * from `reg02` where `deleted`='0' $where ORDER BY `created_date` DESC";

    $result = mysqli_query($conn, $sql);
    $dataArr=[];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $dataArr[] = $row;
        }
        echo json_encode($dataArr);
    }
    else{
        echo json_encode($dataArr);
    }
}
?>