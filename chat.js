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

var socket, incoming=true;

function messageMsg(slug) {
    try {
        socket.close()
    } catch (e) {
        console.log(e, "catch")
    }
    // body...
    endpoint = "wss://" + window.location.host + "/chatMsg/" + slug;
    socket = new WebSocket(endpoint);

    socket.open = function (e) {
        // body...
    }
    socket.onmessage = function (e) {
        // body...

        var d = new Date();
        if (incoming) {
            writeMessages.innerHTML += '<div class="incoming-div clearfix">' +
            '<p class="incoming-message">' + e["data"] + '</p>' +
            '<p class="incoming-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
            '</div>';

        }else{
            writeMessages.innerHTML += '<div class="outgoing-div clearfix">' +
            '<p class="outgoing-message float-right">' + e["data"] + '</p>' +
            '<p class="outgoing-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
            '</div>';

            incoming = true;
        }
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

function chatRoomHandler() {
    // body...
    endpoint = "wss://" + window.location.host + "/chatRoomHandler/";
    let socketChatRoomHandler = new WebSocket(endpoint)
    let temp;
    socketChatRoomHandler.onopen = data=>{
        console.log(data, "open")
        temp = Handlebars.compile(document.querySelector("#msg-item").innerHTML);
        socketChatRoomHandler.send({"type":1, "help_text":"query chat room"})
    }

    socketChatRoomHandler.onmessage = data =>{
        console.log(data, "recive")
        json_data = JSON.parse(data["data"])
        // if first time to load
        document.querySelector("#messages .messages").innerHTML += temp({"chat_room":json_data, "user_email":document.querySelector("#user_email").value});

    }
}