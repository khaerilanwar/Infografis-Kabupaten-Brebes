import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { sortCustom, tambahBaris } from "./libs.js";

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

// Data Anak Putus Sekolah
onValue(ref(db, 'pendidikan/anakPutusSekolah'), (items) => {
    const data = items.val();
    document.querySelector('[sd-putus]').innerHTML = data.sd;
    document.querySelector('[smp-putus]').innerHTML = data.smp;
})

// Chart Angka Partisipasi
onValue(ref(db, 'pendidikan/angkaPartisipasi'), (items) => {
    const data = items.val()
    const dataSort = sortCustom(
        ['sd', 'mi', 'smp', 'mts'],
        data
    );

    // console.log(dataSort)
    const apk = [], apm = [], aps = [];
    for (let x in dataSort) {
        apk.push(dataSort[x]['apk'])
        apm.push(dataSort[x]['apm'])
        aps.push(dataSort[x]['aps'])
    }

    var optionsAP = {
        responsive: [
            {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                // position: 'center'
                            }
                        }
                    },
                    xaxis: {
                        axisBorder: {
                            show: true,
                            color: '#000',
                            height: 2
                        },
                        labels: {
                            offsetY: -3,
                            style: {
                                fontSize: '14px',
                                fontWeight: 550,
                                colors: ['#000', '#000', '#000', '#000']
                            }
                        }
                    },
                    dataLabels: {
                        offsetY: -8,
                        enabled: true,
                        style: {
                            fontSize: '5px',
                            colors: ['#000']
                        },
                        formatter: function (value) {
                            // Menghilangkan desimal dan angka nol di belakang koma
                            return value.toLocaleString('id-ID');
                        }
                    },
                    legend: {
                        show: true,
                        position: 'bottom',
                        fontSize: '12px',
                        // fontWeight: 5,
                        itemMargin: {
                            horizontal: 20,
                            vertical: 0
                        },
                        markers: {
                            width: 14
                        }
                    },
                }
            }
        ],

        series: [
            {
                name: 'APK',
                data: apk
            },
            {
                name: 'APM',
                data: apm
            },
            {
                name: 'APS',
                data: aps
            }
        ],

        colors: ['#0802A3', '#F99417', '#B4B4B3'],

        chart: {
            type: 'bar'
        },

        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '80%',
                endingShape: 'rounded',
                dataLabels: {
                    position: 'top'
                }
            }
        },

        fill: {
            opacity: 1,
            // colors: ['#0802A3', '#F99417', '#F1EFEF']
        },

        stroke: {
            show: true,
            width: 3,
            colors: ['transparent']
        },

        dataLabels: {
            offsetY: -20,
            style: {
                fontSize: '13px',
                colors: ['#000']
            },
            formatter: function (value) {
                // Menghilangkan desimal dan angka nol di belakang koma
                return value.toLocaleString('id-ID');
            }
        },

        grid: {
            // borderColor: '#000'
        },

        xaxis: {
            categories: ['SD', 'MI', 'SMP', 'MTs'],
            axisBorder: {
                show: true,
                color: '#000',
                height: 2
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    fontSize: '15px',
                    fontWeight: 550,
                    colors: ['#000', '#000', '#000', '#000']
                }
            }
        },

        yaxis: {
            show: false,
            axisBorder: {
                show: true,
                color: '#000',
            },
            axisTicks: {
                show: false
            },
        },

        legend: {
            show: true,
            position: 'top',
            fontSize: '14px',
            // fontWeight: 5,
            itemMargin: {
                horizontal: 20,
                vertical: 0
            },
            markers: {
                width: 14
            }
        },
    }
    var chartAP = new ApexCharts(document.querySelector('#chart-ap'), optionsAP);
    chartAP.render();
})

// Jumlah Pelaksana Pendidikan
onValue(ref(db, 'pendidikan/pelaksanaPendidikan'), (items) => {
    const data = items.val()
    // Membagi data jumlah siswa dan guru
    const jumlahGuru = data.guru;
    const jumlahSiswa = data.siswa;
    // console.log(jumlahGuru)
    // console.log(jumlahSiswa)

    // Mengubah data jumlah guru di elemen HTML
    document.querySelector('[guru-paud]').innerHTML = jumlahGuru.paud.toLocaleString('id-ID')
    document.querySelector('[guru-mi]').innerHTML = jumlahGuru.mi.toLocaleString('id-ID')
    document.querySelector('[guru-sd]').innerHTML = jumlahGuru.sd.toLocaleString('id-ID')
    document.querySelector('[guru-mts]').innerHTML = jumlahGuru.mts.toLocaleString('id-ID')
    document.querySelector('[guru-smp]').innerHTML = jumlahGuru.smp.toLocaleString('id-ID')
    document.querySelector('[guru-ma]').innerHTML = jumlahGuru.ma.toLocaleString('id-ID')

    // Mengubah data jumlah siswa di elemen HTML
    document.querySelector('[siswa-tk]').innerHTML = jumlahSiswa.tk.toLocaleString('id-ID')
    document.querySelector('[siswa-sd]').innerHTML = jumlahSiswa.sd.toLocaleString('id-ID')
    document.querySelector('[siswa-smp]').innerHTML = jumlahSiswa.smp.toLocaleString('id-ID')
    document.querySelector('[siswa-mi]').innerHTML = jumlahSiswa.mi.toLocaleString('id-ID')
    document.querySelector('[siswa-mts]').innerHTML = jumlahSiswa.mts.toLocaleString('id-ID')
    document.querySelector('[siswa-ma]').innerHTML = jumlahSiswa.ma.toLocaleString('id-ID')
})

// Tabel jumlah Sekolah/Perguruan Tinggi
onValue(ref(db, 'pendidikan/jumlahAkademik'), (items) => {
    const data = items.val()
    // Menambahkan baris ke dalam tabel
    data.forEach(item => {
        const dataItem = [item.namaAkademi, item.negeri, item.swasta, item.jumlah]
        tambahBaris('table-akademik', dataItem)
    });
})

// Data Angka Putus Sekolah
onValue(ref(db, 'pendidikan/angkaPutusSekolah'), (items) => {
    const data = items.val()
    // Mengubah data pada elemen HTML
    document.querySelector('[aps-sd]').innerHTML = data.sd.toFixed(2).replace('.', ',') + '%'
    document.querySelector('[aps-mi]').innerHTML = data.mi.toFixed(2).replace('.', ',') + '%'
    document.querySelector('[aps-smp]').innerHTML = data.smp.toFixed(2).replace('.', ',') + '%'
    document.querySelector('[aps-mts]').innerHTML = data.mts.toFixed(2).replace('.', ',') + '%'
    document.querySelector('[deskripsi-data-aps]').innerHTML = data.deskripsi
})

// Tabel Data Perguruan Tinggi
onValue(ref(db, 'pendidikan/perguruanTinggi'), (items) => {
    const data = items.val()
    data.forEach(item => {
        const dataItem = [item.namaPt, item.mahasiswa, item.dosen, item.status]
        tambahBaris('table-perguruan-tinggi', dataItem)
    });
})
