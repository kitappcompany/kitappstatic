
// click olunduqda bookmark olmasi

function bookmark() {

    let bookMark = document.querySelectorAll(".bookmark"),bookCard = document.querySelectorAll(".book-card");
    let bookMarkIndex = [];
    for(let i = 0;i < bookMark.length;i++) bookMarkIndex[i] = false;

    for(let i = 0;i < bookMark.length;i++){
        bookMark[i].onclick = function(){
            if(!bookMarkIndex[i]){
                bookMark[i].setAttribute("src", "/static/icons/bookmark-red.svg");
                bookMarkIndex[i] = true;
            }
            else{
                bookMark[i].setAttribute("src", "/static/icons/bookmark.svg");
                bookMarkIndex[i] = false;
            }

        }
        if(bookMarkIndex[i]){
            bookMark[i].style.top = "100%";
        }
        bookCard[i].onmouseover = function(){
            bookMark[i].style.top = "0";
            bookMark[i].style.opacity = "1";
        }

            bookCard[i].onmouseout = function(){
                bookMark[i].style.opacity = "0";
                if(bookMarkIndex[i]){
                bookMark[i].style.top = "100%";
                bookMark[i].style.opacity = "1";
                }
            }
    }

}//function end