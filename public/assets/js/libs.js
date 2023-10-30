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

// Fungsi untuk mengurutkan data JSON secara custom
export function sortCustom(urutan, data) {
    // Mengurutkan data berdasarkan urutan yang diinginkan
    var dataUrutkan = {};
    urutan.forEach(function (kunci) {
        if (data[kunci]) {
            dataUrutkan[kunci] = data[kunci];
        }
    });

    return dataUrutkan;
}

// Fungsi untuk menghapus data dalam database realtime
// remove(ref(db, 'mahasiswa/2'))

