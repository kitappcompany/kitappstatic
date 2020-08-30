var radioBtnOnclick = false; // when forgive, get value in other js
function ad_place() {

    let lookingBookH = document.querySelector('.looking-book-h'),
    sellBookH = document.querySelector('.sell-book-h'),
    lookingBook = document.querySelector('#looking-book'),
    sellBook = document.querySelector('#sell-book');

    lookingBookH.onclick = function(){
        lookingBookH.style.borderBottom = ".2rem solid #686868";
        lookingBookH.style.fontFamily = "DINPro-Medium";
        sellBookH.style.borderBottom = ".1rem solid #B5B5B5";
        sellBookH.style.fontFamily = "DINPro";
        lookingBookH.children[0].style.color = "#686868";
        sellBookH.children[0].style.color = "#B5B5B5";
        sellBook.style.display = "none";
        lookingBook.style.display = "block";
    }

    sellBookH.onclick = function(){
        sellBookH.style.borderBottom = ".2rem solid #686868";
        sellBookH.style.fontFamily = "DINPro-Medium";
        lookingBookH.style.borderBottom = ".1rem solid #B5B5B5";
        lookingBookH.style.fontFamily = "DINPro";
        sellBookH.children[0].style.color = "#686868";
        lookingBookH.children[0].style.color = "#B5B5B5";
        sellBook.style.display = "block";
        lookingBook.style.display = "none";
    }
    // radio button
    let radioButton = document.querySelector(".radio-button"), radioContent = document.querySelector('.radio-content'),checkRadio = false;
    radioButton.onclick = function(){
         let bookValue = document.querySelector('.book-value')
        if(!checkRadio){
            radioContent.style.display = "inline-block";
            checkRadio = true;
            radioBtnOnclick = true
            bookValue.disabled = true;
            document.getElementsByName("sell_price")[0].value = 0;
        }
        else{
            radioContent.style.display = "none";
            checkRadio = false;
            radioBtnOnclick = false
            bookValue.disabled = false;

        }
    }
}
