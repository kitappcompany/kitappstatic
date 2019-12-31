function add_place_popup(page=true, book_id=null) {
    let adPlaceButton = document.querySelectorAll('.ad-place-button'),
    adPlacePopup = document.querySelector('#ad-place-popup'),
    bgOpacity = document.querySelector('.bg-opacity');

    for(let i = 0;i< adPlaceButton.length;i++){
        adPlaceButton[i].onclick = function(){
            if (i===1) {//post book button
                if (page) {//for post a new book
                    PostABook(adPlacePopup, adPlaceButton[i]);// selling book vs searching
                }else{//for edit a book info
                    PostABook(adPlacePopup, adPlaceButton[i], "PATCH", "/accounts-api/mybooks/"+book_id + "/");// selling book vs searching
                }

            }
        }
    }
    bgOpacity.onclick = function(){
        adPlacePopup.style.display = "none";
    }
}