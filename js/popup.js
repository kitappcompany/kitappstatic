
function popup() {

    /* popup */
    let bookButton = document.querySelectorAll(".book-button");
    let popup = document.querySelector("#popup"),closeButton = document.querySelector(".close-button"),popupBg = document.querySelector(".popup-bg");

    for(let i = 0;i < bookButton.length;i++){
        bookButton[i].onclick = function(){
            let id = bookButton[i].parentElement.querySelector('input').value;
            bookdetail(id, popup);//kitab melimatlarini yaz
            popup.style.display = "block";
        }
    }
    closeButton.onclick = function(){
        popup.style.display = "none";
    }
    popupBg.onclick = function(){
        popup.style.display = "none";
    }

}// end function


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
