import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, capitalizeFirstLetter, capitalizeWords, keyToWord } from './libs.js'

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

// Data jumlah BPJS
onValue(ref(db, 'kesehatan/bpjs'), items => {
    const data = items.val()
    // Merubah nilai pada element HTML
    document.querySelector('[bpjs-pbi]').innerHTML = data.pbi.toLocaleString('id-ID')
    document.querySelector('[bpjs-non-pbi]').innerHTML = data.nonPbi.toLocaleString('id-ID')
})

// Data Angka kematian ibu dan anak
onValue(ref(db, 'kesehatan/kematian'), items => {
    const data = items.val()
    // Mengubah nilai pada element HTML
    document.querySelector('[kematian-ibu]').innerHTML = data.kematianIbu.toLocaleString('id-ID')
    document.querySelector('[kematian-bayi]').innerHTML = data.kematianBayi.toLocaleString('id-ID')
})

// Data Tempat Tidur Rawat Inap
onValue(ref(db, 'kesehatan/tempatTidurRawatInap'), items => {
    const data = items.val()

    // Bar Chart Tempat Tidur Rawat Inap
    var optionsTempatTidurRawatInap = {
        responsive: [
            {
                breakpoint: 768,
                options: {
                    legend: {
                        show: true,
                        markers: {
                            radius: 100
                        },
                    },
                    xaxis: {
                        labels: {
                            show: false
                        }
                    }
                }
            }
        ],
        series: [{
            name: 'Tempat Tidur Rawat Inap',
            data: [data.puskesmas, data.rsPemerintah, data.rsSwasta]
        }],
        chart: {
            type: 'bar',
            height: 280
        },
        legend: {
            show: false
        },
        colors: ['#54B435', '#3B44F6', '#FF0060'],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        },
        xaxis: {
            categories: ['Puskesmas', 'RS Pemerintah', 'RS Swasta'],
            axisBorder: {
                show: true,
                color: '#000'
            },
            labels: {
                show: true,
                style: {
                    colors: '#000',
                    fontSize: '13px',
                },
            },
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#000'
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#000'
            }
        },
        dataLabels: {
            style: {
                fontSize: '15px'
            },
        },
        fill: {
            opacity: 1
        },
    }
    var chartTempatTidurRawatInap = new ApexCharts(document.querySelector('#chart-tempat-tidur-rawat-inap'), optionsTempatTidurRawatInap)
    chartTempatTidurRawatInap.render()
})

// Data Sarana Kesehatan
onValue(ref(db, 'kesehatan/saranaKesehatan'), items => {
    const data = items.val()
    // Merubah data pada element HTML
    const elementsSaranaKesehatan = document.querySelectorAll('[sarkes]')
    for (const element of elementsSaranaKesehatan) {
        element.innerHTML = data[camelCase(element.getAttribute('sarkes'))]
    }
})

// Data Tenaga Medis
onValue(ref(db, 'kesehatan/tenagaMedis'), items => {
    const data = items.val()
    // Merubah data pada element HTML
    const cardTenagaMedis = document.querySelectorAll('[card]')
    for (const card of cardTenagaMedis) {
        let keyCard = camelCase(card.getAttribute('card'))
        card.querySelector('[asn]').innerHTML = data[keyCard]['asn'].toLocaleString('id-ID')
        card.querySelector('[non-asn]').innerHTML = data[keyCard]['nonAsn'].toLocaleString('id-ID')
    }
})

// Data Posyandu
onValue(ref(db, 'kesehatan/posyandu'), items => {
    const data = items.val()
    // Mengubah data pada element HTML
    for (let key in data) {
        document.querySelector(`[${key}]`).innerHTML = data[key].toLocaleString('id-ID')
    }
    let sumPosyandu = Object.values(data).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    document.querySelector('[jumlah-posyandu]').innerHTML = sumPosyandu.toLocaleString('id-ID')
})

// Data Grafik Penyakit TBC
onValue(ref(db, 'kesehatan/penyakitTbc'), items => {
    const data = items.val()
    // Card Total Penderita
    document.querySelector('[penderita-tbc]').innerHTML = (data.lakiLaki + data.perempuan).toLocaleString('id-ID')

    // Pie Chart Penyakit TBC
    var optionsChartTBC = {
        chart: {
            type: 'donut'
        },
        series: [data.lakiLaki, data.perempuan],
        labels: ['Laki-laki', 'Perempuan'],
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false
            },
        },
        colors: ['#4D7CD8', '#E5518D'],
        legend: {
            show: true,
            position: 'bottom',
            inverseOrder: true
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                    labels: {
                        show: false
                    }
                }
            },
        }
    }
    var chartTBC = new ApexCharts(document.querySelector('#chart-tbc'), optionsChartTBC)
    chartTBC.render()
})

// Data Grafik Penyakit DBD
onValue(ref(db, 'kesehatan/penyakitDbd'), items => {
    const data = items.val()
    // Card Total Penderita
    document.querySelector('[penderita-dbd]').innerHTML = (data.lakiLaki + data.perempuan).toLocaleString('id-ID')

    // Pie Chart Penyakit DBD
    var optionsChartDBD = {
        chart: {
            type: 'donut'
        },
        series: [data.lakiLaki, data.perempuan],
        labels: ['Laki-laki', 'Perempuan'],
        dataLabels: {
            dropShadow: {
                enabled: false
            }
        },
        colors: ['#4D7CD8', '#E5518D'],
        legend: {
            show: true,
            position: 'bottom',
            inverseOrder: true
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                }
            },
        }
    }
    var chartDBD = new ApexCharts(document.querySelector('#chart-dbd'), optionsChartDBD)
    chartDBD.render()
})

// Jumlah Pasien Puskesmas
onValue(ref(db, 'kesehatan/pasienPuskesmas'), items => {
    const data = items.val()
    document.querySelector('[pasien-puskesmas]').innerHTML = data.toLocaleString('id-ID')
})