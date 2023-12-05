import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, idHtml } from './libs.js'

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
const db = getDatabase();

// Data Keamanan
onValue(ref(db, 'keamanan'), items => {
    const data = items.val()
    for (const items in data) {
        for (const item in data[items]) {
            document.querySelector(`[${idHtml(item)}]`).innerHTML = typeof data[items][item] === 'number' ? data[items][item].toLocaleString('id-ID') : data[items][item]
        }
    }
})