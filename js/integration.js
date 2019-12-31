
function logged_in_header() {


    let elanlar = document.querySelector('.elanlar'),
    settings = document.querySelector('.settings'),
    logout = document.querySelector('.logout'),

    bookmarkIcon = document.querySelectorAll('.bookmark-icon'),
    placeBook = document.querySelectorAll('.place-book');

    elanlar.onclick = function(){
        location.href='/accounts/myposts';
    }

    settings.onclick = function(){
        location.href='/accounts/profile-complete';
    }

    logout.onclick = function(){
        location.href='/accounts-api/logout';
    }

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