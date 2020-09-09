// owlCarusel
jQuery_3_4_1('.carousel2').owlCarousel({
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
jQuery_3_4_1('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText: [jQuery_3_4_1('.arrow-left'),jQuery_3_4_1('.arrow-right')],
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
jQuery_3_4_1('.owl-nav').removeClass('disabled');

jQuery_3_4_1('.owl-nav').click(function(event) {
    jQuery_3_4_1(this).removeClass('disabled');
  });



// en çox baxilanlar - en yeni elanlar
let newAdBook = document.querySelector(".new-ad-book"), mostViewedBook = document.querySelector(".most-viewed-book"),
    newAdBooks = document.querySelector(".new-ad-books"), mostViewedBooks = document.querySelector(".most-viewed-books");
newAdBook.onclick = function(){
        newAdBook.style.color = "#5AB5F1";
        mostViewedBook.style.color = "#686868";

        newAdBooks.style.display = "block";
        mostViewedBooks.style.display = "none";
}
mostViewedBook.onclick = function(){
    newAdBook.style.color = "#686868";
    mostViewedBook.style.color = "#5AB5F1";

    newAdBooks.style.display = "none";
    mostViewedBooks.style.display = "block";
}
