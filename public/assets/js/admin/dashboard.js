import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

        console.log(dataUpdate)
    })
})

function tambahInput() {
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
    inputYears.setAttribute('type', 'number')
    inputYears.setAttribute('class', 'form-control')
    inputYears.setAttribute('placeholder', 'Tahun')
    // Input Persentase
    var inputIPM = document.createElement('input')
    inputIPM.setAttribute('type', 'text')
    inputIPM.setAttribute('class', 'form-control')
    inputIPM.setAttribute('placeholder', 'Persentase IPM')

    // Menggabungkan element
    col1.appendChild(inputYears)
    col2.appendChild(inputIPM)
    row.appendChild(col1)
    row.appendChild(col2)

    document.getElementById('form-ipm').appendChild(row)
}

function hapusInput() {
    const parentForm = document.getElementById('form-ipm')
    const lastChild = parentForm.lastChild

    if (lastChild) {
        parentForm.removeChild(lastChild)
    }
}

document.getElementById('button-add-input').addEventListener('click', function () {
    tambahInput()
})

document.getElementById('button-remove-input').addEventListener('click', function () {
    hapusInput()
})