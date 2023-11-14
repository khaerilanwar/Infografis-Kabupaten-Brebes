import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { keyToWord, camelCase, feedbackData, capitalizeWords, deleteElement, formatAngka, formatAngkaSistem } from "../libs.js";

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
const db = getDatabase();

// Mengecek apakah sudah login
// Jika belum maka akan redirect ke halaman login
onAuthStateChanged(auth, (user) => {
    if (user) {
        const id = user.uid
        console.log('Sudah Login')
    } else {
        window.location.href = '/login.html'
    }
})

// Data Kuantitas Demografi
const keyKuantitas = 'demografi/dataJumlah'
onValue(ref(db, keyKuantitas), items => {
    const data = items.val()
    // console.log(data)

    // Menghapus semua element
    deleteElement('data-kuantitas')

    // Melakukan looping untuk menambahkan form input element
    // Kecuali key penduduk karena saya sengaja menaruhnya di akhir
    for (let z in data) {
        if (z === 'penduduk') {
            continue
        } else {
            // Menambahkan element ke dalam array
            let idInput = keyToWord(z).toLowerCase().replace(' ', '-')
            let labelTeks = 'Jumlah ' + keyToWord(z)
            let placeholderInput = 'Masukkan ' + keyToWord(z)
            let valueInput = data[z].toLocaleString('id-ID')
            tambahInputLabelKuantitas(idInput, labelTeks, placeholderInput, valueInput)
        }
    }
    // Melakukan looping dengan key penduduk ke dalam element form
    for (let p in data.penduduk) {
        // Menambahkan data penduduk ke dalam element input form
        let idInput = keyToWord(p).toLowerCase().replace(' ', '-')
        let labelTeks = 'Jumlah ' + keyToWord(p)
        let placeholderInput = 'Masukkan ' + keyToWord(p)
        let valueInput = data['penduduk'][p].toLocaleString('id-ID')
        tambahInputLabelKuantitas(idInput, labelTeks, placeholderInput, valueInput)

    }

    const angkaInputElements = document.getElementsByClassName('angka-input')
    for (let angkaInputElement of angkaInputElements) {
        angkaInputElement.addEventListener('input', function () {
            angkaInputElement.value = formatAngka(this.value.replace(/\./g, ''))
        })
    }

    document.querySelector('button[data-button="kuantitas-demografi"]').addEventListener('click', function () {
        // Mengekstraksi data baru
        const dataUpdates = {}
        const dataPenduduk = {}
        const inputKuantitas = document.querySelectorAll('#data-kuantitas input.angka-input')
        for (let ai = 0; ai < inputKuantitas.length; ai++) {
            const keyPenduduk = ['jumlah-jiwa', 'kartu-keluarga', 'kepadatan', 'pria', 'sex-ratio', 'usia-produktif', 'wanita']
            let idInput = inputKuantitas[ai].getAttribute('id')
            if (keyPenduduk.includes(idInput)) {
                // console.log(`${camelCase(idInput)} : penduduk`)
                dataPenduduk[camelCase(idInput)] = formatAngkaSistem(inputKuantitas[ai].value)
            } else {
                dataUpdates[camelCase(idInput)] = formatAngkaSistem(inputKuantitas[ai].value)
            }
        }
        dataUpdates['penduduk'] = dataPenduduk
        console.log(dataUpdates)

        const updatesData = {}
        updatesData[keyKuantitas] = data
        updatesData[keyKuantitas] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

const keyLahanBukanSawah = 'demografi/lahanBukanSawah'
onValue(ref(db, keyLahanBukanSawah), items => {
    const data = items.val()

    const idWrapper = 'form-bukan-sawah'
    // Menghapus element
    deleteElement(idWrapper)
    // Menambahkan element input ke dalam HTML
    for (let lbs in data) {
        let labelTeks = `Luas Lahan ${capitalizeWords(lbs)} (ha)`
        let placeholderInput = `Masukkan Luas ${capitalizeWords(lbs)}`
        tambahInputLabelLahan(idWrapper, lbs, labelTeks, placeholderInput, data[lbs].toLocaleString('id-ID'))
        // console.log(labelTeks)
    }

    const elementsInputAngka = document.getElementById('form-bukan-sawah').querySelectorAll('input')
    for (let elementInputAngka of elementsInputAngka) {
        elementInputAngka.addEventListener('input', function () {
            elementInputAngka.value = formatAngka(this.value.replace(/\./g, ''))
        })
    }

    document.querySelector('button[data-button="lahan-bukan-sawah"]').addEventListener('click', function () {
        // Mendefinisikan object untuk menyimpan data terbaru
        const dataUpdates = {}
        // Mengekstraksi data update
        const elementInput = document.getElementById('form-bukan-sawah').querySelectorAll('input')
        for (let ei = 0; ei < elementInput.length; ei++) {
            dataUpdates[elementInput[ei].getAttribute('id')] = formatAngkaSistem(elementInput[ei].value)
        }
        // Melakukan update data di database
        const updatesData = {}
        updatesData[keyLahanBukanSawah] = data
        updatesData[keyLahanBukanSawah] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

const keyLuasKemiringanLahan = 'demografi/luasKemiringanLahan'
onValue(ref(db, keyLuasKemiringanLahan), items => {
    const data = items.val()

    const idWrapper = 'form-kemiringan'
    // Menghapus element
    deleteElement(idWrapper)
    // Menambahkan element input ke dalam HTML
    for (let kl in data) {
        let idInput = keyToWord(kl).toLowerCase().replace(' ', '-')
        let labelTeks = `Luas Kemiringan ${keyToWord(kl)} (ha)`
        let placeholderInput = `Masukkan Luas Kemiringan`
        tambahInputLabelLahan(idWrapper, idInput, labelTeks, placeholderInput, data[kl].toLocaleString('id-ID'))
    }

    const elementsInputAngka = document.getElementById('form-kemiringan').querySelectorAll('input')
    for (let elementInputAngka of elementsInputAngka) {
        elementInputAngka.addEventListener('input', function () {
            elementInputAngka.value = formatAngka(this.value.replace(/\./g, ''))
        })
    }

    document.querySelector('button[data-button="luas-kemiringan-lahan"]').addEventListener('click', function () {
        // Mendefinisikan object untuk menyimpan data terbaru
        const dataUpdates = {}
        // Mengekstraksi data update
        const elementInput = document.getElementById('form-kemiringan').querySelectorAll('input')
        for (let ei = 0; ei < elementInput.length; ei++) {
            dataUpdates[elementInput[ei].getAttribute('id')] = formatAngkaSistem(elementInput[ei].value)
        }
        // Melakukan update data di database
        const updatesData = {}
        updatesData[keyLuasKemiringanLahan] = data
        updatesData[keyLuasKemiringanLahan] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

const keyWilayah = 'demografi/wilayah'
onValue(ref(db, keyWilayah), items => {
    let data = items.val()
    const idWrapper = 'form-wilayah'
    deleteElement(idWrapper)
    // Menambahkan element input ke dalam HTML
    for (let w in data) {
        let idInput = keyToWord(w).toLowerCase().trim().replace(/ /g, '-')
        let labelTeks = `${keyToWord(w)}`
        let placeholderInput = `Masukkan ${keyToWord(w)}`
        tambahInputLabelLahan(idWrapper, idInput, labelTeks, placeholderInput, data[w].toLocaleString('id-ID'))
    }

    const elementsInputAngka = document.getElementById('form-wilayah').querySelectorAll('input')
    for (let elementInputAngka of elementsInputAngka) {
        if (elementInputAngka.getAttribute('id') !== 'nama-kecamatan-terluas') {
            elementInputAngka.addEventListener('input', function () {
                elementInputAngka.value = formatAngka(this.value.replace(/\./g, ''))
            })
        }
    }

    document.querySelector('button[data-button="wilayah-brebes"]').addEventListener('click', function () {
        // Mendefinisikan object untuk menyimpan data terbaru
        const dataUpdates = {}
        // Mengekstraksi data update
        const elementInput = document.getElementById('form-wilayah').querySelectorAll('input')
        for (let ei = 0; ei < elementInput.length; ei++) {
            if (elementInput[ei].getAttribute('id') === 'nama-kecamatan-terluas') {
                dataUpdates[camelCase(elementInput[ei].getAttribute('id'))] = elementInput[ei].value
            } else {
                dataUpdates[camelCase(elementInput[ei].getAttribute('id'))] = formatAngkaSistem(elementInput[ei].value)
            }
        }
        // Melakukan update data di database
        const updatesData = {}
        updatesData[keyWilayah] = data
        updatesData[keyWilayah] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })

})

function tambahInputLabelLahan(idWrapper, idInput, labelTeks, placeholderInput, value) {
    // Mendefinisikan elemen parent form lahan
    const wrapperInput = document.getElementById(idWrapper)

    // Membuat element HTML yang akan ditambahkan
    var divInput = document.createElement('div')
    var label = document.createElement('label')
    var input = document.createElement('input')

    // Setting attribute tiap element
    divInput.classList.add('mb-3')
    label.setAttribute('for', idInput)
    label.classList.add('form-label')
    label.textContent = labelTeks
    input.classList.add('form-control')
    input.setAttribute('value', value)
    input.setAttribute('type', 'text')
    input.setAttribute('id', idInput)
    input.setAttribute('placeholder', placeholderInput)

    // Menambahkan element ke masing-masing parent
    divInput.appendChild(label)
    divInput.appendChild(input)
    wrapperInput.appendChild(divInput)
}

function tambahInputLabelKuantitas(idInput, labelTeks, placeholderInput, valueInput) {
    // Mendefinisikan element parent untuk menambahkan form
    const rowInput = document.querySelector('#data-kuantitas')

    // Membuat element HTML column, label, dan input
    // Untuk ditambahkan ke element parent form
    var col = document.createElement('div')
    var label = document.createElement('label')
    var input = document.createElement('input')

    // Melakukan setting attribute
    col.classList.add('col-md-3', 'mb-3')
    label.setAttribute('for', idInput)
    label.textContent = labelTeks
    input.setAttribute('value', valueInput)
    input.setAttribute('type', 'text')
    input.setAttribute('id', idInput)
    input.setAttribute('placeholder', placeholderInput)
    input.classList.add('form-control', 'angka-input')

    // Menambahkan element ke dalam masing masing parent
    col.appendChild(label)
    col.appendChild(input)
    rowInput.appendChild(col)
}

// Tombol untuk melakukan logout
const buttonLogout = document.querySelector('span[data-button="logout"]')
buttonLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/login.html'
    }).catch((error) => {
        feedbackData('error', error)
    })
})