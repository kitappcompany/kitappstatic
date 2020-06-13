// owlCarusel
$('.carousel2').owlCarousel({
    loop:true,
    margin:10,

    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:2
        }
    }
})
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText: [$('.arrow-left'),$('.arrow-right')],
    dots:false,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:2
        },
        800:{
            items:3
        },
        1000:{
            items:5
        },
        1200:{
            items:6
        }
    }
})
$('.owl-nav').removeClass('disabled');

$('.owl-nav').click(function(event) {
    $(this).removeClass('disabled');
  });



// en çox baxilanlar - en yeni elanlar
let newAdBook = document.querySelector(".new-ad-book"), mostViewedBook = document.querySelector(".most-viewed-book");
newAdBook.onclick = function(){
        newAdBook.style.color = "#5AB5F1";
        mostViewedBook.style.color = "#686868";
}
mostViewedBook.onclick = function(){
    newAdBook.style.color = "#686868";
    mostViewedBook.style.color = "#5AB5F1";
}

// download-page
// let downloadPage = document.querySelector("#download-page"),bodyScroll = document.querySelector("body");
// window.onload = function(){
//     downloadPage.style.display = "none";
//     bodyScroll.style.overflowY = "scroll";

// }
//
// setTimeout(function(){
//     downloadPage.style.display = "none";
// },3000)
