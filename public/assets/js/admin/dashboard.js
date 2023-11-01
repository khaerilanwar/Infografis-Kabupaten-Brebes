import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { feedbackData } from "../libs.js";

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
const db = getDatabase();

// Membaca data kuantitas dashboard
onValue(ref(db, 'dashboard/jumlah'), (items) => {
    const data = items.val()

    // Mendefinisikan elemen input HTML
    const jumlahPenduduk = document.getElementById('jumlah-penduduk')
    const jumlahKelurahan = document.getElementById('jumlah-kelurahan')
    const jumlahKecamatan = document.getElementById('jumlah-kecamatan')
    const jumlahDesa = document.getElementById('jumlah-desa')

    // Mengisi value input HTML
    jumlahPenduduk.value = data.penduduk.toLocaleString('id-ID')
    jumlahKelurahan.value = data.kelurahan.toLocaleString('id-ID')
    jumlahKecamatan.value = data.kecamatan.toLocaleString('id-ID')
    jumlahDesa.value = data.desa.toLocaleString('id-ID')

    // Ketika tombol ubah data di klik
    const buttonSubmitJumlah = document.querySelector('[data-button="jumlah"]')
    buttonSubmitJumlah.addEventListener('click', function () {

        const dataUpdate = {
            desa: parseInt(jumlahDesa.value.replace(/\D/g, '')),
            kecamatan: parseInt(jumlahKecamatan.value.replace(/\D/g, '')),
            kelurahan: parseInt(jumlahKelurahan.value.replace(/\D/g, '')),
            penduduk: parseInt(jumlahPenduduk.value.replace(/\D/g, '')),
        }

        // console.log(dataUpdate)

        const updatesData = {}
        updatesData['dashboard/jumlah'] = data
        updatesData['dashboard/jumlah'] = dataUpdate
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Membaca data IPM
onValue(ref(db, 'dashboard/ipm'), items => {
    const data = items.val()
    // console.log(data)

    // Menghapus semua element
    const elementFormIPM = document.getElementById('form-ipm')
    while (elementFormIPM.firstChild) {
        elementFormIPM.removeChild(elementFormIPM.firstChild)
    }

    // Membuat elemen form html
    let numPageInput = 1;
    for (let key in data) {
        // Set attribute pada element html
        const attribute = {
            inputYears: { type: 'number', class: 'form-control', placeholder: 'Tahun', value: key },
            inputIPM: { type: 'text', class: 'form-control', placeholder: 'Persentase IPM', value: data[key].toString().replace('.', ',') },
        }

        // Menambahkan button delete
        // Membuat ikon hapus
        var ikonDelete = document.createElement('i')
        ikonDelete.classList.add('fa-solid', 'fa-trash')
        // Membuat tombol hapus
        var buttonDelete = document.createElement('button')
        buttonDelete.classList.add('btn', 'btn-danger', 'float-end')
        buttonDelete.setAttribute('type', 'button')
        buttonDelete.setAttribute('title', 'Hapus Data')
        buttonDelete.setAttribute('dataIPM', 'dashboard/ipm/' + key)
        buttonDelete.appendChild(ikonDelete)
        document.getElementById('form-ipm').appendChild(buttonDelete)
        // Menambahkan input data
        tambahInput(attribute)
        numPageInput += 1
    }

    const buttonsDelete = document.querySelectorAll('button[title="Hapus Data"]')
    for (let x = 0; x < buttonsDelete.length; x++) {
        buttonsDelete[x].addEventListener('click', function () {
            let keyDatabase = buttonsDelete[x].getAttribute('dataIPM')
            remove(ref(db, keyDatabase))
            // Menghapus elemen data yang sudah dihapus
            const elementInputHapus = buttonsDelete[x].nextElementSibling
            if (elementInputHapus) {
                elementInputHapus.remove()
            }
            buttonsDelete[x].remove()

            // Memberikan feedback data sudah dihapus
            feedbackData('success', 'Berhasil hapus data')
        })
    }

    document.querySelector('button[data-button="ipm"]').addEventListener('click', function () {
        // Mendapatkan data updates
        const dataUpdates = {}
        const barisInput = document.querySelectorAll('#form-ipm .row')
        for (let i = 0; i < barisInput.length; i++) {
            let key = barisInput[i].querySelector('input[type="number"]').value
            let value = parseFloat(barisInput[i].querySelector('input[type="text"]').value.replace(',', '.'))
            dataUpdates[key] = value
        }

        // Mengupdate data pada realtime database
        const updatesData = {}
        updatesData['dashboard/ipm'] = data
        updatesData['dashboard/ipm'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })

    })
})

document.getElementById('button-add-input').addEventListener('click', function () {
    // Mendapatkan jumlah form input data
    let numPageInput = document.getElementById('form-ipm').querySelectorAll('.row').length

    const attributeSet = {
        inputYears: { type: 'number', class: 'form-control', placeholder: 'Tahun', 'num-input': numPageInput + 1 },
        inputIPM: { type: 'text', class: 'form-control', placeholder: 'Persentase IPM', 'num-input': numPageInput + 1 },
    }

    // Menambahkan button delete
    // Membuat ikon hapus
    var ikonDelete = document.createElement('i')
    ikonDelete.classList.add('fa-solid', 'fa-trash')
    // Membuat tombol hapus
    var buttonDelete = document.createElement('button')
    buttonDelete.classList.add('btn', 'btn-danger', 'float-end')
    buttonDelete.setAttribute('type', 'button')
    buttonDelete.setAttribute('title', 'Hapus Data')
    buttonDelete.setAttribute('num-input', numPageInput + 1)
    buttonDelete.appendChild(ikonDelete)
    document.getElementById('form-ipm').appendChild(buttonDelete)
    document.getElementById('form-ipm').insertBefore(buttonDelete, tambahInput(attributeSet))

    // Menghapus form input baru
    const buttonNewInputs = document.getElementById('form-ipm').querySelectorAll('button[num-input]')
    for (let y = 0; y < buttonNewInputs.length; y++) {
        buttonNewInputs[y].addEventListener('click', function () {
            buttonNewInputs[y].nextElementSibling.remove()
            buttonNewInputs[y].remove()
        })
    }
})

function tambahInput(atributes) {
    // Membuat element div dengan class row
    var row = document.createElement('div')
    row.classList.add('row', 'mb-3')

    // Membuat elemen div dengan class col
    var col1 = document.createElement('div')
    col1.setAttribute('class', 'col')
    var col2 = document.createElement('div')
    col2.setAttribute('class', 'col')

    // Membuat element input
    // Input tahun
    var inputYears = document.createElement('input')
    // Menambahkan atribut element dengan looping sesuai parameter
    for (let attrY in atributes['inputYears']) {
        inputYears.setAttribute(attrY, atributes['inputYears'][attrY])
    }
    // Input Persentase
    var inputIPM = document.createElement('input')
    // Menambahkan atribut element dengan looping sesuai parameter
    for (let attrI in atributes['inputIPM']) {
        inputIPM.setAttribute(attrI, atributes['inputIPM'][attrI])
    }

    // Menggabungkan element
    col1.appendChild(inputYears)
    col2.appendChild(inputIPM)
    row.appendChild(col1)
    row.appendChild(col2)

    return document.getElementById('form-ipm').appendChild(row)
}