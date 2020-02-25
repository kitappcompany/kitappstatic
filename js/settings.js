function addReadonly(i){
        favoriteGenreClose();
        inputContainer[i].style.border = "none";
        inputFocus[i].setAttribute("readonly","readonly");
        pencilPosition[i].style.display = "block";
        inputFocus[i].style.color = "#B5B5B5";
    }

function removeReadonly(i){
        inputContainer[i].style.border = ".1rem solid #707070";
        inputFocus[i].style.color = "#686868";
        inputFocus[i].removeAttribute('readonly');
        pencilPosition[i].style.display = "none";

    }

function favoriteGenreClose(){
        genres.classList.remove('d-block');
        genres.classList.add("d-none");
        genrePencil.style.display = "block";
        // qelemin displayi none olmur bax
    }

function favoriteGenreOpen(){
        genres.classList.remove('d-none');
        genres.classList.add("d-block");
        genrePencil.style.display = "none";
    }

function settings_js(argument) {

    var pencilAll = document.querySelectorAll('.settings-container .pencil-position'),
    inputContainer = document.querySelectorAll('.settings-container .input-container'),
    inputFocus = document.querySelectorAll('.settings-container .input-focus'),
    pencilPosition = document.querySelectorAll('.settings-container .pencil-position'),
    replyPasswordContainer = document.querySelector('.replypassword-container');
    favoriteGenreItem = document.querySelectorAll('.favorite-genre-item'),
    genrePencil = document.querySelector('.genre-pencil');
    for(let i = 0;i < favoriteGenreItem.length;i++){
        if(i%2==1) favoriteGenreItem[i].style.width = "25.5rem";
        if((i+1)%5==0) favoriteGenreItem[i].style.marginRight = "0";
    }

    for(let i = 0;i < pencilAll.length;i++){
        pencilAll[i].onclick = function(){
            for(let j = 0;j < inputFocus.length;j++) addReadonly(j);
            removeReadonly(i);
            if(i==3) replyPasswordContainer.style.display = "block";
            else replyPasswordContainer.style.display = "none";
        }
    }


    genres = document.querySelector('.genres');

    genrePencil.onclick = function(){
        for(let j = 0;j < inputFocus.length;j++) addReadonly(j);
        favoriteGenreOpen();
    }

}