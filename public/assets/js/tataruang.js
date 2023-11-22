import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { camelCase } from './libs.js'

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

// onValue(ref(db, 'tataruang'))

var optionsKondisiJalan = {
    series: [
        {
            name: 'Kondisi Jalan',
            data: [201.49, 241.93, 98.01, 99.30]
        }
    ],
    chart: {
        type: 'bar',
        height: 300
    },
}

var chartKondisiJalan = new ApexCharts(document.querySelector('#chart-kondisi-jalan'), optionsKondisiJalan)
chartKondisiJalan.render()

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
                    textAnchor: 'middle',
                    style: {
                        colors: ['#fff']
                    }
                },
                colors: ['#1F4172', '#E55604', '#219C90'],
                legend: {
                    show: true
                },
            }
        }
    ],
    series: [
        {
            data: [106.44, 144.76, 640.73]
        }
    ],
    chart: {
        type: 'bar',
        height: 300
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        }
    },
    dataLabels: {
        enabled: true,
        formatter: function (val) {
            return val.toLocaleString('id-ID')
        }
    },
    legend: {
        show: false
    },
    xaxis: {
        tickAmount: 7,
        max: 700,
        categories: ['Jalan Nasional', 'Jalan Provinsi', 'Jalan Kabupaten'],
    },
    yaxis: {
        labels: {
            style: {
                fontSize: '13px'
            }
        }
    }
}

var chartPanjangJalan = new ApexCharts(document.querySelector('#chart-panjang-jalan'), optionsPanjangJalan)
chartPanjangJalan.render()