import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, formatAngka, formatAngkaSistem, updateData } from "../libs.js";

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

// Data Kondisi Jalan
onValue(ref(db, 'tataruang/kondisiJalan'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#kondisi-jalan input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="kondisi-jalan"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/kondisiJalan', dataUpdates, data)
    })
})

// Data Jembatan
onValue(ref(db, 'tataruang/jembatan'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#jembatan input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="jembatan"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/jembatan', dataUpdates, data)
    })
})

// Data Akses Sanitasi
onValue(ref(db, 'tataruang/aksesSanitasi'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#akses-sanitasi input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="akses-sanitasi"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/aksesSanitasi', dataUpdates, data)
    })
})

// Data Panjang Jalan
onValue(ref(db, 'tataruang/panjangJalan'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#panjang-jalan input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="panjang-jalan"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/panjangJalan', dataUpdates, data)
    })
})

// Data Irigasi
onValue(ref(db, 'tataruang/irigasi'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#irigasi input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="irigasi"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/irigasi', dataUpdates, data)
    })
})

// Data Rumah dan Jalan Poros Desa
onValue(ref(db, 'tataruang/rumahJalanPoros'), items => {
    const data = items.val()
    const inputElements = document.querySelectorAll('#rumah-jalan-poros input')
    for (const element of inputElements) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="rumah-jalan-poros"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of inputElements) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('tataruang/rumahJalanPoros', dataUpdates, data)
    })
})
