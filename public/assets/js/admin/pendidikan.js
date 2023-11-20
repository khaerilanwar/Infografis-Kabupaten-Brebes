import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, capitalizeWords, deleteElement, feedbackData, formatAngka, formatAngkaSistem, keyToWord, sortCustom } from "../libs.js";

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

// Data Anak Putus Sekolah
onValue(ref(db, 'pendidikan/anakPutusSekolah'), items => {
    const data = items.val()

    // Mengisi input value Anak Putus Sekolah
    let inputSD = document.querySelector('input#sd-putus-sekolah')
    let inputSMP = document.querySelector('input#smp-putus-sekolah')
    inputSD.value = data.sd.toLocaleString('id-ID')
    inputSMP.value = data.smp.toLocaleString('id-ID')

    // Memberikan format angka ketika input angka
    inputSD.addEventListener('input', () => {
        inputSD.value = formatAngka(inputSD.value.replace(/\./g, ''))
    })
    inputSMP.addEventListener('input', () => {
        inputSMP.value = formatAngka(inputSMP.value.replace(/\./g, ''))
    })

    // Melakukan update data
    document.querySelector('button[data-button="anak-putus-sekolah"]').addEventListener('click', () => {
        // Mengekstraksi data update
        const dataUpdates = {
            sd: formatAngkaSistem(inputSD.value),
            smp: formatAngkaSistem(inputSMP.value)
        }
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData['pendidikan/anakPutusSekolah'] = data
        updatesData['pendidikan/anakPutusSekolah'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Angka Partisipasi
onValue(ref(db, 'pendidikan/angkaPartisipasi'), items => {
    const data = items.val()
    // Menghapus Element
    deleteElement('data-grafik-ap')
    for (const keyData in data) {
        tambahInput('div#data-grafik-ap', keyData, data[keyData])
    }
    const inputsElement = document.querySelectorAll('div#data-grafik-ap input')
    for (const inputElement of inputsElement) {
        inputElement.addEventListener('input', () => {
            inputElement.value = formatAngka(inputElement.value.replace(/\./g, ''))
        })
    }

    // Melakukan update data
    document.querySelector('button[data-button="grafik-ap"]').addEventListener('click', () => {
        // Mengekstraksi data
        const dataUpdates = { sd: {}, smp: {}, mi: {}, mts: {} }
        for (const element of inputsElement) {
            let key = element.getAttribute('id').split('-')
            dataUpdates[key[0]][key[1]] = formatAngkaSistem(element.value)
        }

        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData['pendidikan/angkaPartisipasi'] = data
        updatesData['pendidikan/angkaPartisipasi'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Angka Putus Sekolah
onValue(ref(db, 'pendidikan/angkaPutusSekolah'), items => {
    const data = items.val()
    // console.log(data)

    // Mendefinisikan element input
    const inputSD = document.querySelector('div#angka-putus-sekolah input#aps-sd')
    const inputMI = document.querySelector('div#angka-putus-sekolah input#aps-mi')
    const inputSMP = document.querySelector('div#angka-putus-sekolah input#aps-smp')
    const inputMTs = document.querySelector('div#angka-putus-sekolah input#aps-mts')
    const deskripsi = document.querySelector('textarea#deskripsi-aps')

    // Memberikan value pada element input
    inputSD.value = data.sd.toLocaleString('id-ID')
    inputMI.value = data.mi.toLocaleString('id-ID')
    inputSMP.value = data.smp.toLocaleString('id-ID')
    inputMTs.value = data.mts.toLocaleString('id-ID')
    deskripsi.value = data.deskripsi

    // Melakukan Update Data
    document.querySelector('button[data-button="presentase-aps"]').addEventListener('click', () => {
        // Mengekstraksi data
        const dataUpdates = {
            sd: formatAngkaSistem(inputSD.value),
            mi: formatAngkaSistem(inputMI.value),
            smp: formatAngkaSistem(inputMTs.value),
            mts: formatAngkaSistem(inputSMP.value),
            deskripsi: deskripsi.value
        }

        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData['pendidikan/angkaPutusSekolah'] = data
        updatesData['pendidikan/angkaPutusSekolah'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Jumlah Guru
const keyJumlahGuru = 'pendidikan/pelaksanaPendidikan/guru'
onValue(ref(db, keyJumlahGuru), items => {
    const data = items.val()
    deleteElement('jumlah-guru')
    // Menambahkan element input sesuai banyak data
    for (let key in data) {
        tambahInput2('div#jumlah-guru', 'guru', key, data[key])
    }
    // Memberikan eventlistener formatangka input
    const inputsAngka = document.getElementsByClassName('input-angka')
    for (let input of inputsAngka) {
        input.addEventListener('input', () => {
            input.value = formatAngka(input.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="guru-brebes"]').addEventListener('click', () => {
        // console.log('hellow')
        // Mengekstraksi data
        const dataUpdates = {}
        const inputsGuru = document.querySelectorAll('div#jumlah-guru input')
        for (const input of inputsGuru) {
            let key = input.getAttribute('id').split('-')[1]
            let value = formatAngkaSistem(input.getAttribute('value'))
            dataUpdates[key] = value
        }
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData[keyJumlahGuru] = data
        updatesData[keyJumlahGuru] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Jumlah Siswa
const keyJumlahSiswa = 'pendidikan/pelaksanaPendidikan/siswa'
onValue(ref(db, keyJumlahSiswa), items => {
    const data = items.val()
    deleteElement('jumlah-siswa')
    // Menambahkan element input sesuai banyak data
    for (let key in data) {
        tambahInput2('div#jumlah-siswa', 'siswa', key, data[key])
    }
    // Memberikan eventlistener formatangka input
    const inputsAngka = document.getElementsByClassName('input-angka')
    for (let input of inputsAngka) {
        input.addEventListener('input', () => {
            input.value = formatAngka(input.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="siswa-brebes"]').addEventListener('click', () => {
        // Mengekstraksi data
        const dataUpdates = {}
        const inputsSiswa = document.querySelectorAll('#jumlah-siswa input')
        for (const input of inputsSiswa) {
            let key = input.getAttribute('id').split('-')[1]
            let value = formatAngkaSistem(input.value)
            dataUpdates[key] = value
        }
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData[keyJumlahSiswa] = data
        updatesData[keyJumlahSiswa] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Jumlah Akademik
const keyJumlahAkademik = 'pendidikan/jumlahAkademik'
onValue(ref(db, keyJumlahAkademik), items => {
    const data = items.val()
    deleteElement('tabel-data-akademi')
    for (let item of data) {
        const urutan = ['namaAkademi', 'negeri', 'swasta', 'jumlah']
        item = sortCustom(urutan, item)
        tambahBaris('tabel-data-akademi', item)
    }

    const inputsAngka = document.querySelectorAll('#tabel-data-akademi input.input-angka')
    for (let input of inputsAngka) {
        input.addEventListener('input', () => {
            input.value = formatAngka(input.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="data-akademi"]').addEventListener('click', () => {
        // Mengekstraksi data
        const dataUpdates = []
        const rows = document.querySelectorAll('#tabel-data-akademi tr')
        for (let row of rows) {
            const rowData = {}
            const inputs = row.querySelectorAll('input')
            for (let input of inputs) {
                // console.log(camelCase(input.getAttribute('name')))
                if (input.getAttribute('name') === 'nama-akademi') {
                    rowData[camelCase(input.getAttribute('name'))] = input.value
                } else {
                    rowData[camelCase(input.getAttribute('name'))] = formatAngkaSistem(input.value.replace(/\./g, ''))
                }
            }
            dataUpdates.push(rowData)
        }

        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData[keyJumlahAkademik] = data
        updatesData[keyJumlahAkademik] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Jumlah Perguruan Tinggi
const keyDataPT = 'pendidikan/perguruanTinggi'
onValue(ref(db, keyDataPT), items => {
    const data = items.val()
    deleteElement('tabel-data-pt')
    for (let item of data) {
        const urutan = ['namaPt', 'mahasiswa', 'dosen', 'status']
        item = sortCustom(urutan, item)
        tambahBaris('tabel-data-pt', item)
    }

    const inputsAngka = document.querySelectorAll('#tabel-data-pt input.input-angka')
    for (let input of inputsAngka) {
        input.addEventListener('input', () => {
            input.value = formatAngka(input.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="data-pt"]').addEventListener('click', () => {
        // Mengekstraksi data
        const dataUpdates = []
        const rows = document.querySelectorAll('#tabel-data-pt tr')
        for (let row of rows) {
            const rowData = {}
            const inputs = row.querySelectorAll('input')
            for (let input of inputs) {
                // console.log(camelCase(input.getAttribute('name')))
                if (input.getAttribute('name') === 'nama-pt' || input.getAttribute('name') === 'status') {
                    rowData[camelCase(input.getAttribute('name'))] = input.value
                } else {
                    rowData[camelCase(input.getAttribute('name'))] = formatAngkaSistem(input.value.replace(/\./g, ''))
                }
            }
            dataUpdates.push(rowData)
        }
        console.log(dataUpdates)
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData[keyDataPT] = data
        updatesData[keyDataPT] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})



const buttonLogout = document.querySelector('span[data-button="logout"]')
buttonLogout.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/login.html'
    }).catch((error) => {
        feedbackData('error', error)
    })
})

function tambahInput2(idWrapper, keyParent, keyData, data) {
    const wrapper = document.querySelector(idWrapper)
    // Membuat element column
    const col = document.createElement('div')
    col.classList.add('col-6', 'mb-3')
    // Membuat element label
    const label = document.createElement('label')
    label.setAttribute('for', `${keyParent}-${keyData}`)
    label.classList.add('form-label')
    label.textContent = `${capitalizeWords(keyParent)} ${keyData === 'mts' ? 'MTs' : keyData.toUpperCase()}`
    // Membuat element input
    const input = document.createElement('input')
    input.setAttribute('id', `${keyParent}-${keyData}`)
    input.setAttribute('type', 'text')
    input.setAttribute('value', data.toLocaleString('id-ID'))
    input.classList.add('form-control', 'input-angka')
    input.setAttribute('placeholder', `Jumlah ${capitalizeWords(keyParent)} ${keyData === 'mts' ? 'MTs' : keyData.toUpperCase()}`)

    // Menambahkan element anak
    col.appendChild(label)
    col.appendChild(input)
    wrapper.appendChild(col)
}

function tambahInput(idWrapper, keyData, data) {
    const wrapper = document.querySelector(idWrapper)
    for (const key in data) {
        // Membuat element column
        const col = document.createElement('div')
        col.classList.add('col-md-2', 'col-6', 'mb-3')
        // Membuat element label
        const label = document.createElement('label')
        label.setAttribute('for', `${keyData}-${key}`)
        label.classList.add('form-label')
        label.textContent = `${key.toUpperCase()} ${keyData === 'mts' ? 'MTs' : keyData.toUpperCase()}`
        // Membuat element input
        const input = document.createElement('input')
        input.setAttribute('id', `${keyData}-${key}`)
        input.setAttribute('type', 'text')
        input.setAttribute('value', data[key].toLocaleString('id-ID'))
        input.classList.add('form-control')
        input.setAttribute('placeholder', `Presentase ${key.toUpperCase()} ${keyData === 'mts' ? 'MTs' : keyData.toUpperCase()}`)

        // Menambahkan element ke dalam element parent
        col.appendChild(label)
        col.appendChild(input)
        wrapper.appendChild(col)
    }
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
            !['namaAkademi', 'namaPT', 'status'].includes(key) ? 'input-angka' : null
        )
        input.setAttribute(
            'value',
            ['namaAkademi', 'namaPT', 'status'].includes(key) ? data[key] : data[key].toLocaleString('id-ID')
        )
        input.setAttribute('name', keyToWord(key).toLowerCase().replace(' ', '-'))
        cell.appendChild(input)
        i++
    }
}