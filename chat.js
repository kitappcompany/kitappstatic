function messageStart() {
    wsStart = 'ws://'
    if (true) {
        wsStart = 'wss://'
    }
    endpoint = wsStart + window.location.host + "/chatSocket";
    let socket = new WebSocket(endpoint);
    let textArea   = document.querySelector("#message-input");
    let data   = JSON.stringify({"reciver":textArea.dataset.reciveremail, "book":textArea.dataset.bookid, "text":textArea.value})
    socket.onopen = function (e) {
        socket.send(data)
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