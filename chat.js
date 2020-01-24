
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

// Message HTML below
Handlebars.registerHelper('if_value', function (a, b) {
	if (a === b ) return true
  	else return false
})

var socket, incoming=true, user_email= document.querySelector("#user_email").value, last_slug=false;

function messageMsg(slug, owner_name) {
    if (last_slug === slug) return;
    last_slug = slug;
    document.querySelector(".owner-name").innerHTML = owner_name;
    writeMessages.innerHTML = '<span class = "not-selected-message"> Mesajlar Yüklənir ... </span>';
    try {
        socket.close()
    } catch (e) {
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
        document.querySelector(".message-button").disabled = false;

    }
    socket.onmessage = function (e) {
        // body...
        const response = JSON.parse(e["data"]);
        const res = response["res"]

        // load previous messages type 1
        if (response["type"] === 1) { // if response is for request sent from onopen
            writeMessages.innerHTML = "";
            for (var i = 0; i < res.length; i++) {
                let d = new Date( `${res[i]["timestamp"]}` );
                if (res[i]["msg_type"]) {
                    if (res[i]["sender"]["email"] != user_email) {
                        writeMessages.innerHTML += '<div class="incoming-div clearfix">' +
                        '<p class="incoming-message">' +res[i]["data"] + '</p>' +
                        '<p class="incoming-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
                        '</div>';
                    }
                    else{
                        writeMessages.innerHTML += '<div class="outgoing-div clearfix">' +
                        '<p class="outgoing-message float-right">' + res[i]["data"] + '</p>' +
                        '<p class="outgoing-date">' + d.getHours() + ':' + d.getMinutes() +'</p>' +
                        '</div>';
                    }

                    if (i === res.length - 1) {//fill date of last msg  to top of msg template
                         document.querySelector(".date-container").innerHTML = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();
                     }
                }
                else{
                    let data = JSON.parse(res[i]["data"]);
                    //  <!-- sekil -->
                        writeMessages.innerHTML += '<div class="img-div">' +
                        '<div class="img-container">' +
                        '<img src="'+ data["img"] +'" alt="No Image">' +
                        '</div>'+
                        '</div>'

                    if (i === res.length - 1) {//fill date of last msg  to top of msg template
                         document.querySelector(".date-container").innerHTML = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();
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

        // load realtime messages type 2
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


        // if user read message type 2 send this info
        let messages_were_read = JSON.stringify({
            "type":3, "text":"messages_were_read"
        })
        socket.send(messages_were_read)

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
    const request = new XMLHttpRequest();
    request.open("GET", "/chat-api/chatrooms", true);
    const temp = Handlebars.compile(document.querySelector("#msg-item").innerHTML);
    request.onload = () =>{
        let data = JSON.parse(request.responseText);
        document.querySelector("#messages .messages").innerHTML += temp({"chat_room":data["results"], "user_email":document.querySelector("#user_email").value});
        for_ui() // design for new message
    }
    request.send()
}
