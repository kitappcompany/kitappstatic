
function bookmark() {

    let bookMark = document.querySelectorAll(".bookmark"),bookCard = document.querySelectorAll(".book-card");
    let bookMarkIndex = [];
    for(let i = 0;i < bookMark.length;i++) bookMarkIndex[i] = true;

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


// !!!!!!!!!!!!!!!!!!!

let loadMore = document.querySelectorAll(".load-more"),
loadingBar = document.querySelectorAll(".loading-bar");

var next_page_markedbooks = '/bookmark-api/listbooks';
ListBooks();

function ListBooks() {
    // body...
    if (!next_page_markedbooks) {
        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "none";
        return
    }

    loadMore[0].style.display = "none";
    loadingBar[0].parentElement.children[1].style.display = "block";

    const request = new XMLHttpRequest();
    request.open("GET", next_page_markedbooks, true);

    request.onload = ()=>{

        try {
            /* code */

            let res = JSON.parse(request.responseText)
            next_page_markedbooks = res['next']

            const temp = Handlebars.compile(document.querySelector("#bookmark-instance").innerHTML);
            document.querySelector("#book-sell").children[0].innerHTML +=temp({"book":res.results})
            bookmark(); // add bookmark functionality to book cards (bookmark.js)
            popup(); //add popup functionality to book cards (popup.js)
            
            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";

            if (!next_page_markedbooks) {
                loadingBar[0].style.display = "none";
                loadMore[0].style.display = "none";
                return
            }

        } catch (e) {
            console.log(e)
            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";
        }
    }

    request.send()
}

    // Book detail Function
function bookdetail(id, popup) {

    // if the same book needed to show dont request to load
    try {
        if (popup.querySelector('span').querySelector('#previous_book_id').value === id) {
            return
        }
    } catch (e) {}
    shimmer =  Handlebars.compile(document.querySelector("#book-detail-shimmer").innerHTML);
    popup.querySelector('span').innerHTML = shimmer()
    const request = new XMLHttpRequest();
    request.open("GET", "/catalog-api/detailbook/"+id, true);

    //if user is authenticated
    try {
        let user_token = document.querySelector("#user_token").value;
        request.setRequestHeader("Authorization", "Token " + user_token)
    } catch (e) {}

    request.onload = ()=>{
        let res = JSON.parse(request.responseText)

        let myemail=null;
        try {
            myemail = document.querySelector("#user_email").value;
            /* code */
        } catch (e) {}

        const temp = Handlebars.compile(document.querySelector("#book-detail").innerHTML); // book detail HTML
        const msgStartTemp = Handlebars.compile(document.querySelector("#message-start-box").innerHTML) // msg start for this book
        popup.querySelector('span').innerHTML = (temp({"book":res, "img":res.img[0], 'myemail':myemail } ))// book detailHTML rendered
        document.querySelector("#message-popup .row").innerHTML = msgStartTemp({"book":res, "img":res.img[0]}) //message popup temp

        popupchangeimage(res.img);
        popupdelivery();
        all_locations_obj = res.locations;
        once=true;

        message_js(); // this creates message popup for a book
    }
    request.send()

}

function MarkUnMark(id){
    const request = new XMLHttpRequest();
    request.open("PATCH","/bookmark-api/markabook/" + id);
    request.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value)
    request.onload = ()=>{

    }
    request.send()

}
