import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, capitalizeWords, deleteElement, feedbackData, formatAngka, formatAngkaSistem, keyToWord, sortCustom } from "../libs.js";

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
const db = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const id = user.uid
        console.log('Sudah Login')
    } else {
        window.location.href = '/login.html'
    }
})

onValue(ref(db, 'kesehatan/bpjs'), items => {
    const data = items.val()
})

const buttonLogout = document.querySelector('span[data-button="logout"]')
buttonLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/login.html'
    }).catch((error) => {
        feedbackData('error', error)
    })
})

function addInput2(idWrapper, data) {

}