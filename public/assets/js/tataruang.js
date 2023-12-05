import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase, idHtml } from './libs.js'

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

// Data Rumah Layak dan Tidak Layak Huni dan Jalan Poros Desa
onValue(ref(db, 'tataruang/rumahJalanPoros'), items => {
    const data = items.val()
    for (let key in data) {
        document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID')
    }
})

// Data Irigasi
onValue(ref(db, 'tataruang/irigasi'), items => {
    const data = items.val()
    for (let key in data) {
        document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID')
    }
})

// Data Kondisi Jalan
onValue(ref(db, 'tataruang/kondisiJalan'), items => {
    const data = items.val()
    const keysData = ['Baik', 'Sedang', 'Rusak', 'Rusak Berat']
    const valuesData = [data.baik, data.sedang, data.rusak, data.rusakBerat]
    var optionsKondisiJalan = {
        responsive: [
            {
                breakpoint: 768,
                options: {
                    dataLabels: {
                        enabled: false
                    },
                    xaxis: {
                        axisBorder: {
                            show: true,
                            offsetX: -1,
                            offsetY: -1
                        }
                    },
                    yaxis: {
                        tickAmount: 5,
                        max: Math.ceil(Math.max(...valuesData) / 50) * 50,
                        labels: {
                            show: true,
                            formatter: function (val) {
                                return val.toLocaleString('id-ID')
                            }
                        },
                        axisTicks: {
                            show: true,
                            color: '#000'
                        },
                        axisBorder: {
                            show: true,
                            color: '#000'
                        }
                    }
                }
            }
        ],
        series: [
            {
                name: 'Kondisi Jalan',
                data: valuesData
            }
        ],
        chart: {
            type: 'bar',
            height: 300,
            zoom: {
                enabled: false
            }
        },
        fill: {
            opacity: 1
        },
        dataLabels: {
            enabled: true,
            offsetY: 20,
            formatter: function (val) {
                return `${val.toLocaleString('id-ID')} km`
            }
        },
        grid: {
            show: true,
            position: 'back'
        },
        xaxis: {
            categories: keysData,
            axisBorder: {
                show: true,
                color: '#000',
                offsetY: -1.5
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            max: Math.ceil(Math.max(...valuesData) / 50) * 50,
            tickAmount: 5,
            axisBorder: {
                show: true,
                color: '#000'
            },
            axisTicks: {
                show: true,
                color: '#000'
            },
            labels: {
                formatter: function (value) {
                    // Menghilangkan desimal dan angka nol di belakang koma
                    return value.toLocaleString('id-ID');
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 5,
                borderRadiusApplication: 'end'
            }
        }
    }
    var chartKondisiJalan = new ApexCharts(document.querySelector('#chart-kondisi-jalan'), optionsKondisiJalan)
    chartKondisiJalan.render()
})

// Data Panjang Jalan
onValue(ref(db, 'tataruang/panjangJalan'), items => {
    const data = items.val()
    const keysData = ['Jalan Nasional', 'Jalan Provinsi', 'Jalan Kabupaten']
    const valuesData = [106.44, 144.76, 640.73]
    var optionsPanjangJalan = {
        responsive: [
            {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false,
                        textAnchor: 'middle',
                        style: {
                            colors: ['#fff']
                        }
                    },
                    colors: ['#1F4172', '#E55604', '#219C90'],
                    legend: {
                        fontSize: '14px',
                        show: true,
                        position: 'bottom',
                        itemMargin: {
                            horizontal: 10,
                            vertical: 8
                        },
                    },
                }
            }
        ],
        series: [
            {
                data: valuesData
            }
        ],
        chart: {
            type: 'bar',
            height: 300
        },
        colors: ['#26577C'],
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return `${val.toLocaleString('id-ID')} km`
            }
        },
        legend: {
            show: false
        },
        xaxis: {
            tickAmount: 7,
            max: Math.ceil(Math.max(...valuesData) / 50) * 50,
            categories: keysData,
            axisBorder: {
                show: true,
                color: '#000'
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#000',
                width: 6
            },
        },
        yaxis: {
            axisBorder: {
                show: true,
                color: '#860A35'
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: '#000',
                width: 6
            },
            labels: {
                style: {
                    fontSize: '13px'
                }
            },
        }
    }
    var chartPanjangJalan = new ApexCharts(document.querySelector('#chart-panjang-jalan'), optionsPanjangJalan)
    chartPanjangJalan.render()
})

// Data Akses Sanitasi
onValue(ref(db, 'tataruang/aksesSanitasi'), items => {
    const data = items.val()
    for (const key in data) {
        if (key === 'prosentasePendudukDenganAksesSanitasi') {
            document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID') + ' %'
        } else {
            document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID')
        }
    }
})

// Data Jembatan
onValue(ref(db, 'tataruang/jembatan'), items => {
    const data = items.val()
    for (const key in data) {
        if (key === 'panjangJembatan') {
            document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID') + ' m'
        } else {
            document.querySelector(`[${idHtml(key)}]`).innerHTML = data[key].toLocaleString('id-ID')
        }
    }
})