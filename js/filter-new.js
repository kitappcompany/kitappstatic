

let filterId = document.querySelector('#filter');


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
            whenHiddenElement(e);
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