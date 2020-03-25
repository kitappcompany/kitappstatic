
// click olunduqda bookmark olmasi

function bookmark() {

    let bookMark = document.querySelectorAll(".bookmark"),bookCard = document.querySelectorAll(".book-card");
    let bookMarkIndex = [];
    for(let i = 0;i < bookMark.length;i++) {
        if (bookMark[i].dataset.indexvalue === "false") {
                bookMarkIndex[i] = false;
        }
        else {
                bookMarkIndex[i] = true;
        }
    }


    for(let i = 0;i < bookMark.length;i++){
        bookMark[i].onclick = function(){

            MarkUnMark(bookMark[i].dataset.unique);

            if(!bookMarkIndex[i]){
                bookMark[i].setAttribute("src", "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark-red.svg");
                bookMarkIndex[i] = true;
            }
            else{
                bookMark[i].setAttribute("src", "https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/img/bookmark.svg");
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

function MarkUnMark(id){
    const request = new XMLHttpRequest();
    request.open("PATCH","/bookmark-api/markabook/" + id);
    request.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value)
    request.onload = ()=>{

    }
    request.send()

}