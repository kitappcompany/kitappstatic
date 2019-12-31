function genres_js() {
    let genresItem = document.querySelectorAll('.genres-item'),
    genresContent = document.querySelectorAll('.genres-content'),
    checkGenres = [];
    let favoriteGenre = document.querySelector('.favorite-genre'),
    favoriteGenreItem = document.querySelectorAll('.favorite-genre-item');
    let genreClose = document.querySelectorAll('.genre-close');
    var genreContent = document.querySelectorAll('.genre-content');
    let genres = document.querySelector('.genres');

    var inGenres = document.querySelectorAll('input[name="user_interests"]');

    for(let i = 0;i < genresItem.length;i++) checkGenres[i] = false;

    for(let i = 0;i < genresContent.length;i++){
        for(let j = 0;j < inGenres.length;j++){
            if(genresContent[i].parentElement.querySelector('input').value == inGenres[j].value) clickBlue(i);
        }
    }

    // click olunma janrlara
    for(let i = 0;i < genresItem.length;i++){
        genresItem[i].onclick = function(){
            if(!checkGenres[i]){
                clickBlue(i);
            }
            else{
                clickWhite(i);
            }
        }
    }

    // arxa fonnu mavi elemek
    function clickBlue(i){
        genresItem[i].style.background = "#5EB3F1";
        genresContent[i].style.color = "#fff";
        addFavorite(i)
        checkGenres[i] = !checkGenres[i];

    }
    // arxa fonnu ag elemey
    function clickWhite(i){
        genresItem[i].style.background = "#fff";
        genresContent[i].style.color = "#686868";
        removeFavorite(i);
        checkGenres[i] = !checkGenres[i];

    }


    // 160px 255px

    // favoritlere elave elemey
    function addFavorite(i){
        favoriteGenre.innerHTML += '<div class="favorite-genre-item py-3">' +
        '<span class="genre-content">' +
        genresContent[i].textContent +
        '</span>' +
        '<img src="/static/icons/close.svg" alt="" class = "genre-close">' +
        '<input name="interests" type="hidden" value="'+ genresContent[i].parentElement.querySelector('input').value + '">'+ //added new
        '</div>';
    }
    // favoritleri silmey
    function removeFavorite(j){
        var favoriteGenreItem = document.querySelectorAll('.favorite-genre-item');
        for(let i = 0; i < favoriteGenreItem.length;i++){
            if(favoriteGenreItem[i].textContent == genresContent[j].textContent){
                favoriteGenreItem[i].remove();
            }
        }
    }

    // closeye click olunanda favoritin silinmesi
    setInterval(function(){
        genreClose = document.querySelectorAll('.genre-close');
        favoriteGenreItem = document.querySelectorAll('.favorite-genre-item');
        genreContent = document.querySelectorAll('.genre-content');
        function width255px(i){
            if((i%5)%2==1) favoriteGenreItem[i].style.width = "25.5rem";
            else favoriteGenreItem[i].style.width = "16rem";
            if((i+1)%5==0) favoriteGenreItem[i].style.marginRight = "0";
            else favoriteGenreItem[i].style.marginRight = "2.7rem";
        }
        if(genreClose.length > 0){
            genres.style.borderTop = ".1rem solid #B5B5B5";
            for(let i = 0;i < genreClose.length;i++){
                genreClose[i].onclick = function(){
                    for(let j = 0;j < genresItem.length;j++){
                        if(genreContent[i].textContent == genresContent[j].textContent){
                            clickWhite(j);
                        }
                    }
                }
            }
            for(let i = 0;i < genreClose.length;i++){
                width255px(i);
            }
        }
        else{
            genres.style.borderTop = "0";
        }
    },100);

}