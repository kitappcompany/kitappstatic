

    let mobileBookPopup = document.querySelector("#popup");

    function mobileBookDetails(id){

        let windowWidth = window.innerWidth;

        if(windowWidth <= 576){
            mobileBookPopup.style.display = "block";
            bookdetail(id, mobileBookPopup);

        }

    }



    // Axtarilan kitaplar ucun

    let mobileSearchBookPopup = document.querySelector("#search-popup");

    function mobileSearchBookDetails(){

        let windowWidth = window.innerWidth;

        if(windowWidth <= 576){
            mobileSearchBookPopup.style.display = "block";
        }

    }