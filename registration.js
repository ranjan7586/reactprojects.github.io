
$(document).ready(() => {
    $(`${"#firstname"}`).focus();

    formValidate();
    $('#date').datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0'
    });

}
)
let dateValue=$('#date').val();

document.querySelector('#date').addEventListener('focusout',function(){

       let spanItem=event.target.parentElement.children[2];
       console.log(spanItem);
       
       if(spanItem && spanItem.tagName.toLowerCase()==='span')
       spanItem.parentElement.removeChild(spanItem);
    
})




console.log("8520");
function formValidate() {
    let genderValue = "";
    $("#formOne").submit(function (event) {
        event.preventDefault();
        // console.log($(this));
        let stop = true;
        console.log("567");
        let passwordValue = $("#password").val().toString();
        let passwordValidateResult = passwordValidate(passwordValue);
        let imageValidateResult = imageHandle($("#image").val().toString());
        let tgh = $("#image");
        console.log(tgh);
        let emailValidateCheck = handleEmail();


        let passWordLength = passwordValue.length;
        genderValue = $('input[name="gender"]:checked').val();
        console.log(genderValue);

        let phone_no = $("#phone_number").val().toString().length;
        if ($("#firstname").val() == "") {
            valueCheck("#firstname","Please enter your firstname");
        }
        else if ($("#lastname").val() == "") {
            valueCheck("#lastname","Please enter your lastname");
        }
        else if ($("#phone_number").val() == "") {
            valueCheck("#phone_number", "Please enter your phone number");
        }
        else if (phone_no < 10 || phone_no > 10) {
            valueCheck("#phone_number", "phone number should contain only 10 digits");
        }
        else if ($("#email").val() == "") {
            valueCheck("#email","Please enter your email");
        }
        else if (!emailValidateCheck) {
            valueCheck("#email","Invalid email! Please enter a valid email");
        }
        else if ($("#password").val() == "") {
            valueCheck("#password","Please enter your password");
        }
        else if (passWordLength < 8) {
            valueCheck("#password","Please choose a strong password containing minimum 8 chracters");
        }
        else if (!passwordValidateResult) {
            valueCheck("#password","Please choose a strong password including any special chracter and a numeric. ex - Password123@");
        }
        else if ($("#cpassword").val() == "") {
            valueCheck("#cpassword", "Please confirm your password")
        }
        else if ($("#password").val() != $("#cpassword").val()) {
            valueCheck("#cpassword", "Passwords should be same");
        }
        else if ($('#date').val() == "") {
            valueCheck("#date", "Please enter your date of birth");
        }
        else if (genderValue == undefined) {
            valueCheck(".gender", "Please select your gender");
        }
        else if ($('input[name="language[]"]:checked').val() == undefined) {
            valueCheck(".language","Please choose your language");
        }
        else if ($("#country option:selected").val() == "") {
            valueCheck("#country","Please select your country");
        }
        else if ($("#image").val() == "") {
            valueCheck("#image", "Please upload your image");
        }
        else if (imageValidateResult) {
            valueCheck("#image", "Please insert images with format of .jpg or .jpeg, .png");
        }
        else if ($("#about_user").val() == "") {
            valueCheck("#about_user","Please tell me something about yourself");
        }
        else {
            stop = false;
            let formData = new FormData(document.getElementById('formOne'));
            console.log("form");
            console.log(formData);
            formData.append('mode', 'createrecord');

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
                        let c=5; 
                       c= alert("Registration Sucessful");
                       if(c==undefined)
                        window.location.href='backendfetch.php';
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
function valueCheck(inputField, message) {
    $('span').empty();
    // alert(`${message}`);
    $(inputField).parent().append(`<span>${message}</span>`);
    $(`${inputField}`).focus();
}
function handleSpan(){
    let value=event.target.value;
    console.log(value);
    
    
    
    if(value!=""){
       let spanItem=event.target.parentElement.children[1];
       if(spanItem && spanItem.tagName.toLowerCase()==='span')
       spanItem.parentElement.removeChild(spanItem);
    }
    
}

//password validation
const passwordValidate = function (password) {
    console.log(password);

    let flag = false;
    const specialChars = '[`!@#$%^&*()_+-=[]{};\':"\\|,.<>/?~]/';
    const specialAppear = specialChars.split('').some((e) => {
        return password.includes(e);
    })
    console.log(specialAppear);

    const specialNumbers = '1234567890';
    const numberAppear = specialNumbers.split('').some((e) => {
        return password.includes(e);
    })
    const capAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const calAppear = capAlphabet.split('').some((e) => {
        return password.includes(e);
    })


    if (specialAppear && numberAppear && calAppear) {
        flag = true;
    }
    return flag;

}

//image validation
const imageHandle = function (image) {
    console.log(image);

    const arr = ['.jpg', '.jpeg', '.png']
    let dotIndex = image.indexOf('.');
    let l = image.length;
    let extension = image.substring(dotIndex, l)
    if (arr.includes(extension)) {
        return 0;
    }
    else
        return 1;
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
// console.log(handleEmail);

function cancelReg(){
    window.location.href="backendfetch.php";
}
