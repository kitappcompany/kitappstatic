function check_price_zero() {

    // satis qiymeti 0 olduqda rengin #B5B5B5 olmasi
    let price = document.querySelectorAll('.price'),
    money = document.querySelectorAll('.money');

    for(let i = 0;i < price.length;i++){
        if(price[i].textContent == '0'){
            money[i].style.color = '#B5B5B5';
            price[i].style.color = '#B5B5B5';
        }
    }
}