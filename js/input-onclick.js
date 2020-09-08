let inputAll = document.querySelectorAll("input:not([type=hidden])"), labelAll = document.querySelectorAll(".label");

for(let i = 0;i < labelAll.length;i++){
        inputAll[i].onfocus = function(){
            labelAll[i].style.opacity = "1";
        }

        inputAll[i].onblur = function(){
            labelAll[i].style.opacity = "0";
        }
}




// check email

let signinEmail = document.querySelector("#signin-email");
let signinButton = document.querySelector(".signin-button"),checkEmail = document.querySelector(".check-email"),
checkEmailPassword = document.querySelector('.check-email-password');
// 1
function validateEmail()
{
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(signinEmail.value);
}
signinButton.onclick = function(){
    if(!validateEmail() && signinEmail.value != ""){
        checkEmail.innerHTML = "Email düzgün deyildir.";
        change_style()
}
    else{
        checkEmailPassword.style.opacity = "0";
        checkEmail.innerHTML = "";
        resetEmail(signinEmail);
        signinEmail.style.background = "#fff";
    }
}

function resetEmail(e){
    e.style.color = "#B5B5B5";
    e.style.border = ".1rem solid #B5B5B5";
}

function change_style(signin=true) {
    checkEmailPassword.style.opacity = "1";
    if (signin) {
        // body...
            signinEmail.style.color = "red";
            signinEmail.style.border = ".1rem solid red";
            signinEmail.style.background = "#fff";

    }

}

