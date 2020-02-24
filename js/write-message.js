let writeMessages = document.querySelector('.write-messages'),
messageInput = document.querySelector('.message-input'),
messageButton = document.querySelector('.message-button');
let messageBottomPadding = document.querySelectorAll('.incoming-message, .outgoing-message')
messageButton.onclick = function(){
    var d = new Date();
    if(messageInput.value != ''){
        incoming = false; // it is outgoing msg ,in chat.js
        let pk = "pk" + new Date().getUTCMilliseconds();
        message = JSON.stringify({
            "type":2,
            "text":messageInput.value,
            "pk":pk,
        })


        // show outgoing msg user but Wait svg
        writeMessages.innerHTML += '<div id="' + pk + '" class="outgoing-div clearfix">' +
            '<p class="outgoing-message float-right">' + message + '</p>' +
            '<p class="outgoing-date" style = "display:none;">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
             '<img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/message-wait.svg" alt="" class="message-wait">' +
            '</div>';

        socket.send(message) //socket in chat.js
        messageInput.value = '';

    }
}

document.querySelector('.message-input').addEventListener('keydown',function(event){
    if(event.keyCode == 13){
        incoming = false; // it is outgoing msg ,in chat.js
        let pk = "pk" + new Date().getUTCMilliseconds();
         message = JSON.stringify({
            "type":2,
            "text":messageInput.value,
            "pk":pk,
        })

        // show outgoing msg user but Wait svg
        writeMessages.innerHTML += '<div id="' + pk + '" class="outgoing-div clearfix">' +
            '<p class="outgoing-message float-right">' + message + '</p>' +
            '<p class="outgoing-date" style = "display:none;">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
             '<img src="https://cdn.jsdelivr.net/gh/kitappcompany/kitappstatic@latest/icons/message-wait.svg" alt="" class="message-wait">' +
            '</div>';


        socket.send(message) //socket in chat.js
        messageInput.value = '';
        messageInput.style.height = "4.6rem";
    }
}); // send with enter

messageInput.oninput = function(){
    plasLineHeight();
}

// laynin hundurluyunu artirmaq
function plasLineHeight(){
    let hiddenDiv = document.querySelector('.hidden-div');
    hiddenDiv.innerHTML = messageInput.value;
    if(hiddenDiv.clientWidth < 210){
        messageInput.style.height = "4.6rem"
    }
    if(hiddenDiv.clientWidth > 210){
        messageInput.style.height = "7rem"
    }
    if(hiddenDiv.clientWidth > 410){
        messageInput.style.height = "9.5rem"
    }
    if(hiddenDiv.clientWidth > 610){
        messageInput.style.height = "11rem"
    }
}

// mesajlasmadaki scrolun asaqidan baslamasi
$(document).ready(function() {
    $(".write-messages").animate({
        scrollTop: $(
          '.write-messages').get(0).scrollHeight
    }, 1000);
});

