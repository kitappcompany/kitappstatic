
// close
function openHomePage(){
    window.open("/", "_self", "toolbar=yes,scrollbars=yes,resizable=yes");
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
    bloackSignUp();
}
function blockSignUp(){
    signUpHeader.style.color = "#686868";
    signUpBorder.style.borderBottom = ".2rem solid #686868";
    signUpBorder.style.fontFamily = "DINPro-Medium"
    signInHeader.style.color = "#B5B5B5";
    signInBorder.style.borderBottom = ".1rem solid #B5B5B5";
    signInBorder.style.fontFamily = "DINPro"
    signUp.style.display = "block";
    signIn.style.display = "none";
}
function blockSignIn(){
    signInHeader.style.color = "#686868";
    signInBorder.style.borderBottom = ".2rem solid #686868";
    signInBorder.style.fontFamily = "DINPro-Medium"
    signUpHeader.style.color = "#B5B5B5";
    signUpBorder.style.borderBottom = ".1rem solid #B5B5B5";
    signUpBorder.style.fontFamily = "DINPro"
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

        radioContent.style.color = '';
        radioButton.style.border = '1px solid #B5B5B5';
    }
    else{
        radioContent.style.display = "none";
        checkRadio = false;
        radioButton.style.border = '1px solid red'
        radioContent.style.color = 'red'
    }
}

signupBtn.onclick = ()=>{
    if (checkRadio) signupBtn.submit();
    else{
        radioButton.style.border = '1px solid red'
        radioContent.style.color = 'red'
    }
};

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
    sendMagicLink(sendButton.parentElement.querySelector('input').value);
}

function sendMagicLink(email) {
    // body...
    const data = new FormData();
    data.append('email', email);

    const request = new XMLHttpRequest();
    request.open("POST", '/accounts-api/forgot-password', true);
    request.onload = ()=>{
        // console.log(request.responseText)
    }
    request.send(data)

}