$(document).ready(() => {
    viewAllRecords(1);
})
var pageNo=1;
var page=1;
let f=0;
// $(".search_btn").on('click', handleSearch);
function viewAllRecords(pageNo=1) {
    document.querySelector('.filterform').reset();
    $('#search').val("");
    f=0;
    let page=pageNo;
    $('.view_all_data').css('display','none');
    $('.dynamic_content').html("");
    $('#ex_css').attr('href', 'css/index.css');
    console.log("lo");
    $.ajax({
        url: 'server.php',
        type: 'post',
        data: { mode: 'view' },
        success: function (response) {
            let userArr = JSON.parse(response)
            viewInitialData(userArr,page);
            $('.result').css('display', 'block');
            $('.edit_btn').on("click", handleEdit);
            $('.date').datepicker({
                dateFormat: "yy-mm-dd   ",
                changeMonth: true,
                changeYear: true,
                yearRange: '-100:+0'
            });
            
            handleCheck();
        }

    })
}

//delete single data
function deleteData(data) {
    dataArr = [];
    dataArr.push(data);
    const deleteAsk = confirm("Are you sure to delete this data !");
    if (deleteAsk) {
        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { data: dataArr, mode: 'delete' },
            success: function (response) {
                alert("Item deleted");
                console.log(page);
                if(f==1){
                    $('.dynamic_content').html("");
                    $('.result').css('display', 'block');
                    handleSearch(page);
                }
                else
                viewAllRecords(pageNo);            }
        })
    }
}


//search functionality
function handleSearch(page=1) {
    f=1;
    let pageSearch=page;
    let data = $('#search').val();
    let fromDate = $('#fromdate').val();
    let toDate = $('#todate').val();
    let filterDate = $('#filterdate').val();
    let allData = {
        searchstr: data,
        fromDate: fromDate,
        toDate: toDate,
        filterDate: filterDate
    }
    $.ajax({
        url: 'server.php',
        type: 'post',
        data: {
            allData: JSON.stringify(allData),
            operation: "search",
        },
        success: function (response) {
            let userArr = JSON.parse(response);
            $('.view_all_data').css('display','inline-block');
            viewInitialData(userArr,pageSearch);
            $('.date').datepicker({
                dateFormat: "yy-mm-dd   ",
                changeMonth: true,
                changeYear: true,
                yearRange: '-100:+0'
            });
            handleCheck();
        }
    })

}

//view data in a pop up manner
function viewData(data) {
    $.ajax({
        url: 'server.php',
        type: 'POST',
        data: { data: data, mode: 'viewspecific' },
        success: function (response) {
            $('.view_sec').css('display', 'block');
            viewDetailsPopUp(JSON.parse(response));
        }
    })
}

//cancel view pop up
function viewCancel() {
    $('.view_sec').css('display', 'none');
}

//checkbox handle
function handleCheck() {
    $("#select_all").change(function () {
        console.log("olp");

        $(".raw_check").prop('checked', $(this).prop("checked"));
        if ($(this).prop("checked") == true) {
            $('.delete_all_btn').css('visibility', 'visible');
            let nodelist = $(".raw_check");
            let nodeArr = jQuery.makeArray(nodelist);
            nodeArr.forEach(function (item) {
                if (!checkboxArr.includes(item.value)) {
                    checkboxArr.push(item.value)
                }
            })
            console.log(checkboxArr);

        }
        else if ($(this).prop("checked") == false) {
            $('.delete_all_btn').css('visibility', 'hidden')
            checkboxArr = [];
            console.log(checkboxArr);

        }
        checkedLength = $(".raw_check").length;
    })


    $(".raw_check").change(function () {
        checkedLength = $(".raw_check:checked").length;
        if ($(this).prop("checked") == true) {
            $('.delete_all_btn').css('visibility', 'visible');
            if (!checkboxArr.includes($(this).val())) {
                checkboxArr.push($(this).val());
            }
            console.log(checkboxArr);

        }
        else if ($(this).prop("checked") == false) {
            $('.delete_all_btn').css('visibility', 'hidden')
            let pos = checkboxArr.indexOf($(this).val());
            if (pos > -1) {
                checkboxArr.splice(pos, 1);
            }
            console.log(checkboxArr);
        }

        if ($(".raw_check").length == $(".raw_check:checked").length
        ) {
            $("#select_all").prop("checked", true);
        }
        else {
            $("#select_all").prop("checked", false);

        }
        console.log($(this).parent().parent().children());

    })
}






