Handlebars.registerHelper('if_value', function (a, b) {
	if (a === b ) return true
  	else return false
})

function messageStart() {
    wsStart = 'wss://'
    let textArea   = document.querySelector("#message-input");
    endpoint = wsStart + window.location.host + "/chatStart/" + textArea.dataset.slug;
    let socket = new WebSocket(endpoint);
    let data   = JSON.stringify({"text":textArea.value})
    socket.onopen = function (e) {
        socket.send(data)
        // body...
    }
    socket.onmessage = function (e) {
        // body...
        socket.close()
        console.log("onmessage", e)
    }
    socket.onclose = function (e) {
        // body...
        console.log("close", e)
    }
    socket.onerror = function (e) {
        // body...
        console.log("error", e)
    }
}

var socket, incoming=true, user_email= document.querySelector("#user_email").value;

function messageMsg(slug) {
    try {
        socket.close()
    } catch (e) {
        console.log(e, "catch")
    }
    // body...
    endpoint = "wss://" + window.location.host + "/chatMsg/" + slug;
    socket = new WebSocket(endpoint);

    socket.onopen = function (e) {
        // body...
        let previous_msgs = JSON.stringify({
            "type":1, "text":"No Message"
        })
        socket.send(previous_msgs)
    }
    socket.onmessage = function (e) {
        // body...
        const response = JSON.parse(e["data"]);
        const res = response["res"]
        if (response["type"] === 1) { // if response is for request sent from onopen
            writeMessages.innerHTML = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i]["msg_type"]) {
                    if (res[i]["sender"]["email"] != user_email) {
                        writeMessages.innerHTML += '<div class="incoming-div clearfix">' +
                        '<p class="incoming-message">' +res[i]["data"] + '</p>' +
                        '<p class="incoming-date">' + res[i]["timestamp"] +'</p>' +
                        '</div>';
                    }
                    else{
                        writeMessages.innerHTML += '<div class="outgoing-div clearfix">' +
                        '<p class="outgoing-message float-right">' + res[i]["data"] + '</p>' +
                        '<p class="outgoing-date">' + res[i]["timestamp"] +'</p>' +
                        '</div>';
                    }
                }
            }

            // mesajlasmadaki scrolun asaqidan baslamasi
            $(document).ready(function() {
                $(".write-messages").animate({
                    scrollTop: $(
                    '.write-messages').get(0).scrollHeight
                }, 100);
            });
            paddingBottom();

            return
        }
        var d = new Date();
        if (incoming) {
            writeMessages.innerHTML += '<div class="incoming-div clearfix">' +
            '<p class="incoming-message">' + res + '</p>' +
            '<p class="incoming-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
            '</div>';

        }else{
            writeMessages.innerHTML += '<div class="outgoing-div clearfix">' +
            '<p class="outgoing-message float-right">' + res + '</p>' +
            '<p class="outgoing-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
            '</div>';

            incoming = true;
        }

        // mesajlasmadaki scrolun asaqidan baslamasi
        $(document).ready(function() {
            $(".write-messages").animate({
                scrollTop: $(
                '.write-messages').get(0).scrollHeight
            }, 100);
        });
        paddingBottom();

    }

    socket.onclose = function (e) {
        // body...
        console.log("close", e)
    }

    socket.onerror = function (e) {
        // body...
        console.log("error", e)
    }
}

function chatRoomHandler() {
    // body...
    endpoint = "wss://" + window.location.host + "/chatRoomHandler/";
    let socketChatRoomHandler = new WebSocket(endpoint)
    let temp;
    socketChatRoomHandler.onopen = data=>{
        temp = Handlebars.compile(document.querySelector("#msg-item").innerHTML);
        socketChatRoomHandler.send({"type":1, "help_text":"query chat room"})
    }

    socketChatRoomHandler.onmessage = data =>{
        json_data = JSON.parse(data["data"])
        // if first time to load
        document.querySelector("#messages .messages").innerHTML += temp({"chat_room":json_data, "user_email":document.querySelector("#user_email").value});

    }
}