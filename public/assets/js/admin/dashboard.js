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