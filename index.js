var next_page_books = '/catalog-api/listbooks';
let didview = 0;
// load more -- loading
let loadMore = document.querySelectorAll(".load-more"), loadingBar = document.querySelectorAll(".loading-bar");
let shimmerE = document.querySelector("#shimmer-effect");

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

    let lis = document.querySelectorAll(".genre-proven");

})

// List Out Books
function BooksList(filter_url=false) {

    if (filter_url) {
        next_page_books = filter_url;
        document.querySelector("#books").children[0].innerHTML = "";
        didview =0;
    }

    if (!next_page_books) {
        loadingBar[0].style.display = "none";
        return
    }
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

        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "inline-block";
        shimmerE.style.display = "none";

        checkPopupAbout();
        if (!next_page_books) {
            loadMore[0].style.display = "none";
        }



        // did view
        document.getElementById('totalbooks').innerHTML = res['count'];
        
        didview += res.results.length;
        document.getElementById('didview').innerHTML = didview;
        let percentage = 100*didview/res['count'];
        document.querySelector(".progress-bar--content").style.width = `${percentage}%`;
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

        try {
            // when authenticated
            message_js(); // this creates message popup for a book
        } catch (e) {}

        // HTML5 history API
        history.pushState({"pk":id},null, "?share_book="+id )
    }
    request.send()

}


// SEARCH Functions

function search(event) {
    if (event.type !="click") {
        if (event.code != "Enter" ) {
            // still word is typeing for search

            return
        }
    }
    shimmerE.style.display = "inline-block";

    let url = "/catalog-api/search?search=" + event.target.parentElement.querySelector('input').value;
    const request = new XMLHttpRequest();
    request.open("GET", url, true)
    request.onload = ()=>{
        let res = JSON.parse(request.responseText)
        next_page_books = res['next']
        const temp = Handlebars.compile(document.querySelector("#book-instance").innerHTML);
        document.querySelector("#books").children[0].innerHTML =temp({"book":res.results})
        bookmark(); // add bookmark functionality to book cards (bookmark.js)

        // popup(); //add popup functionality to book cards (popup.js)

        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "inline-block";
        shimmerE.style.display = "none";
        
        // view count
        didview = 0;
        document.getElementById('totalbooks').innerHTML = res['count'];
        
        didview += res.results.length;
        document.getElementById('didview').innerHTML = didview;
        let percentage = 100*didview/res['count'];
        document.querySelector(".progress-bar--content").style.width = `${percentage}%`;
    }
    request.send()

}

// AutoComplete functions

function autoCompleteSearch() {
    // body...
    var options = {
          url: function(phrase) {
                    return "/catalog-api/search?search="+phrase;
            	},
          getValue: "title",
          listLocation:"results",
          requestDelay: 750,
          list: {
                maxNumberOfElements: 5,
                match: {enabled: true},
                onChooseEvent:function () {
                      // click search button to show result
                    document.querySelector('.fa-search').click();

                },
        	},

          template: {
                type: "custom",
                method: function(value, item) {
                    return `<span> ${item.title} ( ${item.author.full_name} )</span>`;
                }
            },


          theme: "round"
        };
        $(".search_box_au").easyAutocomplete(options);
        let div = document.querySelector(".easy-autocomplete");
        div.className = ""; //no need design change margin: 0 auto;
        div.style.margin = "0 auto";
}

// backbutton
window.onpopstate = e =>{
    const data = e.state;
    if (data != null) bookAboutBlock(`${data.pk}`);
}
