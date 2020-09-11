function message_js() {

    let writeSeller = document.querySelector('.write-seller button'),
    bookPopup = document.querySelector("#popup"),
    messagePopup = document.querySelector('#message-popup'),
    messageClose = document.querySelector('.message-close'),
    bgOpacity = document.querySelector('.bg-opacity'),
    messageContainer = document.querySelector('.message-container'),
    sendedMessage = document.querySelector('#sended-message'),
    messageButton = document.querySelector('.message-button');
    writeSeller.onclick = function(){
        messagePopup.style.display = "block";
        bookPopup.style.display = "none";
    }
    messageButton.onclick = function(){
        messageContainer.style.display = "none";
        sendedMessage.style.display = "block";
        messageStart();// start messaging
        
        // HTML5 history API
        history.pushState(null ,null, "?" );
    }
    bgOpacity.onclick = function(){
        messagePopup.style.display = "none";
        messageContainer.style.display = "block";
        sendedMessage.style.display = "none";
        // HTML5 history API
        history.pushState(null ,null, "?" );
    }
    messageClose.onclick = function(){
        messagePopup.style.display = "none";
        // HTML5 history API
        history.pushState(null ,null, "?" );
    }

}
