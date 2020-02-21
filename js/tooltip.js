let inputFocus = document.querySelectorAll('.input-focus'),
inputBorder = document.querySelectorAll(".input-border");
let tooltip = document.querySelector('.tooltip-remoteness');

function inputOnFocus(inputF){
    inputF.parentElement.style.border = ".1rem solid #EFEFEF";
    inputF.parentElement.style.background = "#EFEFEF";
    if(inputF.classList.contains('tooltip-focus')){
        tooltip.style.opacity = "1";
        tooltip.style.zIndex = "15";
    }
}
function inputOnBlur(inputF){
    inputF.parentElement.style.border = ".1rem solid #b5b5b5";
    inputF.parentElement.style.background = "#fff";
    tooltip.style.opacity = "0";
    tooltip.style.zIndex = "10";
}

setInterval(function(){
    if(inputFocus[2].value.length != 0){
        tooltip.style.opacity = "0";
        tooltip.style.zIndex = "10";
    }
},100)


