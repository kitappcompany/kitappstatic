
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