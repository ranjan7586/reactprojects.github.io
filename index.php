<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Latest compiled and minified CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <title>Document</title>
</head>

<body>
    <div class="container m-5 text-center text-info">
        <h1>User Monitoring Panel</h1>
    </div>
    <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">User Registration</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <form id="formOne">
                        <table>
                            <tr>
                                <td>Name</td>
                                <td><input name="name" type="text" id="name"></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input type="email" name="email" id="email"></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" name="password" id="password"></td>
                            </tr>
                            <tr>
                                <td>Image</td>
                                <td><input type="file" name="image" id="image"></td>
                            </tr>
                            <tr>
                                <td>DOB</td>
                                <td><input type="text" name="dob" id="dob"></td>
                            </tr>
                            <tr>
                                <td><input type="submit" value="submit"></td>
                                <td><input type="reset" value="reset"></td>
                            </tr>
                        </table>
                    </form>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>
    <div class="container">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
            Add New User
        </button>
    </div>
    <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th><input type="checkbox" name="uni_check" id="uni_check"></th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead >
            <tbody class="tbody">
            </tbody>
        </table>
    </div>
</body>
<script>
    $(document).ready(function() {
        allRecords();
        $('#formOne').submit(function(event) {
            event.preventDefault();
            formValidate();
            console.log(event)
        })
    })

    function formValidate() {
        if ($('#name').val() == "") {
            alert("Please enter your name");
            $('#name').focus();
        } else if ($('#email').val() == "") {
            alert("Please enter your email");
            $('#email').focus();
        } else if ($('#password').val() == "") {
            alert("Please enter your password");
            $('#password').focus();
        } else if ($('#image').val() == "") {
            alert("Please enter your image");
            $('#image').focus();
        } else if ($('#dob').val() == "") {
            alert("Please enter your dob");
            $('#dob').focus();
        } else {
            let form = document.getElementById('formOne');
            let formData = new FormData(form);
            formData.append('mode', 'create');
            console.log(formData.keys)
            $.ajax({
                url: "server.php",
                type: 'POST',
                contentType: false,
                processData: false,
                data: formData,
                success: function(response) {
                    console.log(response);
                    if (response.includes('image')) {
                        alert("Please choose an appropriate image");
                    } else {
                        alert("Registration Sucessful");
                        allRecords();
                    }
                }
            })
        }
    }

    function allRecords() {
        $.ajax({
            url: 'server.php',
            type: 'GET',
            data: {
                mode: 'read'
            },
            success: function(response) {
                data = JSON.parse(response)
                console.log(data)
                viewTableRecords(data);
            }

        })
    }

    function viewTableRecords(dataArr) {
      $('.tbody').empty();
        dataArr.forEach((item) => {
            let content = `<tr>
        <td><input type="checkbox" name="raw_check" class="raw_check" value="${item.id}"></td>
        <td>${item.name}</td>
        <td>${item.image}</td>
        <td>${item.email}</td>
        <td>
        <button class="btn btn-success" data-id="${item.id}">Edit</button>
        <button class="btn btn-danger" data-id="${item.id}">Delete</button>
        </td>
      </tr>`;
            $('.tbody').append(content);
        })
        checkboxhandle();
    }
    console.log($('#uni_check'));
    function checkboxhandle(){
        $('#uni_check').change(function(){
            let uniCheck=this.checked;
            let allrawbox=document.querySelectorAll('.raw_check');
            allrawbox.forEach(function(item){
                item.checked=uniCheck;
            })
        })

        $('.raw_check').change(function(){
            console.log($('.raw_check').length)
            console.log($('.raw_check:checked').length)
            if(($('.raw_check').length)==($('.raw_check:checked').length)){
                $('#uni_check').prop('checked',true);
            }
            else{
                $('#uni_check').prop('checked',false);
            }
        })
    }
</script>

</html>