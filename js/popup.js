
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


function BookMark(img_bookmark, default=false){
    if (!default) MarkUnMark(img_bookmark.dataset.unique);
    
    if(img_bookmark.dataset.indexvalue){
        img_bookmark.src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic/img/bookmark.svg";
    }
    else{
        img_bookmark.src = "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark-red.svg";
    }
    

}
