
function loadmore() {
    // load more -- loading
    let loadMore = document.querySelectorAll(".load-more"), loadingBar = document.querySelectorAll(".loading-bar");
    for(let i = 0;i < loadingBar.length;i++){
        loadMore[i].onclick = function(){
            loadingBar[i].style.display = "block";
            loadMore[i].style.display = "none";
            if (i === 0) {
                BooksList()
            }
        }
    }
}//function end
