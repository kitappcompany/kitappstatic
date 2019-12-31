function i_sold_js() {

    // satildi buttonuna click olunduqda grey satildi buttonunun cixmasi
    let hasBeenSoldButton = document.querySelectorAll(".has-been-sold-button"),firstButtons = document.querySelectorAll(".first-buttons"),
    secondButton = document.querySelectorAll(".second-button"),bgB5B5B5 = document.querySelectorAll('.bg-B5B5B5');

    for(let i = 0 ;i < hasBeenSoldButton.length;i++){
        hasBeenSoldButton[i].onclick = function(){
            firstButtons[i].style.display = "none";
            secondButton[i].style.display = "block";
            bgB5B5B5[i].style.opacity = '.6';
        }
    }

}