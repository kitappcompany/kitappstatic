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

function MsgRooms(user, url = "/chat-api/chatrooms") {
    // body...
    if (url === null) {
        return
    }

    const request = new XMLHttpRequest();
    request.open("GET", url, true)
    request.setRequestHeader("Authorization", "Token " + user)

    request.onload = ()=>{
        const temp = Handlebars.compile(document.querySelector("#msg-item").innerHTML);
        res = JSON.parse(request.responseText)
        document.querySelector("#messages .messages").innerHTML = temp({"chat_room":{"owner":res[0]["seller"], "pk":res[0]["id"]}})
        console.log(res)
    }

    request.send()
}