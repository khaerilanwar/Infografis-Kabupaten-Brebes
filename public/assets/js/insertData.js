import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

export function hello() {
    console.log("Halo sayang")
}

function writeData(section, data) {
    const db = getDatabase();
    set(ref(db, section), data);
}


// const dataInput = [
//     { jenjang: 'Sekolah Dasar', perempuan: 2, lakiLaki: 37, jumlah: 39 },
//     { jenjang: 'SLTP', perempuan: 4, lakiLaki: 97, jumlah: 101 },
//     { jenjang: 'SLTA', perempuan: 201, lakiLaki: 736, jumlah: 937 },
//     { jenjang: 'DIPLOMA I', perempuan: 6, lakiLaki: 0, jumlah: 6 },
//     { jenjang: 'DIPLOMA II', perempuan: 35, lakiLaki: 62, jumlah: 97 },
//     { jenjang: 'DIPLOMA III', perempuan: 894, lakiLaki: 190, jumlah: 1084 },
//     { jenjang: 'STRATA I (Sarjana)', perempuan: 5009, lakiLaki: 3732, jumlah: 8741 },
//     { jenjang: 'STRATA II (Master dan Spesialis)', perempuan: 184, lakiLaki: 394, jumlah: 578 },
//     { jenjang: 'STRATA III (Doktor)', perempuan: 0, lakiLaki: 5, jumlah: 5 },
// ];

// const dataInput = [
//     { namaAkademi: 'Taman Kanak-Kanak (TK)', negeri: 7, swasta: 473, jumlah: 480 },
//     { namaAkademi: 'Sekolah Luar Biasa (SLB)', negeri: 1, swasta: 1, jumlah: 2 },
//     { namaAkademi: 'Sekolah Dasar (SD)', negeri: 862, swasta: 35, jumlah: 897 },
//     { namaAkademi: 'Madrasah Ibtidaiyah (MI)', negeri: 7, swasta: 211, jumlah: 218 },
//     { namaAkademi: 'Sekolah Lanjutan Tingkat Pertama (SLTP)', negeri: 77, swasta: 89, jumlah: 166 },
//     { namaAkademi: 'Madrasah Tsanawiyah (MTs)', negeri: 5, swasta: 99, jumlah: 104 },
//     { namaAkademi: 'Sekolah Menengah Atas (SMA)', negeri: 17, swasta: 16, jumlah: 33 },
//     { namaAkademi: 'Sekolah Menengah Kejuruan (SMK)', negeri: 6, swasta: 89, jumlah: 95 },
//     { namaAkademi: 'Madrasah Aliyah (MA)', negeri: 2, swasta: 31, jumlah: 33 },
//     { namaAkademi: 'Perguruan Tinggi (Umum dan Agama)', negeri: 0, swasta: 6, jumlah: 6 }
// ]

const dataInput = [
    { namaPT: 'STIE Widya Manggalia', mahasiswa: 304, dosen: 16, status: 'Swasta' },
    { namaPT: 'STAI Brebes', mahasiswa: 620, dosen: 65, status: 'Swasta' },
    { namaPT: 'Universitas Muhadi Setiabudi', mahasiswa: 1245, dosen: 90, status: 'Swasta' },
    { namaPT: 'Universitas Peradaban', mahasiswa: 1792, dosen: 125, status: 'Swasta' },
    { namaPT: 'Akper Al-Hikmah Benda', mahasiswa: 139, dosen: 25, status: 'Swasta' },
    { namaPT: 'Akbid YPBHK Jatibarang', mahasiswa: 192, dosen: 65, status: 'Swasta' }
];

// Input data to Realtime Database
set(ref(db, 'pendidikan/perguruanTinggi'), dataInput);