let checkedLength = 0;
let checkboxArr = [];
console.log("hio");
console.log("fwefewfdew");

const count = 0;


//delete selected items

function deleteSelected() {
    console.log("check ", checkedLength);
    if (checkedLength === 0) {
        checkboxArr = [];
        alert("Please select items to delete");
    }

    let confirmAgain;
    if (checkedLength > 0) {

        confirmAgain = confirm("Are you sure to delete these selected items");
    }
    if (confirmAgain) {
        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { data: checkboxArr, mode: 'delete' },
            success: function (response) {
                if (response) {
                    alert("Items deleted successfully");
                    console.log(page);
                        if(f==1){
                            $('.dynamic_content').html("");
                            $('.result').css('display', 'block');
                            handleSearch(page);
                        }
                        else
                        viewAllRecords(pageNo);
                }

            }
        })
    }
}



function handleEdit() {
    console.log($(this).data("id"));
    dataId = $(this).data("id");
    $.ajax({
        url: 'server.php',
        type: 'post',
        data: { mode: 'editview', dataId: dataId },
        success: function (response) {
            console.log(response);
        }

    })


}


function cancelAdd() {
    if(f==1){
        $('.dynamic_content').html("");
        $('.result').css('display', 'block');
        handleSearch(page);
    }
    else
    viewAllRecords(pageNo);
}

//add new user
function addNewUser() {
    window.location.href='resgistration.php';
}



let passwordPrevValue;
let passwordPostValue;

//add new user
function updateUser(data) {
    $.ajax({
        url: 'server.php',
        type: "POST",
        data: { mode: 'updateuser', data: data },
        success: function (response) {
            console.log(response);
            let dataObj = JSON.parse(response);
            console.log(dataObj['firstname']);
            editView(dataObj);
            $('.date').datepicker({
                dateFormat: "yy-mm-dd   ",
                changeMonth: true,
                changeYear: true,
                yearRange: '-100:+0'
            });
            passwordPrevValue = $('#password').val();
        }
    })
}


//form validation update
let imageValidateResult = false;
function formValidateUpdate() {
    let genderValue = "";
    $("#formOne").submit((event) => {
        event.preventDefault();
        console.log(event);
        passwordPostValue = $('#password').val();
        console.log(passwordPostValue);
        console.log(passwordPrevValue);

        let stop = true;
        console.log("567");
        let passwordValue = $("#password").val().toString();
        let passwordValidateResult = passwordValidateUpdate(passwordValue);
        if ($("#image").val()) {
            imageValidateResult = imageHandleUpdate($("#image").val().toString());
        }
        let tgh = $("#image");
        console.log(tgh);
        let emailValidateCheck = handleEmail();


        let passWordLength = passwordValue.length;
        genderValue = $('input[name="gender"]:checked').val();
        console.log(genderValue);

        let phone_no = $("#phone_number").val().toString().length;
        if ($("#firstname").val() == "") {
            valueCheck("#firstname", "firstname", "Please enter your");
        }
        else if ($("#lastname").val() == "") {
            valueCheck("#lastname", "lastname", "Please enter your");
        }
        else if ($("#phone_number").val() == "") {
            valueCheck("#phone_number", "phone number", "Please enter your");
        }
        else if (phone_no < 10 || phone_no > 10) {
            alert("phone number should contain only 10 digits ");
            $(`#phone_number`).focus();
        }
        else if ($("#email").val() == "") {
            valueCheck("#email", "email", "Please enter your");
            $(`#email`).focus();
        }
        else if (!emailValidateCheck) {
            alert("Invalid email! Please enter a valid email ");
            $(`#email`).focus();
        }
        else if ($("#password").val() == "") {
            valueCheck("#password", "password", "Please enter your");
        }
        else if (passWordLength < 8) {
            alert("Please choose a strong password containing minimum 8 chracters");
            $(`#password`).focus();
        }
        else if (!passwordValidateResult) {
            alert("Please choose a strong password including any special chracter and a numeric. ex - Password123@");
            $(`#password`).focus();
        }
        else if ($("#cpassword").val() == "") {
            valueCheck("#cpassword", "password", "Please confirm your")
        }
        else if ($("#password").val() != $("#cpassword").val()) {
            alert("Passwords should be same");
            $(`#cpassword`).focus();
        }
        else if ($('#date').val() == "") {
            alert("Please enter your date of birth");
            $(`#date`).focus();
        }
        else if (genderValue == undefined) {
            valueCheck(".gender", "gender", "Please select your");
        }
        else if ($('input[name="language[]"]:checked').val() == undefined) {
            valueCheck(".language", "language", "Please choose your");
        }
        else if ($("#country option:selected").val() == "") {
            valueCheck("#country", "country", "Please select your");
        }
        else if ($("#image").val() == "" && $("#image")[0].defaultValue == "") {
            valueCheck("#image", "image", "Please upload your");
        }
        else if (imageValidateResult) {
            alert("Please insert images with format of .jpg or .jpeg, .png");
            $(`${"#image"}`).focus();
        }
        else if ($("#about_user").val() == "") {
            valueCheck("#about_user", "about yourself", "Please tell me something");
        }
        else {
            stop = false;
            let formData = new FormData(document.getElementById('formOne'));
            console.log("form");
            console.log(formData);
            formData.append('mode', 'update');
            $.ajax({
                url: 'server.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    console.log(response);
                    console.log(typeof (response));
                    if ((response.includes("already exists"))) {
                        alert(response);
                    }
                    else {
                        alert("Updation Sucessful");
                        console.log(page);
                        if(f==1){
                            $('.dynamic_content').html("");
                            $('.result').css('display', 'block');
                            handleSearch(page);
                        }
                        else
                        viewAllRecords(pageNo);
                    }

                },
                error: function (error) {
                    console.log(error);
                    console.log("error");

                }
            })
        }
        if (stop) {
            event.preventDefault();
        }
    })

}


