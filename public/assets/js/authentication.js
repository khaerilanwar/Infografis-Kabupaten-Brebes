import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"
import { feedbackData } from "./libs.js";

const firebaseConfig = {
    apiKey: "AIzaSyDOe9zi-P7XUhGWGF8Q6s9LbXjA2bNaSQU",
    authDomain: "dinkominfotik-brebes.firebaseapp.com",
    projectId: "dinkominfotik-brebes",
    storageBucket: "dinkominfotik-brebes.appspot.com",
    messagingSenderId: "719071733359",
    appId: "1:719071733359:web:b4f7f8ca95c7b170430f9a",
    measurementId: "G-WN588GZHVC"
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