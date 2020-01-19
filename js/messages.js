let notSelectedMessage = document.querySelector('.not-selected-message'),
selectedMessage = document.querySelector('.selected-message');

let beforeMessage = '';
function hoverMessage(message){
    newMessageItemNot(message);
     // mesajlasmadaki scrolun asaqidan baslamasi
     $(document).ready(function() {
         $(".write-messages").animate({
             scrollTop: $(
            '.write-messages').get(0).scrollHeight
        }, 1000);
    });
    if(beforeMessage != ''){
        beforeMessage.style.borderRight = '0';
    }
    message.style.borderRight = ".4rem solid #5EB3F1";
    beforeMessage = message;
    // yeni mesaj sayini 0 lamaq
    message.children[1].textContent = '0';
    message.children[1].style.display = 'none';
    // her hansi mesaja click olunanda hemin shexsin mesajlarinin acilmasi
    notSelectedMessage.style.display = "none";
    selectedMessage.style.display = "block";
}





let messagesItem = document.querySelectorAll('.messages-item'),
ownerNameMessage = document.querySelectorAll('.owner-name-message'),
lastMessage = document.querySelectorAll('.last-message'),
newMessageCount = document.querySelectorAll('.new-message-count'),
manIcon = document.querySelectorAll('.man-icon');

function for_ui() {
    // body...
    for(let i = 0;i < newMessageCount.length;i++){
            checkNewMessageZero(i);
    }

    for(let i = 0;i < lastMessage.length;i++){
        lastMessage[i].textContent = lastMessage[i].textContent.slice(0, 55);
        if(lastMessage[i].textContent.length > 54)
        lastMessage[i].textContent += '...';
    }
}


function checkNewMessageZero(i){
    if(newMessageCount[i].textContent != '0'){
        newMessageCount[i].style.display = 'flex';
        newMessageItem(i);
    }
}



function checkLastMessageLength(i){
        lastMessage[i].textContent = lastMessage[i].textContent.slice(0, 55);
        if(lastMessage[i].textContent.length > 54)
        lastMessage[i].textContent += '...';
}
// yeni mesajin geldiyini 3 saniyeden b=1 yoxlamaq ve sonuncu mesajin uzunlugunun yoxlanilmasi


function newMessageItem(i){
    messagesItem[i].style.background = "#5CB4F1";
    ownerNameMessage[i].style.fontFamily = "DINPro-Bold";
    ownerNameMessage[i].style.color = "#fff";
    lastMessage[i].style.fontFamily = "DINPro-Medium";
    lastMessage[i].style.color = "#fff";
    manIcon[i].setAttribute('src',"https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic/icons/man-white.svg");
}
function newMessageItemNot(message){
    message.style.background = "#fff";
    message.children[0].children[1].children[0].style.fontFamily = "DINPro-Medium";
    message.children[0].children[1].children[0].style.color = "#686868";
    message.children[0].children[1].children[1].style.fontFamily = "DINPro";
    message.children[0].children[1].children[1].style.color = "#B5B5B5";
    message.children[0].children[0].children[0].setAttribute('src',"https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@86533c246ffefcf391a9c56d7ba6e19954728e9a/icons/man-black.svg");
}


// mesajlara  click olunmasi
// for(let i = 0;i < messagesItem.length;i++){
//     messagesItem[i].onclick = function(){
//         clickMessages();
//         messagesItem[i].style.background = "#5CB4F1";
//         ownerNameMessage[i].style.fontFamily = "DINPro-Bold";
//         ownerNameMessage[i].style.color = "#fff";
//         lastMessage[i].style.fontFamily = "DINPro-Medium";
//         lastMessage[i].style.color = "#fff";
//         lastMessageDate[i].style.color = "#fff";
//         manIcon[i].setAttribute('src',"icons/man-white.svg");
//         // her hansi mesaja click olunanda hemin shexsin mesajlarinin acilmasi
//         notSelectedMessage.style.display = "none";
//         selectedMessage.style.display = "block";

        // // mesajlasmadaki scrolun asaqidan baslamasi
        // $(document).ready(function() {
        //     $(".write-messages").animate({
        //         scrollTop: $(
        //         '.write-messages').get(0).scrollHeight
        //     }, 1000);
        // });
//     }
// }

// // mesajlarin click olunmasinin legv olunmasi
// function clickMessages (){
//     for(let i = 0;i < messagesItem.length;i++){
//         messagesItem[i].style.background = "#fff";
//         ownerNameMessage[i].style.fontFamily = "DINPro-Medium";
//         ownerNameMessage[i].style.color = "#686868";
//         lastMessage[i].style.fontFamily = "DINPro";
//         lastMessage[i].style.color = "#B5B5B5";
//         lastMessageDate[i].style.color = "#B5B5B5";
//         manIcon[i].setAttribute('src',"icons/man-black.svg")
//     }
// }


