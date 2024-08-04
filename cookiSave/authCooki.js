import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_83ChDMlRzZCeSauz__1W7sdJXwLuqDc",
    authDomain: "cgpdatabase2.firebaseapp.com",
    databaseURL: "https://cgpdatabase2-default-rtdb.firebaseio.com",
    projectId: "cgpdatabase2",
    storageBucket: "cgpdatabase2.appspot.com",
    messagingSenderId: "932466157102",
    appId: "1:932466157102:web:0d75b3d18a9fa0704e21bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

function checkSession() {
    const session = getCookie('session');
    if (session) {
        // Check if the session UID matches the logged-in user UID
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid === session) {
                // Session is valid, do nothing
                return;
            } else {
                // Invalid session, redirect to login page
                window.location.href = "../logIn.html";
            }
        });
    } else {
        // No session cookie found, redirect to login page
        window.location.href = "../logIn.html";
    }
}

document.addEventListener('DOMContentLoaded', checkSession);