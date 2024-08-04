import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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

document.getElementById('errorSignIn').hidden = true

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      console.log('User signed up:', user);
      alert('signUP aprove')
      window.location.href = "logIn.html";
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error signing up:', errorCode, errorMessage);
      document.getElementById('errorSignIn').hidden = false
    });
}


document.getElementById('authForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signUp(email, password);
});