//value check
function valueCheck(inputField, fieldName, message) {
    alert(`${message} ${fieldName}`);
    $(`${inputField}`).focus();
}


const handleEmail = function () {
    console.log("hi");

    let flag = 1;
    let count = 0;
    const email = $("#email").val().toString();
    let n = email.length - 1;


    const specialChars = '[`!#$%^&*()_+-=[]{};\':"\\|,<>/?~]/';
    const specialAppear = specialChars.split('').some((e) => {
        return email.includes(e);
    })

    const domainArr = ['com', 'in', 'org', 'info', 'gov', 'co', 'edu', 'net', 'biz'];
    let dotIndex = email.indexOf('.');
    let sub = email.substring(dotIndex + 1, n + 1);
    let checkdomain = domainArr.includes(sub);
    console.log(domainArr.includes(sub));



    if (email.includes("@") && email.includes(".")) {
        if (specialAppear) {
            flag = 1;
        }
        for (let i = 0; i < email.length; i++) {
            if (email[i] == "@") {
                count++;
            }
            if ((email[0] == '@') || (email[0] == ".") || (email[n] == "@") || (email[n] == ".") || (email[i] == '.' && email[i + 1] == '.') || (email[i] == '@' && email[i + 1] == '@') || (email[i] == '@' && email[i + 1] == '.') || (email[i] == '.' && email[i + 1] == '@'))
                flag = 1;
            else if (count > 1)
                flag = 1;
            else
                flag = 0;

        }
    }

    if (!checkdomain) {
        flag = 1;
    }
    console.log(flag);

    if (flag == 1) {
        return 0;
    }
    else
        return 1;

}

//update password validation
const passwordValidateUpdate = function (password) {
    console.log(password);

    console.log(passwordPrevValue);
    console.log(passwordPostValue);
    let flag = false;
    const specialChars = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    const specialAppear = specialChars.split('').some((e) => {
        return password.includes(e);
    })

    const specialNumbers = '1234567890';
    const numberAppear = specialNumbers.split('').some((e) => {
        return password.includes(e);
    })
    const capAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const calAppear = capAlphabet.split('').some((e) => {
        return password.includes(e);
    })

    if (passwordPrevValue == passwordPostValue) {
        flag = true;
    }

    else if (specialAppear && numberAppear && calAppear) {
        flag = true;
    }
    return flag;

}


