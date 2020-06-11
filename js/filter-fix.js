let inputValue = document.querySelectorAll(".input-val"),dropDownList = document.querySelectorAll(".drop-down-list");
// input contentin bg sini deyisme ve borderini deyisme
let inputContent = document.querySelectorAll(".input-content");


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
                showPlaceholder(j);
            }
            changeUp(downUp[i],i);
            checkClick[i] = true;
            inputFocusBg(i);
            hiddenPlaceholder(i);
        }
        else{
            changeDown(downUp[i],i);
            checkClick[i] = false;
            inputBlurBg(i);
            showPlaceholder(i);
        }
    }
    inputValue[i].onclick = function(){
        if(!checkClick[i]){
            for(let j =0;j < downUp.length;j++){
                changeDown(downUp[j],j);
                showPlaceholder(j);
            }
            changeUp(downUp[i],i);
            checkClick[i] = true;
            inputFocusBg(i);
            hiddenPlaceholder(i);
        }
        else{
            changeDown(downUp[i],i);
            checkClick[i] = false;
            inputBlurBg(i);
            showPlaceholder(i);
        }
    }

}

// li ye click olunduqda value ni inputa yazmaq
for(let i = 0;i < dropDownList.length;i++){
    for(let j = 0;j < dropDownList[i].children.length;j++){
        dropDownList[i].children[j].onclick = function(){
            changeDown(downUp[i],i);
            inputBlurBg(i)
            inputValue[i].value = dropDownList[i].children[j].textContent;
            
            // added by NEW
            let filter_url = makeURLS(inputValue, dropDownList);
            console.log(filter_url, "A")
            BooksList(filter_url);
        }
    }
}

function inputFocusBg(i){
    for(let j = 0;j < inputContent.length;j++){
        inputBlurBg(j);
    }
    inputContent[i].style.backgroundColor = "#EFEFEF";
    inputValue[i].style.backgroundColor = "#EFEFEF";
    inputContent[i].style.border = ".1rem solid #EFEFEF";
}
function inputBlurBg(i){
    inputContent[i].style.backgroundColor = "#fff";
    inputValue[i].style.backgroundColor = "#fff";
    inputContent[i].style.border = ".1rem solid #B5B5B5";
}

function hiddenPlaceholder(i){
    inputValue[i].setAttribute('placeholder'," ");
}
function showPlaceholder(i){
    inputValue[i].setAttribute('placeholder',"seç");
}
let filterButton = document.querySelector(".filter"),filterPage = document.querySelector("#filter");
// filter buttonu ucun
let check = true;
filterButton.onclick = function(){
    if(check){
        filterButton.style.background = "#5AB5F1";
        filterButton.style.color = "#fff";
        filterButton.style.border = ".1rem solid #5AB5F1";
        filterPage.style.display = "block";

        check = false;
    }
    else{
        filterButton.style.background = "#fff";
        filterButton.style.color = "#686868";
        filterButton.style.border = ".1rem solid #686868";
        filterPage.style.display = "none";
        check = true;
    }
}

// added by NEW
function makeURLS(inputValue, dropDownList) {
    // body...
    let url = "/catalog-api/listbooks?"
    for (var i = 0; i < inputValue.length; i++) {
        url  =  url  + inputValue[i].dataset.name + "=" + inputValue[i].dataset.info + '&';
    }
    return url
}