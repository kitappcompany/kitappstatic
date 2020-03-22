let loadMore = document.querySelectorAll(".load-more"),
loadingBar = document.querySelectorAll(".loading-bar");

var next_page_books = '/bookmark-api/listbooks';

function ListBooks() {
    // body...
    if (!next_page_books) {
        loadingBar[0].style.display = "none";
        return
    }

    const request = new XMLHttpRequest();
    request.open("GET", next_page_books, true);


    request.onload = ()=>{

        try {
            /* code */

            let res = JSON.parse(request.responseText)
            next_page_books = res['next']

            const temp = Handlebars.compile(document.querySelector("#bookmark-instance").innerHTML);
            document.querySelector("#book-sell").children[0].innerHTML +=temp({"book":res.results})
            bookmark(); // add bookmark functionality to book cards (bookmark.js)

            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";

        } catch (e) {
            console.log(e)
            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "inline-block";
        }
    }

    request.send()
}