function popupchangeimage(images) {
    popupBook = document.querySelector('.popup-book'),
    leftClick = document.querySelector('.left-img'),
    rightClick = document.querySelector('.right-img'),
    checkNum  = 0;

    rightClick.onclick = function(){
        if(checkNum != images.length-1) checkNum++;
        popupBook.setAttribute('src',images[checkNum]);
        if(checkNum == images.length-1) rightClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/right-pale.svg');
        if(checkNum != 0 && checkNum != images.length-1){
            leftClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/left.svg');
            rightClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/right.svg');
        }
    }

    leftClick.onclick = function(){
        if(checkNum != 0) checkNum--;
        popupBook.setAttribute('src',images[checkNum]);
        if(checkNum == 0) leftClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/left-pale.svg');
        if(checkNum != 0 && checkNum != images.length-1){
            leftClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/left.svg');
            rightClick.setAttribute('src','https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/right.svg');
        }
    }

}