function messageStart(reciverEmail, book_id) {
    wsStart = 'ws://'
    if (true) {
        wsStart = 'wss://'
    }
    endpoint = wsStart + window.location.host + "/chatSocket";
    let socket = new WebSocket(endpoint);
    let text   = document.querySelector("#message-input").value;
    socket.onopen = function (e) {
        socket.send(JSON.stringify({"reciver":reciverEmail, "book":book_id, "text":text}))
        // body...
        socket.close()
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