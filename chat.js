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

function messageMsg(slug) {
    // body...
    endpoint = "wss://" + window.location.host + "/chatMsg/" + slug;
    let socket = new WebSocket(endpoint);

    socket.open = function (e) {
        // body...
        console.log("onmessage", e)
    }
    socket.onmessage = function (e) {
        // body...
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