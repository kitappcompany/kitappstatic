

let filterId = document.querySelector('#filter');
let inputValue = document.querySelectorAll(".input-val")

// filterin acilib baglanmasi
function showFilter(){
    filterId.classList.toggle('filter-active');
}



// filterlere click zamani

let beforeElement = '';


function showFilterElementDropdown(e){
    e.children[2].classList.toggle("d-block");
    if(hasClass(e.children[2],'d-block')){
        whenShowElement(e);
    } else{
        whenHiddenElement(e);
    }

    for(let i = 0; i< e.children[2].children.length;i++){
        e.children[2].children[i].onclick = function(){
            e.children[0].value = e.children[2].children[i].innerHTML;
            e.children[0].dataset.info = e.children[2].children[i].dataset.info;
            whenHiddenElement(e);

            // Filter onclick
            startFiltering();
        }
    }
    // ozunnen evvel acilan dropdowunu baglamaq ucun
    if(beforeElement != '' && beforeElement != e){
        whenHiddenElement(beforeElement);
        beforeElement.children[2].classList.remove('d-block');
    }
    beforeElement = e;
}


// show zamandi
function whenShowElement(e){
    e.style.borderColor = "#5AB5F1";
    e.children[1].style.transform = "rotate(180deg)";
    e.children[1].style.transition= "all .5s";
}
// hide zamandi
function whenHiddenElement(e){
    e.style.borderColor = "#B5B5B5";
    e.children[1].style.transform = "rotate(0)";
    e.children[1].style.transition= "all .5s";

}



function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function startFiltering() {
    // body...
    let url = makeURLS(inputValue);
    BooksList(url);
}
// added by NEW
function makeURLS(inputValue) {
    let url = "/catalog-api/listbooks?"
    if (inputValue[0].dataset.info != undefined) {
            url  =  url  + inputValue[0].dataset.name + "=" + inputValue[0].dataset.info;
        }

    for (var i = 1; i < inputValue.length; i++) {
        if (inputValue[i].dataset.info != undefined) {
            url = url + '&';
            url  =  url  + inputValue[i].dataset.name + "=" + inputValue[i].dataset.info;
        }
    }
    return url
}

var timer = 0;
function fakeclick(input, ms){
    // input.dataset.info
    input.setAttribute('data-info', input.value);

    clearTimeout(timer);

    timer = setTimeout(function () {
      startFiltering()
    }, ms || 1000);
    // li.click()
}
