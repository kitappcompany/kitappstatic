
// close
function openHomePage(){
    window.open("index.html", "_self", "toolbar=yes,scrollbars=yes,resizable=yes");
}

// sign in sign up
let signupBtn = document.querySelector('#register-user');
let signInHeader = document.querySelector(".signin-h p"), signUpHeader = document.querySelector(".signup-h p"); // daxil ol ,qeydiyyat rengi
let signInBorder = document.querySelector(".signin-h") ,signUpBorder = document.querySelector(".signup-h"); // daxil ol,qeydiyyat border bottom rengi
let signIn = document.querySelector("#signin"), signUp = document.querySelector("#signup"); // display block none
signInHeader.onclick = function(){
    blockSignIn();
}

signUpHeader.onclick = function(){
    blockSignUp();
}
function blockSignUp(){
    signUpHeader.style.color = "#686868";
    signUpBorder.style.borderColor = "#686868";
    signInHeader.style.color = "#B5B5B5";
    signInBorder.style.borderColor = "#B5B5B5";
    signUp.style.display = "block";
    signIn.style.display = "none";
}
function blockSignIn(){
    signInHeader.style.color = "#686868";
    signInBorder.style.borderColor = "#686868";
    signUpHeader.style.color = "#B5B5B5";
    signUpBorder.style.borderColor = "#B5B5B5";
    signIn.style.display = "block";
    signUp.style.display = "none";
}

let notAccount = document.querySelector(".not-account span"), thereIs = document.querySelector('.there-is span');
notAccount.onclick = function(){
    blockSignUp();
}
thereIs.onclick = function(){
    blockSignIn();
}
// radio button
let radioButton = document.querySelector(".radio-button"), radioContent = document.querySelector('.radio-content'),checkRadio = false;
radioButton.onclick = function(){
    if(!checkRadio){
        radioContent.style.display = "inline-block";
        checkRadio = true;
        signupBtn.disabled = true;
    }
    else{
        radioContent.style.display = "none";
        checkRadio = false;
        signupBtn.disabled = false;
    }
}

// pop up
let forgetPasswordButton = document.querySelector(".forget-password");
let forgetPassword = document.querySelector("#forget-password"), closeButton = document.querySelectorAll("#forget-password .close-button"),popupBg = document.querySelector(".popup-bg");
forgetPasswordButton.onclick = function(){
    forgetPassword.style.display = "block";
}
//  forget password and done conatiner  popup unun baglanmasi close ye click olunduqda
for(let i =0;i <closeButton.length;i++){
    closeButton[i].onclick = function(){
        forgetPassword.style.display = "none";
    }
}
//  forget password and send mail  popup unun baglanmasi seifenin her hansi yerine click olunduqda
popupBg.onclick = function(){
    forgetPassword.style.display = "none";
}

// popup da mail gondere click olunduqda done containerin cixmasi
let sendButton = document.querySelector('.send-button'),popupForgetContainer = document.querySelector('.popup-forget-container'),doneContainer = document.querySelector('.done-container');
sendButton.onclick = function(){
    popupForgetContainer.style.display = "none";
    doneContainer.style.display = "block";
}