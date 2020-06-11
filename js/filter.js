

function filter() {
    let inputValue = document.querySelectorAll(".input-val"),
    dropDownList = document.querySelectorAll(".drop-down-list");

    // axtaris sistemi
    for(let i=0;i < inputValue.length;i++){
                inputValue[i].oninput = function(){
                    checkHave(inputValue[i].value,i);
                }
            }


    function checkHave(inputVal,listIndex){
            for(let i = 0;i < dropDownList[listIndex].children.length;i++){

                if(dropDownList[listIndex].children[i].textContent.indexOf(inputVal) != -1 && inputVal != ""){
                    dropDownList[listIndex].children[i].style.display = "block";
                    dropDownList[listIndex].style.border = ".1rem solid #EFEFEF";

                }
                else{
                    dropDownList[listIndex].children[i].style.display = "none";
                }
            }
        }

    // input contentin bg sini deyisme ve borderini deyisme
    let inputContent = document.querySelectorAll(".input-content");
    for(let i = 0;i < inputValue.length;i++){
            inputValue[i].onfocus = function(){
                inputContent[i].style.backgroundColor = "#EFEFEF";
                inputContent[i].style.border = ".1rem solid #EFEFEF";
                for(let k = 0;k < dropDownList.length;k++){
                    for(let j = 0;j < dropDownList[i].children.length;j++){
                        dropDownList[k].children[j].style.display = "none";
                        dropDownList[k].style.border = "none"
                    }
                }
            }
            inputValue[i].onblur = function(){
                inputContent[i].style.backgroundColor = "#fff";
                inputContent[i].style.border = ".1rem solid #B5B5B5";
                dropDownList[i].style.border = "none";
            }
        }

    // down up iconunun deysimesi
    function changeUp(itemUp,i){
            itemUp.classList.remove('fa-angle-down');
            itemUp.classList.add('fa-angle-up');
            for(let j = 0;j < dropDownList[i].children.length;j++){
                dropDownList[i].children[j].style.display = "block";
                dropDownList[i].style.border = ".1rem solid #EFEFEF"
            }
        }
    function changeDown(itemDown,i){
            itemDown.classList.remove('fa-angle-up');
            itemDown.classList.add('fa-angle-down');
            for(let j = 0;j < dropDownList[i].children.length;j++){
                dropDownList[i].children[j].style.display = "none";
                dropDownList[i].style.border = "none"

            }
        }

    let downUp = document.querySelectorAll(".down-up"),checkClick = [];

    for(let i = 0;i < downUp.length;i++){
            checkClick[i] = false;
        }
    for(let i = 0;i < downUp.length;i++){

            downUp[i].onclick = function(){
                if(!checkClick[i]){
                    for(let j =0;j < downUp.length;j++){
                        changeDown(downUp[j],j);
                    }
                    changeUp(downUp[i],i);
                    checkClick[i] = true;
                }
                else{
                    changeDown(downUp[i],i);
                    checkClick[i] = false;
                }
            }

        }

    // li ye click olunduqda value ni inputa yazmaq
    for(let i = 0;i < dropDownList.length;i++){
        for(let j = 0;j < dropDownList[i].children.length;j++){
            dropDownList[i].children[j].onclick = function(){
                changeDown(downUp[i],i);
                inputValue[i].value = dropDownList[i].children[j].textContent;

            }
        }
    }


}
