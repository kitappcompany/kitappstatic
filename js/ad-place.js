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

let removeThisAdPopup = document.querySelector('.remove-this-ad-popup');

function showRemoveThisAdPopup(){
    removeThisAdPopup.classList.toggle("remove-this-ad-popup-active");
}

function delete_post(book_id){
    const request = new XMLHttpRequest();
    request.open("DELETE", "/accounts-api/mybooks/"+book_id+"/")
    try {
        //if user is authenticated
        let user_token = document.querySelector("#user_token").value
        request.setRequestHeader("Authorization", "Token " + user_token)}
    catch (e) {return}
    document.querySelector("#user-text").innerHTML = " Elan silinir ...";
    request.onload = ()=>{
        let res = JSON.parse(request.responseText)
        if(res['success'] == 1) {
            window.location.href = "/accounts/myposts";
            showRemoveThisAdPopup();
            return
        }
        document.querySelector("#user-text").innerHTML = "Elanı silmək istədiyinizə əminsiz?";
        showRemoveThisAdPopup();

    }

    request.send()
}
