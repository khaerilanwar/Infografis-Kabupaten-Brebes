import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, formatAngka, formatAngkaSistem, idHtml, updateData } from "../libs.js";

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

// Mengecek apakah admin sudah login
onAuthStateChanged(auth, (user) => {
    if (user) {
        const id = user.uid
        console.log('Sudah Login')
    } else {
        window.location.href = '/login.html'
    }
})

// Tombol Log Out
const buttonLogout = document.querySelector('span[data-button="logout"]')
buttonLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/login.html'
    }).catch((error) => {
        feedbackData('error', error)
    })
})

onValue(ref(db, 'sosial'), items => {
    const data = items.val()
    for (const keyItems in data) {
        const items = data[keyItems]
        const inputs = document.querySelectorAll(`#${idHtml(keyItems)} .form-control`)
        for (const input of inputs) {
            if (typeof items[camelCase(input.getAttribute('id'))] === 'number') {
                input.value = items[camelCase(input.getAttribute('id'))].toLocaleString('id-ID')
                input.addEventListener('input', () => {
                    input.value = formatAngka(input.value.replace(/\./g, ''))
                })
            } else {
                input.value = items[camelCase(input.getAttribute('id'))]
            }
        }

        // Mengupdate data
        const dataItems = data[keyItems]
        const buttonsUpdate = document.querySelectorAll(`button[data-button=${idHtml(keyItems)}]`)
        for (const button of buttonsUpdate) {
            button.addEventListener('click', () => {
                // Mengekstrak data
                const dataUpdates = {}
                for (const input of inputs) {
                    dataUpdates[camelCase(input.getAttribute('id'))] = input.tagName.toLowerCase() === 'textarea' ? input.value : formatAngkaSistem(input.value)
                }
                updateData(`keamanan/${keyItems}`, dataUpdates, data)
            })
        }
    }
})
