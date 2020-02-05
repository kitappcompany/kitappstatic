if (Notification.permission === 'granted') {
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
    // if granted just run on message no need to get permission again
    fcm_onmessage(messaging);
}

function fcm_onmessage(messaging){
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage((payload) => {

        document.querySelector('.not-count').innerHTML = payload['data']['unread_chat_rooms']

    });
}
