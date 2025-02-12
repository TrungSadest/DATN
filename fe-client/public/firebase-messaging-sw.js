// Thêm bộ xử lý sự kiện 'notificationclick' ngay từ đầu
self.addEventListener('notificationclick', function (event) {
  console.log('event', event);
  event.notification.close(); // Đóng thông báo
  console.log(event.notification.data.FCM_MSG.data.click_action);
  const url = event.notification.data.FCM_MSG.data.click_action; // Lấy URL từ dữ liệu thông báo
  console.log('url', url);
  if (url) {
    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
        })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url === '/' && 'focus' in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow(url);
        })
    );
  }
});

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyB7VLvOYM8SkZQykjnD3FHENXksb5jqU7k',
  authDomain: 'smart-prediction.firebaseapp.com',
  projectId: 'smart-prediction',
  storageBucket: 'smart-prediction.appspot.com',
  messagingSenderId: '49436463594',
  appId: '1:49436463594:web:5839d044e3b1e5dcc66293',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
