import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, capitalizeWords, deleteElement, feedbackData, formatAngka, formatAngkaSistem, keyToWord, sortCustom, updateData } from "../libs.js";

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

// Data Pengguna BPJS
onValue(ref(db, 'kesehatan/bpjs'), items => {
    const data = items.val()
    const elementsBpjs = document.querySelectorAll('#bpjs input')
    // Mengisi nilai pada form input
    for (const element of elementsBpjs) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="bpjs"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsBpjs) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData['kesehatan/bpjs'] = data
        updatesData['kesehatan/bpjs'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Tempat Tidur Rawat Inap
onValue(ref(db, 'kesehatan/tempatTidurRawatInap'), items => {
    const data = items.val()
    // console.log(data)
    const elementsInput = document.querySelectorAll('#tempat-tidur-rawat-inap input')
    for (const element of elementsInput) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="tempat-tidur-rawat-inap"]').addEventListener('click', () => {
        // Mengekstraksi Data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        // Fungsi untuk mengupdate data
        const updatesData = {}
        updatesData['kesehatan/tempatTidurRawatInap'] = data
        updatesData['kesehatan/tempatTidurRawatInap'] = dataUpdates
        update(ref(db), updatesData)
            .then(feedbackData('success', 'Berhasil perbarui data'))
            .catch((error) => {
                feedbackData('error', error)
            })
    })
})

// Data Kematian Ibu dan Bayi
onValue(ref(db, 'kesehatan/kematian'), items => {
    const data = items.val()
    const elementsInput = document.querySelectorAll('#kematian-ibu-bayi input')
    // console.log(elementsInput.length)
    for (const element of elementsInput) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="kematian-ibu-bayi"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('kesehatan/kematian', dataUpdates, data)
    })
})

// Data Penyakit TBC
onValue(ref(db, 'kesehatan/penyakitTbc'), items => {
    const data = items.val()
    // Mengisi value input pada html
    const elementsInput = document.querySelectorAll('#penyakit-tbc input')
    for (const element of elementsInput) {
        element.value = data[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="penyakit-tbc"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))] = formatAngkaSistem(element.value)
        }
        updateData('kesehatan/penyakitTbc', dataUpdates, data)
    })
})

// Data Penyakit DBD
onValue(ref(db, 'kesehatan/penyakitDbd'), items => {
    const data = items.val()
    // Mengisi value input pada html
    const elementsInput = document.querySelectorAll('#penyakit-dbd input')
    for (const element of elementsInput) {
        element.value = data[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="penyakit-dbd"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))] = formatAngkaSistem(element.value)
        }
        updateData('kesehatan/penyakitDbd', dataUpdates, data)
    })
})

// Data Posyandu
onValue(ref(db, 'kesehatan/posyandu'), items => {
    const data = items.val()
    const elementsInput = document.querySelectorAll('#posyandu input')
    for (const element of elementsInput) {
        element.value = data[camelCase(element.getAttribute('id'))].toLocaleString('id-ID')
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="posyandu"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('kesehatan/posyandu', dataUpdates, data)
    })
})

// Data Tenaga Medis
onValue(ref(db, 'kesehatan/tenagaMedis'), items => {
    const data = items.val()
    // Mengisi value pada element html
    const jenisTenagaMedis = document.querySelectorAll('#tenaga-medis div[idtm]')
    for (const tenagaMedis of jenisTenagaMedis) {
        const inputKuantitas = tenagaMedis.querySelectorAll('input')
        for (const input of inputKuantitas) {
            input.value = data[camelCase(tenagaMedis.getAttribute('idtm'))][camelCase(input.getAttribute('id'))].toLocaleString('id-ID')
            input.addEventListener('input', () => {
                input.value = formatAngka(input.value.replace(/\./g, ''))
            })
        }
    }

    // Mengupdate data
    document.querySelector('button[data-button="tenaga-medis"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        for (const element of elementsInput) {
            dataUpdates[camelCase(element.getAttribute('id'))] = formatAngkaSistem(element.value)
        }
        updateData('kesehatan/tenagaMedis', dataUpdates, data)
    })
})

// Data Sarana Kesehatan dan Pasien Puskesmas
onValue(ref(db, 'kesehatan/saranaKesehatan'), items => {
    const data = items.val()
    const elementsInput = document.querySelectorAll('#sarana-kesehatan input')
    for (const element of elementsInput) {
        if (element.getAttribute('id') === 'pasien-puskesmas') {
            onValue(ref(db, 'kesehatan/pasienPuskesmas'), pasien => {
                element.value = pasien.val().toLocaleString('id-ID')
            })
        } else {
            element.value = data[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))].toLocaleString('id-ID')
        }
        element.addEventListener('input', () => {
            element.value = formatAngka(element.value.replace(/\./g, ''))
        })
    }

    // Mengupdate data
    document.querySelector('button[data-button="sarkes-paspus"]').addEventListener('click', () => {
        // Mengekstrak data
        const dataUpdates = {}
        const updates = {}
        for (const element of elementsInput) {
            if (element.getAttribute('id') === 'pasien-puskesmas') {
                updates['kesehatan/pasienPuskesmas'] = formatAngkaSistem(element.value)
                update(ref(db), updates)
            } else {
                dataUpdates[camelCase(element.getAttribute('id').split('-').splice(1).join('-'))] = formatAngkaSistem(element.value)
            }
        }
        updateData('kesehatan/saranaKesehatan', dataUpdates, data)
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