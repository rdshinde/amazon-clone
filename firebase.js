import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDkE8fDr-ScIB4kKXWVuem-1JPA_NzBXAY",
authDomain: "clone-c7def.firebaseapp.com",
projectId: "clone-c7def",
storageBucket: "clone-c7def.appspot.com",
messagingSenderId: "385018069116",
appId: "1:385018069116:web:a80bcec2a416232fe0c9f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// var db = firebase.firestore();
var db = getFirestore(app);