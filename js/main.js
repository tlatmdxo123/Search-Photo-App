import App from "./App.js";
var firebaseConfig = {
  apiKey: "AIzaSyDrJZ8KxVUgpSsVFmOCKJchjrcPYUUWPzs",
  authDomain: "search-photo-app.firebaseapp.com",
  projectId: "search-photo-app",
  storageBucket: "search-photo-app.appspot.com",
  messagingSenderId: "625014265314",
  appId: "1:625014265314:web:85682e35b332ef4b3855bb",
  measurementId: "G-ZWXL5CXG1P",
};

firebase.initializeApp(firebaseConfig);

new App();
