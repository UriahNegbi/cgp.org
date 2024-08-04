import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

// Function to log in the user
function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      // Set a cookie with the user UID
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (3600 * 1000)); // 1 hour
      const expires = `expires=${expirationDate.toUTCString()}`;
      document.cookie = `session=${uid}; ${expires}; path=/`;

      // Hide error message on successful login
      document.getElementById("errorSignIn").hidden = true;

      window.location.href = "AfterLogIn/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error logging in:', errorCode, errorMessage);

      // Show error message on failed login
      document.getElementById("errorSignIn").hidden = false;
    });
}

// Event listener for form submission
document.getElementById('authForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const {email, password} = emailPassworldAuth();
  if (email && password) {
    logIn(email, password);
  } else {
    console.error('Email or password is missing');
    document.getElementById("errorSignIn").hidden = false;
    document.getElementById("errorSignIn").textContent = 'Please enter both email and password';
  }
});


function emailPassworldAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  return { email, password };
}
