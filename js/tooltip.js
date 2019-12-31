function tooltip() {
    let inputFocus = document.querySelectorAll('.input-focus'),
    inputBorder = document.querySelectorAll(".input-border");
    let tooltip = document.querySelector('.tooltip-remoteness');

    for(let i = 0;i < inputFocus.length;i++){
        inputFocus[i].onfocus = function(){
            inputBorder[i].style.border = ".1rem solid #EFEFEF";
            inputBorder[i].style.background = "#EFEFEF";
            if(inputFocus[i].classList.contains('tooltip-focus')){
                tooltip.style.opacity = "1";
                tooltip.style.zIndex = "15";
                setTimeout(function(){
                    tooltip.style.opacity = "0";
                    tooltip.style.zIndex = "10";
                },2000)
            }

        }
        inputFocus[i].onblur = function(){
            inputBorder[i].style.background = "#fff";
            inputBorder[i].style.border = ".1rem solid #b5b5b5";
        }
    }

    // qeleme click olunduqda inputa focus
    // let pencil = document.querySelector('.pencil'),pencilInput = document.querySelector('.pencil-input');
    // pencil.onclick = function(){
    //     pencilInput.focus();
    // }

}


