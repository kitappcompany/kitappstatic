var next_page_mybooks = '/accounts-api/mybooks';
let loadMore = document.querySelectorAll(".load-more"), loadingBar = document.querySelectorAll(".loading-bar");

function LoadMyBooks() {
    loadingBar[0].style.display = "block";
    loadMore[0].style.display = "none";

    if (!next_page_mybooks) {
        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "none";
        return
    }
    const request = new XMLHttpRequest();
    request.open("GET", next_page_mybooks, true)

    try {//if user is authenticated
        let user_token = document.querySelector("#user_token").value
        request.setRequestHeader("Authorization", "Token " + user_token)} catch (e) {
        return
    }

    request.onload = ()=>{
        let res = JSON.parse(request.responseText);
        next_page_mybooks = res['next'];
        const temp = Handlebars.compile(document.querySelector("#mybook-instance").innerHTML);
        document.querySelector("#i-sold").children[0].innerHTML +=temp({"book":res.results})
        console.log(res.results)
        check_price_zero();

        loadingBar[0].style.display = "none";
        loadMore[0].style.display = "inline-block";

        if (!next_page_mybooks) {
            loadingBar[0].style.display = "none";
            loadMore[0].style.display = "none";
            return
        }

    }

    request.send();

}

function sold_or_onsale(event, bool) {
    let button = event.target;
    let div = button.parentElement.parentElement.parentElement;
    let book_id = div.querySelector('#book-id').value;

    if (bool) {
        div.querySelector('.first-buttons').style.display = "none";
        div.querySelector('.second-button').style.display = "block";
        div.querySelector('.bg-B5B5B5').style.opacity = '.6';
    }else{
        div.querySelector('.first-buttons').removeAttribute('style');
        div.querySelector('.second-button').style.display = "none";
        div.querySelector('.bg-B5B5B5').style.opacity = '0';
    }

    const request = new XMLHttpRequest();
    request.open("PATCH", "/accounts-api/mybooks/"+book_id+"/")
    try {
        //if user is authenticated
        let user_token = document.querySelector("#user_token").value
        request.setRequestHeader("Authorization", "Token " + user_token)} catch (e) {
            return
        }
    request.onload = ()=>{
        console.log(request.responseText)
    }

    const data = new FormData();
    data.append('sold', bool)
    request.send(data)
}