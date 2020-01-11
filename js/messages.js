let notSelectedMessage = document.querySelector('.not-selected-message'),
selectedMessage = document.querySelector('.selected-message');

let beforeMessage = '';
function hoverMessage(message){
    if(beforeMessage != ''){
        beforeMessage.style.borderRight = '0';
    }
    message.style.borderRight = ".4rem solid #5EB3F1";
    beforeMessage = message;
    // her hansi mesaja click olunanda hemin shexsin mesajlarinin acilmasi
    notSelectedMessage.style.display = "none";
    selectedMessage.style.display = "block";
}

















// let messagesItem = document.querySelectorAll('.messages-item'),
// ownerNameMessage = document.querySelectorAll('.owner-name-message'),
// lastMessage = document.querySelectorAll('.last-message'),
// lastMessageDate = document.querySelectorAll('.last-message-date'),
// manIcon = document.querySelectorAll('.man-icon');
// let notSelectedMessage = document.querySelector('.not-selected-message'),
// selectedMessage = document.querySelector('.selected-message');

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
        
//         // mesajlasmadaki scrolun asaqidan baslamasi
//         $(document).ready(function() {  
//             $(".write-messages").animate({ 
//                 scrollTop: $( 
//                 '.write-messages').get(0).scrollHeight 
//             }, 1000); 
//         }); 
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


