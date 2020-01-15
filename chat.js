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
    let socketChatRoomHandler = WebSocket(endpoint)

    socketChatRoomHandler.onopen = data=>{
        console.log(data, "open")
    }

    socketChatRoomHandler.onmessage = data =>{
        console.log(data, "recive")
    }
}