let iLokingH = document.querySelector(".i-looking-h"),
iSoldH = document.querySelector(".i-sold-h"),
bookISell = document.querySelector('.books-i-sell'),
bookILooking = document.querySelector('.books-i-looking');

iLokingH.addEventListener("click" , function(){
    iLokingH.style.borderBottom = ".2rem solid #686868";
    iLokingH.style.fontFamily = "DINPro-Medium";
    iSoldH.style.borderBottom = ".1rem solid #B5B5B5";
    iSoldH.style.fontFamily = "DINPro";
    iLokingH.children[0].style.color = "#686868";
    iSoldH.children[0].style.color = "#B5B5B5";

    bookISell.classList.add('d-none');
    bookILooking.classList.remove('d-none');
});

iSoldH.addEventListener("click" , function(){
    iSoldH.style.borderBottom = ".2rem solid #686868";
    iSoldH.style.fontFamily = "DINPro-Medium";
    iLokingH.style.borderBottom = ".1rem solid #B5B5B5";
    iLokingH.style.fontFamily = "DINPro";
    iSoldH.children[0].style.color = "#686868";
    iLokingH.children[0].style.color = "#B5B5B5";

    bookISell.classList.remove('d-none');
    bookILooking.classList.add('d-none');
});