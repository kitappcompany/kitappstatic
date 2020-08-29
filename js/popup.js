let popup = document.querySelector("#popup"),closeButton = document.querySelector("#popup .close-button"),popupBg = document.querySelector("#popup .popup-bg");

function bookAboutBlock(id){
    popup.style.display = "block";
    // checkPopupAbout();
    bookdetail(id, popup);
}
closeButton.onclick = function(){
    popup.style.display = "none";
    closeDelivery();
}
popupBg.onclick = function(){
    popup.style.display = "none";
    closeDelivery();
}


// book detail bookmark
let checkDetalBookmark = false;

//  book aboutun 500 sivoldan az oldugunu yoxlamaq

function checkPopupAbout(){
    try {

        let popupAbout = document.querySelector("#popup .popup-about");
        if(popupAbout.textContent.length > 500){
            popupAbout.textContent = popupAbout.textContent.slice(0, 500) + "...";
        }


        /* code */
    } catch (e) {
        console.log(e)
    }

}

function BookMark(img_bookmark){
    document.getElementById(img_bookmark.dataset.unique).querySelector(".bookmark").click();

    if(img_bookmark.dataset.indexvalue === "true"){
        img_bookmark.src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic/img/bookmark.svg";
        img_bookmark.dataset.indexvalue = "false"
    }
    else{
        img_bookmark.src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark-red.svg";
        img_bookmark.dataset.indexvalue = "true"
    }


}
