const input_list = document.getElementsByTagName('input');
//ADDEVENTLISTENER HANDING BUTTON CLICK EVENT
document.getElementById("btn_login").addEventListener("click", function () {
    var username = document.getElementById('txt_username').value;
    var password = document.getElementById('txt_password').value;

    //validation
    if (username === "" || username === null) {
        console.log("Please Enter The username");
        return false;
    } else if (password === "" || password === null) {
        console.log("Please Enter The password");
        return false;
    }

    const login_details = {
        'user': username,
        'password': password
    }
    //CALL LOGIN FUNCTION
    const result = login(login_details);

    if (result) {
        //CALL CLARE_USER_DETAILS FUNCTION
        clare_user_details();
        console.log("Login successful");
    } else {
        clare_user_details();
        console.log("Login Failed");
    }
});

//LOGIN FUNCTION//
function login(obj_login_details) {
    const username = obj_login_details.user;
    const password = obj_login_details.password;

    //check user and password
    if (username === "admin" && password === "123456") {
        return true;
    } else {
        return false;
    }

}
//FUNCTION FOR CLARE INPUT FILD
function clare_user_details() {
    for (let i = 0; i < input_list.length; i++) {
        input_list[i].value = "";
    }
}