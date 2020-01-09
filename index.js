var next_page_books = '/catalog-api/listbooks';
// load more -- loading
let loadMore = document.querySelectorAll(".load-more"), loadingBar = document.querySelectorAll(".loading-bar");

//for Location Map
var all_locations_obj;
document.addEventListener("DOMContentLoaded", ()=>{
    BooksList();

    // load more for book Selling
    loadMore[0].onclick = function(){
        loadingBar[0].style.display = "block";
        loadMore[0].style.display = "none";
        BooksList()
    }

})

// List Out Books
function BooksList() {
    if (!next_page_books) {
        loadingBar[0].style.display = "none";
        return
    }
    let shimmerE = document.querySelector("#shimmer-effect");
    shimmerE.style.display = "inline-block";

    const request = new XMLHttpRequest();
    request.open("GET", next_page_books, true);

    try {//if user is authenticated
        let user_token = document.querySelector("#user_token").value
        request.setRequestHeader("Authorization", "Token " + user_token)
    } catch (e) {}

    request.onload = ()=>{
        let res = JSON.parse(request.responseText)
        next_page_books = res['next']
        const temp = Handlebars.compile(document.querySelector("#book-instance").innerHTML);
        document.querySelector("#books").children[0].innerHTML +=temp({"book":res.results})
        bookmark(); // add bookmark functionality to book cards (bookmark.js)

        popup(); //add popup functionality to book cards (popup.js)

        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "inline-block";
        shimmerE.style.display = "none";
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
        let user_token = document.querySelector("#user_token").value
        request.setRequestHeader("Authorization", "Token " + user_token)
    } catch (e) {}

    request.onload = ()=>{
        let res = JSON.parse(request.responseText)
        const temp = Handlebars.compile(document.querySelector("#book-detail").innerHTML); // book detail HTML
        const msgStartTemp = Handlebars.compile(document.querySelector("#message-start-box").innerHTML) // msg start for this book
        popup.querySelector('span').innerHTML = (temp({"book":res, "img":res.img[0]}))// book detailHTML rendered
        document.querySelector("#message-popup .row").innerHTML = msgStartTemp({"book":res, "img":res.img[0]}) //message popup temp

        popupchangeimage(res.img);
        popupdelivery();
        all_locations_obj = res.locations;
        once=true;

        message_js(); // this creates message popup for a book
    }
    request.send()

}
