
//firebase code below
const firebaseConfig = {
  apiKey: "AIzaSyBZNtdO4KHMUt7SM0MW6St-idoA4g0XJ9o",
  authDomain: "kitapp-notify.firebaseapp.com",
  databaseURL: "https://kitapp-notify.firebaseio.com",
  projectId: "kitapp-notify",
  storageBucket: "kitapp-notify.appspot.com",
  messagingSenderId: "919683070115",
  appId: "1:919683070115:web:08bfcd2e3c6e9683bee716"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

if (Notification.permission === 'granted') {
    // if granted just run on message no need to get permission again
    fcm_onmessage(messaging);
    updateToken(messaging);
}
else{
    // if not granted
    let div = `<div class="alert alert-primary row">
                <h4 class="col-11"> Bildirişlər bağlıdır. Yeni mesajlardan xəbərdar olmaq üçün bildirişləri aktiv edin. </h4>
                 <!-- Rounded switch -->
                 <label class="switch">
                      <input type="checkbox" onclick="enable_notification()">
                      <span class="slider round"></span>
                 </label>
            </div>`;
    document.querySelector("#Notification-on-off").innerHTML = div;

}

function enable_notification(){
    // Retrieve Firebase Messaging object.
    // if (!('serviceWorker' in navigator)) {
    //   // Service Worker isn't supported on this browser, disable or hide UI.
    //   return;
    // }

    if (!('Notification' in window)) {
      // Notification isn't supported on this browser, disable or hide UI.
      return;
    }

    if (Notification.permission === 'granted') {
        updateToken(messaging); // chack this user
        return
    }

    messaging.requestPermission()
    .then(function (){
        return messaging.getToken();
    })
    .then(function (token) {
        SendTokenToServer(token);
        fcm_onmessage(messaging);
        })
    .catch(function (err) {
        console.log(err)
    })
}

function fcm_onmessage(messaging){
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage((payload) => {

        try{
            // if chat room is already on page
            let msgDiv =  document.getElementById(payload['data']['id']);
            msgDiv.querySelector('.last-message').innerHTML = payload['data']['lastMsg']
            msgDiv.querySelector('.new-message-count').innerHTML = payload['data']['unread_msgs']
         }
        catch(e){
            // except create one new chat room
            let list = document.querySelector("#messages .messages");
            const temp = Handlebars.compile(document.querySelector("#msg-item").innerHTML);
            let customer = JSON.parse(payload["data"]['customer']);
            payload['data']['customer'] = customer ;
            payload['data']['seller'] = {"full_name":false, "email":document.querySelector("#user_email").value}
            list.insertAdjacentHTML("afterbegin",temp({"chat_room":[ payload['data'] ], "user_email":document.querySelector("#user_email").value}));
        }
        for_ui();

    });
}

function updateToken(messaging) {
    // body...
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Send Instance ID token to app server.
        sendTokenToServer(refreshedToken);
        // ...
      }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
      });
    });

}

function SendTokenToServer(token) {

    const request = new XMLHttpRequest();
    request.open("POST", "/chat-api/pushtoken", true)
    request.setRequestHeader("X-CSRFToken", document.getElementsByName("csrfmiddlewaretoken")[0].value)
    request.onload = ()=>{
        // console.log("response token", request.responseText)
    }
    const data = new FormData();
    data.append('registration_id',token)
    data.append('type', 'web')
    data.append("active", true)
    request.send(data)
}
