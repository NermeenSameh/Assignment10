let signInEmail = document.getElementById("signinEmailId");
let signInPassword = document.getElementById("signinPasswordId");
let signUpName = document.getElementById("signupNameId");
let signUpEmail = document.getElementById("signupEmailId");
let signUpPassword = document.getElementById("signupPasswordId");
let usersList;
var mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//#region Global
if (localStorage.getItem('users') == null) {
    usersList = []
} else {
    usersList = JSON.parse(localStorage.getItem('users'));
}
//#endregion
//#region SignIn screen
function signInIsEmpty() {
    if (signInEmail.value == "" || signInPassword.value == "") {
        return false
    }
    else {
        return true
    }
}
function signInFun() {
    localStorage.removeItem('loginUserName');
    let password = signInPassword.value
    let email = signInEmail.value
    if (signInIsEmpty() == false) {
        document.getElementById("incorrectInf").innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return;
    }
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].userEmail.toLowerCase() == email.toLowerCase() && usersList[i].userPassword.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('loginUserName', JSON.stringify(usersList[i].userName));
        }
    }

    if (localStorage.getItem('loginUserName') == null) {
        document.getElementById("incorrectInf").innerHTML = '<span class="text-danger m-3">Username or Password is invalid</span>'
        signInClearData();
    }
    else {
        window.location.href = "./home.html";
    }
}
function signInClearData() {
    signInEmail.value = "";
    signInPassword.value = "";
}
//#endregion
//#region SignUp screen
function signUpFun() {
    if (signUpIsEmpty() == true) {
        document.getElementById('statusMessage').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    if (mailRegex.test(signUpEmail.value) == false) {
        document.getElementById('statusMessage').innerHTML = '<span class="text-danger m-3">Invalid mail</span>'
        return false
    }
    let userInf =
    {
        userName: signUpName.value,
        userEmail: signUpEmail.value,
        userPassword: signUpPassword.value,
    }
    if (usersList.length == 0) {
        usersList.push(userInf);
        localStorage.setItem('users', JSON.stringify(usersList));
        document.getElementById('statusMessage').innerHTML = '<span class=" class="text-success m-3">Registed successfully</span>'
    }
    else {
        if (signUpIsEmailExist() == false) {
            document.getElementById('statusMessage').innerHTML = '<span class="text-danger m-3">Email already exists</span>'

        } else {
            usersList.push(userInf)
            localStorage.setItem('users', JSON.stringify(usersList))
            document.getElementById('statusMessage').innerHTML = '<span class="text-success m-3">Registed successfully</span>'
        }
    }
    signUpClearData();
    window.location.href = "./index.html";
}
function signUpClearData() {
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}
function signUpIsEmpty() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        return true
    } else {
        return false
    }
}
function signUpIsEmailExist() {
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].userEmail.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return false
        }
    }
}
//#endregion
//#region Home screen
function logout() {
    localStorage.removeItem('loginUserName');
    window.location.href = "./index.html";
}
//#endregion