//image handle update
const imageHandleUpdate = function (image) {
    console.log(image);
    if (($("#image").val() == "") && ($("#image")[0].defaultValue != '')) {
        image = $("#image")[0].defaultValue;
    }
    console.log(image);

    const arr = ['.jpg', '.jpeg', '.png']
    let dotIndex = image.lastIndexOf('.');
    let l = image.length;
    let extension = image.substring(dotIndex, l)
    if (arr.includes(extension)) {
        return 0;
    }
    else
        return 1;
}

function handleImage() {
    console.log("hi");
    $('.img_prev').hide();

}


function editView(dataObj) {
    console.log(dataObj['gender']);
    $('.page_control').css('display','none');
    let langArr = dataObj['language'].split(',');
    let imgSrcOld = (dataObj['firstname'] + dataObj['lastname'] + dataObj['email']).toLowerCase();
    let imgSrc = "uploads/" + imgSrcOld.replace(" ", "") + "/" + dataObj['image'];
    let content = `<div class="main_update_content">
    <div id="cancel">
    <button class="btn btn-danger" onclick="cancelAdd()">Cancel</button>
</div>
    <div class="container">
        <form name="formOne" id="formOne" enctype="multipart/form-data">
            <table id="reg_table" class="table_1">
                <tr>
                    <td colspan="2" id="heading">
                        <h1> User Details Updation Form
                        </h1>
                    </td>
                </tr>
                <tr>
                    <td>First Name :</td>
                    <td><input type="text" name="firstname" id="firstname" value="${dataObj['firstname']}"></td>
                </tr>
                <tr>
                    <td>Last Name :</td>
                    <td><input type="text" name="lastname" id="lastname" value="${dataObj['lastname']}"></td>
                </tr>
                <tr>
                    <td>Phone Number :</td>
                    <td><input type="number" name="phone_number" id="phone_number" maxlength="10" value="${dataObj['phone']}"></td>
                </tr>
                <tr>
                    <td>Email :</td>
                    <td><input type="email" name="email" id="email" value="${dataObj['email']}"></td>
                </tr>
                <tr>
                    <td>Password :</td>
                    <td><input type="password" name="password" id="password" value="${dataObj['password']}"></td>
                </tr>
                <tr>
                    <td>Confirm Your Password :</td>
                    <td><input type="password" name="cpassword" id="cpassword" value="${dataObj['password']}"></td>
                </tr>
                <tr>
                    <td>Date of birth :</td>
                    <td><input name="dateofbirth" id="date" value="${dataObj['dob']}"><i class="fa-solid fa-calendar-days"></i></td>
                </tr>
                <tr>
                    <td>Gender :</td>
                    <td>
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="male" value="Male" class="gender" ${dataObj['gender'] == 'male' ? "checked" : ""}>

                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="female" value="Female" class="gender" ${dataObj['gender'] == 'female' ? "checked" : ""}>
                    </td>
                    <!-- <td></td> -->
                </tr>
                <tr>
                    <td>Language Known :</td>
                    <td>
                        <input class="language" type="checkbox" name="language[]" value="hindi" id="hindi"  ${langArr.includes('hindi') ? "checked" : ""} >
                        <label for="hindi">Hindi</label>

                        <input class="language" type="checkbox" name="language[]" value="english" id="english" ${langArr.includes('english') ? "checked" : ""} >
                        <label for="english">English</label>

                        <input class="language" type="checkbox" name="language[]" value="bengali" id="bengali" ${langArr.includes('bengali') ? "checked" : ""} >
                        <label for="bengali">Bengali</label>
                    </td>
                </tr>
                <tr>
                    <td>Select your Country :</td>
                    <td>
                        <select name="country" id="country"  >
                            <option selected disabled value="">Select Country</option>
                            <option value="india" ${dataObj['country'] == 'india' ? "selected" : ""} >India</option>
                            <option value="australia" ${dataObj['country'] == 'australia' ? 'selected' : ''} >Australia</option>
                            <option value="england" ${dataObj['country'] == 'england' ? 'selected' : ''}>England</option>
                            <option value="nepal" ${dataObj['country'] == 'nepal' ? 'selected' : ''}>Nepal</option>
                            <option value="france" ${dataObj['country'] == 'france' ? 'selected' : ''} >France</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Upload Your Image :</td>
                    <td><input onchange="handleImage()" type="file" name="newImage" id="newImage" value="${dataObj['image']}" ></td>
                </tr>
                <tr class="img_prev">
                    <td>Preview</td>
                    <td> <img width="50" height="50" src="${imgSrc}" alt="image">  </td>
                </tr>

                <tr >
                    <td>Write Something About Yourself :</td>
                    <td><textarea name="about_user" id="about_user" cols="30" rows="5"  >${dataObj['about']}</textarea></td>
                </tr>
                <tr>
                    <td colspan="2" id="submit_btn">
                        <!-- <input id="submit" type="submit" value="submit"> -->
                        <input id="update" type="submit" value="update" data-id="'{id.'">
                        <input id="reset" type="reset" value="reset">
                        <input type="hidden" name="id" value="${dataObj['id']}">
                    </td>
                </tr>

            </table>
        </form>
    </div>
</div>`;

    $('.dynamic_content').html(content);
    $('.result').css('display', 'none');
    formValidateUpdate();
}

