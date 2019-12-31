function header() {

    let bookmarkIcon = document.querySelectorAll('.bookmark-icon'),
    placeBook = document.querySelectorAll('.place-book');

    for(let i = 0;i < bookmarkIcon.length;i++){
        bookmarkIcon[i].onclick = function(){
            location.href='/accounts/bookmarks';
        }
    }

    for(let i = 0;i < placeBook.length;i++){
        placeBook[i].onclick = function(){
            location.href='/ad-place';
        }
    }

}