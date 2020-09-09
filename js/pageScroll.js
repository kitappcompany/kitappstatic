function goToBack(){
    window.scrollTo(0, 0);
}

window.addEventListener("scroll",function(){
    if(window.scrollY != 0) document.querySelector(".go-to-back").style.display = "flex";
    else document.querySelector(".go-to-back").style.display = "none";
});