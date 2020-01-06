function message() {
    wsStart = 'ws://'
    if (true) {
        wsStart = 'wss://'
    }
    endpoint = wsStart + window.location.host + "chatSocket";
    let socket = new WebSocket(endpoint);

    socket.onopen = function (e) {
        // body...
        console.log("open", e)
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