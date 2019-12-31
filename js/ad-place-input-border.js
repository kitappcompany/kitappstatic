function ad_place_input_border() {

    let inputFocus = document.querySelectorAll('.input-focus'),
    inputBorder = document.querySelectorAll(".input-border");
    for(let i = 0;i < inputFocus.length;i++){
        inputFocus[i].onfocus = function(){
            inputBorder[i].style.border = ".1rem solid #EFEFEF";
            inputBorder[i].style.background = "#EFEFEF";

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