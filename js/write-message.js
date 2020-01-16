let writeMessages = document.querySelector('.write-messages'),
messageInput = document.querySelector('.message-input'),
messageButton = document.querySelector('.message-button');
let messageBottomPadding = document.querySelectorAll('.incoming-message, .outgoing-message')
messageButton.onclick = function(){
    var d = new Date();
    if(messageInput.value != ''){
        writeMessages.innerHTML += '<div class="outgoing-div clearfix">' +
        '<p class="outgoing-message float-right">' + messageInput.value + '</p>' +
        '<p class="outgoing-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
        '</div>';
        message = JSON.stringify({
            "text":messageInput.value,
        })
        socket.send(message)
        messageInput.value = '';
        // mesajlasmadaki scrolun asaqidan baslamasi
        $(document).ready(function() {
            $(".write-messages").animate({
                scrollTop: $(
                '.write-messages').get(0).scrollHeight
            }, 100);
        });
        paddingBottom();
    }
}


// mesajlasmadaki scrolun asaqidan baslamasi
$(document).ready(function() {
    $(".write-messages").animate({
        scrollTop: $(
          '.write-messages').get(0).scrollHeight
    }, 1000);
});

// eger mesaj 40 simvoldan azdirsa padding bottomu artit
paddingBottom();
function paddingBottom(){
    messageBottomPadding = document.querySelectorAll('.incoming-message, .outgoing-message')
    for(let i = 0;i < messageBottomPadding.length;i++){
        if(messageBottomPadding[i].textContent.length < 40){
            messageBottomPadding[i].style.paddingBottom = "2.4rem";
        }
    }
}