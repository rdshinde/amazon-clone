// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF4Pq9u5CeeOfTDkvn85S_yJdqChklpwI",
  authDomain: "clone-6accd.firebaseapp.com",
  projectId: "clone-6accd",
  storageBucket: "clone-6accd.appspot.com",
  messagingSenderId: "548244516739",
  appId: "1:548244516739:web:0a27e703f651ec67ca90b6",
  measurementId: "G-RC5QFBWCHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// var db = firebase.firestore();
const db = getFirestore();
export{db};