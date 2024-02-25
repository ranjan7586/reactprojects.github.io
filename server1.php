<?php 
$conn=mysqli_connect("localhost","root","","test");
if(!$conn){
    die("Connection to database failed".mysqli_connect_error());
}




if(isset($_POST['mode']) && $_POST['mode']=='create'){
    $name=$_POST['name'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    $dob=$_POST['dob'];

    $image=$_FILES['image'];
    $finfo=finfo_open(FILEINFO_MIME_TYPE);
    $filetype=(string)finfo_file($finfo, $_FILES['image']['tmp_name']);
    if(str_contains($filetype,'image')==false){
        echo "image type error",$filetype;
        exit();
    }
    $ext=pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $date=date("Ymdhis");
    $filename=$name.$email.$date;
    mkdir("uploads/".$filename);
    move_uploaded_file($_FILES['image']['tmp_name'],"uploads/".$filename."/".$filename.".".$ext);

    $sql="INSERT INTO `ranjan_prac01` ( `name`, `email`, `password`, `image`, `dob`) VALUES ( '$name', '$email', '$password', '$filename.".".$ext', '$dob');";

    $result=mysqli_query($conn,$sql);
    if($result){
        echo "Registration successfull";
    }
}

if(isset($_GET['mode'])&& $_GET['mode']=='read'){
    $sql="SELECT * FROM ranjan_prac01 WHERE `deleted`='0'";
    $result=mysqli_query($conn,$sql);
    $dataArr=array();
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            array_push($dataArr,$row);
        }
    }
    echo json_encode($dataArr);
}

?>