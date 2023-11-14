import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"
import { feedbackData } from "./libs.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtZWZ7x8d1l2cTWgc-kFO5ZlzXV7dcPaM",
    authDomain: "infografis-kominfo.firebaseapp.com",
    databaseURL: "https://infografis-kominfo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "infografis-kominfo",
    storageBucket: "infografis-kominfo.appspot.com",
    messagingSenderId: "894598154392",
    appId: "1:894598154392:web:98143b3f2efb2dd7e8e8ed",
    measurementId: "G-DHSWEGSG03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.querySelector('button[data-button="loginForm"]').addEventListener('click', function () {
    // console.log('Hello World!')
    let email = document.querySelector('input#emailLogin').value
    let password = document.querySelector('input#passwordLogin').value
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            window.location.href = 'admin'
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            feedbackData('error', 'Pengguna tidak ditemukan!')
        });
})

// document.querySelector('button[data-button="logoutForm"]').addEventListener('click', function () {
//     // console.log('Hello World')
//     signOut(auth).then(() => {
//         console.log('Berhasil LogOut')
//     }).catch((error) => {
//         console.log('Gagal LogOut')
//     })
// })

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid
        console.log(uid)
    } else {
        console.log('tidak masuk')
    }
})