function viewInitialData(dataArr,page) {
    console.log(page);
    console.log(dataArr.length);
    let limit=5;
    let start=(page-1)*limit;
    let end=start+limit;
    console.log(start,end);

    if(dataArr.length<limit){
        start=0;
        $('.page_control').css('display','none');
    }else{
        $('.page_control').css('display','flex');
    }
    let content = $('.dyna_tbody');
    content.empty();
    if (dataArr.length > 0) {
        for(let i=start;i<end && i<dataArr.length;i++){
            let data=dataArr[i];
            let lang=data['language'].replaceAll(',','<br>');
            let imgSrcOld = (data['firstname'] + data['lastname'] + data['email']).toLowerCase();
            let imgSrc = "uploads/" + imgSrcOld.replace(" ", "") + "/" + data['image'];

            let appendContent = `<tr>
        <td><input type="checkbox" name="select" class="raw_check" value="${data["id"]}"></td>
        <td>${data["firstname"]}</td>
        <td>${data["lastname"]}</td>
        <td>${data["phone"]}</td>
        <td>${data["email"]}</td>
    
        <td><img width="50px" height="50px" src="${imgSrc} " alt=""></td>
        <td> ${data["gender"]}</td >
        <td>${lang}</td>
        <td>${data["country"]}</td>
        <td>
        <button class="view_btn btn btn-success" onClick=viewData(${data['id']})>View</button>
            <button class="edit_btn btn btn-primary" onclick=updateUser(${data['id']})> Edit</button >
        <button class="delete_btn btn btn-danger" onClick=deleteData(${data['id']})> Delete</button >
        </td >
    </tr >`;
            content.append(appendContent);
        }
    }
    else {
        content.append(`<tr><td colspan="10" class="no_record">No data found</td>
        </tr>`)
    }
     if(dataArr.length<=end){
        $('.next_btn').css('display','none');
    }
    else
    $('.next_btn').css('display','block');
    if(start<=0){
        $('.prev_btn').css('display','none');
    }
    else
    $('.prev_btn').css('display','block');
}
function viewPrevious(){
    pageNo--;
    page--;
    if(f==1){
        handleSearch(page)
    }
    else
    viewAllRecords(pageNo);
}
function viewNext(){
    pageNo++;
    page++;
    if(f==1){
        handleSearch(page)
    }
    else
    viewAllRecords(pageNo);
}


function viewDetailsPopUp(data) {    
    $('.view_sec').empty();
    let content = ` <div class="view_sec_inner">
        <table class="view_table table-bordered" border="1">
            <tr>
                <td>Firstname</td>
                <td id="firstname">${data['firstname']}</td>
            </tr>
            <tr>
                <td>Lastname</td>
                <td id="lastname">${data['lastname']}</td>
            </tr>
            <tr>
                <td>Phone No</td>
                <td id="phone">${data['phone']}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td id="email">${data['email']}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td id="gender"> ${data['gender']}</td>
            </tr>
            <tr>
                <td>Language Known</td>
                <td id="language">${data['language']}</td>
            <tr>
                <td>Country</td>
                <td id="country">${data['country']}</td>
            </tr>
            <tr>
                <td class="view_td" colspan="2"><button class="view_cancel btn btn-danger" onClick="viewCancel()">Cancel</button></td>
            </tr>
        </table>
    </div>`
    $('.view_sec').append(content);
}

