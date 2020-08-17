function readURL1(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image1').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }

    }
function readURL2(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image2').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }

    }
function readURL3(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image3').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }

    }
function readURL4(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image4').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }


    }

function uploadImage() {
    // cercivenin olcusunun deyismesi
    let clickUpload = document.querySelectorAll(".click-upload"),checkClicked = document.querySelectorAll('.check-click'),absolute = document.querySelectorAll('.absolute'),
    closeImage = document.querySelectorAll(".close-image"),uploadImage = document.querySelectorAll('.upload-image');
    for(let i = 0;i < checkClicked.length;i++)[
        clickUpload[i].onclick = function(){
            checkClicked[i].classList.remove('upload-container');
            checkClicked[i].classList.add('downloaded');
            absolute[i].style.display = "none";
            closeImage[i].style.display = "block";
        }
    ]
    for(let i = 0; i < closeImage.length;i++){
        closeImage[i].onclick = function(){
            closeImage[i].style.display = "none";
            checkClicked[i].classList.remove('downloaded');
            checkClicked[i].classList.add('upload-container');
            absolute[i].style.display = "block";
            uploadImage[i].setAttribute('src','');

            // UPDATE
             uploadImage[i].parentElement.querySelector('input').dataset.src='';
        }
    }
}