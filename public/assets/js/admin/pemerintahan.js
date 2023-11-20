import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, feedbackData, formatAngka, formatAngkaSistem, keyToWord, sortCustom } from "../libs.js";

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

// Data Aparatur Sipil Negara
onValue(ref(db, 'pemerintahan/asn'), items => {
    const data = items.val()
    // Memberikan value pada element input pns html
    const jumlahPNS = data.pns
    document.getElementById('pns-pria').value = jumlahPNS.pria.toLocaleString('id-ID')
    document.getElementById('pns-wanita').value = jumlahPNS.wanita.toLocaleString('id-ID')
    // Memberikan value pada element input pppk html
    const jumlahPPPK = data.pppk
    document.getElementById('pppk-pria').value = jumlahPPPK.pria.toLocaleString('id-ID')
    document.getElementById('pppk-wanita').value = jumlahPPPK.wanita.toLocaleString('id-ID')

    document.querySelector('button[data-button="jumlah-asn"]').addEventListener('click', function () {
        // Mengekstraksi data terbaru
        let totalPnsPria = formatAngkaSistem(document.getElementById('pns-pria').value)
        let totalPnsWanita = formatAngkaSistem(document.getElementById('pns-wanita').value)
        let totalPppkWanita = formatAngkaSistem(document.getElementById('pppk-wanita').value)
        let totalPppkPria = formatAngkaSistem(document.getElementById('pppk-pria').value)
        const dataUpdates = {
            pns: { pria: totalPnsPria, wanita: totalPnsWanita },
            pppk: { pria: totalPppkPria, wanita: totalPppkWanita }
        }

        // Mengupdate data di realtime database
        const updatesData = {}
        updatesData['pemerintahan/asn'] = data
        updatesData['pemerintahan/asn'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Pejabat 
onValue(ref(db, 'pemerintahan/pejabat'), items => {
    const data = items.val()
    const dataStruktural = data.struktural
    const dataFungsional = data.fungsional
    document.getElementById('fungsional-tertentu').value = dataFungsional['fungsionalTertentu'].toLocaleString('id-ID')
    document.getElementById('fungsional-umum').value = dataFungsional['fungsionalUmum'].toLocaleString('id-ID')
    document.getElementById('eselon2').value = dataStruktural['eselon2'].toLocaleString('id-ID')
    document.getElementById('eselon3').value = dataStruktural['eselon3'].toLocaleString('id-ID')
    document.getElementById('eselon4').value = dataStruktural['eselon4'].toLocaleString('id-ID')

    document.querySelector('button[data-button="struktural-fungsional"]').addEventListener('click', function () {
        let nilaiJFT = formatAngkaSistem(document.getElementById('fungsional-tertentu').value)
        let nilaiJFU = formatAngkaSistem(document.getElementById('fungsional-umum').value)
        let nilaiEselon2 = formatAngkaSistem(document.getElementById('eselon2').value)
        let nilaiEselon3 = formatAngkaSistem(document.getElementById('eselon3').value)
        let nilaiEselon4 = formatAngkaSistem(document.getElementById('eselon4').value)

        const dataUpdates = {
            fungsional: {
                fungsionalTertentu: nilaiJFT,
                fungsionalUmum: nilaiJFU
            },
            struktural: {
                eselon2: nilaiEselon2,
                eselon3: nilaiEselon3,
                eselon4: nilaiEselon4
            }
        }

        // Mengupdate data di realtime database
        const updatesData = {}
        updatesData['pemerintahan/pejabat'] = data
        updatesData['pemerintahan/pejabat'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Pendidikan ASN
onValue(ref(db, 'pemerintahan/pendidikanASN'), items => {
    const data = items.val()
    for (let row of data) {
        const urutanRow = ['jenjang', 'perempuan', 'lakiLaki', 'jumlah']
        row = sortCustom(urutanRow, row)
        tambahBaris('tabel-asn-pendidikan', row)
    }

    const elementsInputAngka = document.getElementById('tabel-asn-pendidikan').querySelectorAll('input.input-angka')
    for (let elementInputAngka of elementsInputAngka) {
        elementInputAngka.addEventListener('input', () => {
            elementInputAngka.value = formatAngka(elementInputAngka.value.replace(/\./g, ''))
        })
    }

    document.querySelector('button[data-button="pendidikan-asn"][type="button"]').addEventListener('click', () => {
        // Mengekstraksi data baru
        const rowElements = document.querySelectorAll('#tabel-asn-pendidikan > tr')
        const dataUpdates = []
        for (let row of rowElements) {
            const inputElements = row.querySelectorAll('input')
            const rowData = {}
            for (let input of inputElements) {
                // rowData[input.getAttribute('name')]
                let key = camelCase(input.getAttribute('name'))
                let value = key !== 'jenjang' ? formatAngkaSistem(input.getAttribute('value')) : input.getAttribute('value')
                rowData[key] = value
                // console.log(`${key} : ${value}`)
            }
            dataUpdates.push(rowData)
        }
        // console.log(dataUpdates)
        // Mengupdate data di realtime database
        const updatesData = {}
        updatesData['pemerintahan/pendidikanASN'] = data
        updatesData['pemerintahan/pendidikanASN'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data SKPD
onValue(ref(db, 'pemerintahan/skpd'), (items) => {
    const data = items.val()
    // console.log(data)
    const elementInputs = document.querySelectorAll('#data-skpd input')
    for (let element of elementInputs) {
        element.value = data[element.getAttribute('id')]
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    document.querySelector('button[data-button="total-skpd"]').addEventListener('click', () => {
        // console.log('Hello Word')
        // Mengekstraksi data
        const dataUpdates = {}
        for (let element of elementInputs) {
            dataUpdates[element.getAttribute('id')] = formatAngkaSistem(element.value)
        }
        // Mengupdate data di realtime database
        const updatesData = {}
        updatesData['pemerintahan/skpd'] = data
        updatesData['pemerintahan/skpd'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

const inputElements = document.getElementById('baris-pertama').querySelectorAll('input[type="text"]')
for (let element of inputElements) {
    element.addEventListener('input', function (e) {
        element.value = formatAngka(this.value.replace(/\./g, ''));
    });
}

function tambahBaris(idTable, data) {
    let tabel = document.getElementById(idTable)
    // Menambahkan baris tabel
    let baris = tabel.insertRow()
    // Menambahkan data kolom
    let i = 0
    for (let key in data) {
        // Menambahkan tag td
        let cell = baris.insertCell(i)
        // Menambahkan tag input
        let input = document.createElement('input')
        // Setting attribute tag input
        input.setAttribute('type', 'text')
        input.classList.add(
            'form-control',
            key !== 'jenjang' ? 'input-angka' : null
        )
        input.setAttribute(
            'value',
            key === 'jenjang' ? data[key] : data[key].toLocaleString('id-ID')
        )
        input.setAttribute('name', keyToWord(key).toLowerCase().replace(' ', '-'))
        cell.appendChild(input)
        i++
    }
}

const buttonLogout = document.querySelector('span[data-button="logout"]')
buttonLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/login.html'
    }).catch((error) => {
        feedbackData('error', error)
    })
})