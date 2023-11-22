import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

// Fungsi untuk menambahkan baris dalam tabel
// Pastikan data dalam bentuk Array 
// dan isi elemen array urut sesuai dengan tabel penyajian
export function tambahBaris(idTable, data) {
    let tabel = document.getElementById(idTable);
    // Menambahkan baris tabel
    let baris = tabel.insertRow();
    // Menambahkan data kolom
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            let cell = baris.insertCell(i);
            cell.innerHTML = data[i];
            cell.classList.add('p-2', 'text-dark', 'ff-poppins');
        } else {
            let cell = baris.insertCell(i);
            cell.innerHTML = data[i];
            cell.classList.add('p-2', 'text-dark', 'ff-poppins', 'text-center');
        }
    }
}

// Fungsi untuk menambah form input

// Fungsi untuk mengubah key JSON ke dalam kata biasa
export function keyToWord(kata) {
    let result;
    if (kata.match(/[A-Z][a-z]*/g)) {
        // Memisahkan kata
        const kataTerpecah = kata.replace(/([a-z])([A-Z])/g, '$1 $2');

        // Membagi kata-kata menjadi array
        const kataArray = kataTerpecah.split(' ');

        // Mengonversi kata pertama menjadi huruf kapital
        kataArray[0] = kataArray[0].charAt(0).toUpperCase() + kataArray[0].slice(1);

        // Menggabungkan kembali kata-kata menjadi string
        result = kataArray.join(' ');
    } else {
        result = kata.charAt(0).toUpperCase() + kata.slice(1);
    }

    return result
}

// Fungsi untuk membersihkan . dan replace , menjadi .
export function formatAngkaSistem(terformat) {
    // Hapus semua tanda titik (.)
    terformat = terformat.replace(/\./g, '');

    // Ganti koma (,) dengan titik (.)
    terformat = terformat.replace(/,/g, '.');

    return parseFloat(terformat);
}

// Fungsi untuk merubah angka menjadi format Indonesia
// Menambahkan . jika ribuan dan , jika ada
export function formatAngka(angka) {
    let number_string = angka.toString(),
        split = number_string.split(','),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

    if (ribuan) {
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    return split[1] != undefined ? rupiah + ',' + split[1] : rupiah
}

// Mengkonversi ke id element html ke camelcase
export function camelCase(text) {
    return text.replace(/-([a-z])/g, function (match, group) {
        return group.toUpperCase();
    });
}

// Fungsi untuk memberikan feedback
export function feedbackData(icon, message) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: message
    })
}

// Fungsi untuk mengurutkan data JSON secara custom
// Variabel urutan berbentuk array
export function sortCustom(urutan, data) {
    // Mengurutkan data berdasarkan urutan yang diinginkan
    var dataUrutkan = {};
    urutan.forEach(function (kunci) {
        if (data[kunci] || data[kunci] === 0) {
            dataUrutkan[kunci] = data[kunci];
        }
    });

    return dataUrutkan;
}

// Mengubah string menjadi Title
export function capitalizeWords(string) {
    return string.replace(/\b\w/g, (match) => match.toUpperCase());
}

export function capitalizeFirstLetter(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

// Fungsi untuk menghapus element untuk mengantisipasi jika sudah ada element
export function deleteElement(idElement) {
    const elementForm = document.getElementById(idElement)
    while (elementForm.firstChild) {
        elementForm.removeChild(elementForm.firstChild)
    }
}

// Fungsi untuk menghapus data dalam database realtime
// remove(ref(db, 'mahasiswa/2'))

// Fungsi untuk mengupdate data
export function updateData(keyDb, dataUpdates, data) {
    const updatesData = {}
    updatesData[keyDb] = data
    updatesData[keyDb] = dataUpdates
    update(ref(db), updatesData)
        .then(feedbackData('success', 'Berhasil perbarui data'))
        .catch((error) => {
            feedbackData('error', error)
        })
}
