function layouts_js() {

    // drop downun acilmasi
    let userIcon = document.querySelector(".user-icon"),
    userDropDown = document.querySelector(".user-dropdown"),
    checkUser = false;
    userIcon.onclick = function(){
        if(!checkUser){
            userDropDown.style.display = "block";
            checkUser = true;
        }
        else{
            userDropDown.style.display = "none";
            checkUser = false;
        }
    }
    let burgerButton = document.querySelector('#burger-menu-button'),
    burgerMenu = document.querySelector('#burger-menu'),
    burgerMenuClose = document.querySelector('.burger-menu-close'),
    burgerMenuList = document.querySelector('.burger-menu-list');

    burgerButton.onclick = function(){
        burgerMenu.style.width = "100%";
        setTimeout(function(){
            burgerMenuList.style.display = "inline-block";
        },150);
        setTimeout(function(){
            burgerMenuClose.style.display = "block";
        },500);
    }
    burgerMenuClose.onclick = function(){
        burgerMenu.style.width = "0";
        setTimeout(function(){
            burgerMenuList.style.display = "none";
        },350);
    }
    //end
}