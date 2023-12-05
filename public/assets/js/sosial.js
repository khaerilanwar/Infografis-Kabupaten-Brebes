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

onValue(ref(db, 'sosial'), items => {
    const data = items.val()
    for (const key in data) {
        const dataItems = data[key]
        if (key === 'programPerlindunganJaminanSosial') {
            var optionsPPJS = {
                series: [dataItems.jumlahPkh, dataItems.jumlahBpnt, dataItems.jumlahBpjsPbi],
                labels: ['PKH', 'BPNT', 'BPJS PBI'],
                colors: ['#4D7CD8', '#E5518D', '#CD5C08'],
                chart: {
                    width: 380,
                    type: 'pie'
                },
                dataLabels: {
                    enabled: true,
                    dropShadow: {
                        enabled: false
                    },
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val) {
                            return val.toLocaleString('id-ID')
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        offsetX: -30,
                        dataLabels: {
                            offset: -15
                        },
                    }
                },
                legend: {
                    show: true,
                    position: 'bottom',
                    offsetX: -80,
                    fontSize: '14px',
                    horizontalAlign: 'center',
                    itemMargin: {
                        horizontal: 10,
                        vertical: 2
                    }
                }
            }
            var chartPPJS = new ApexCharts(document.querySelector("#chart-ppjs"), optionsPPJS);
            chartPPJS.render();
        }
        for (const keyItem in dataItems) {
            const element = document.querySelector(`[${idHtml(keyItem)}]`)
            if (typeof dataItems[keyItem] === 'number') {
                element.innerHTML = dataItems[keyItem].toLocaleString('id-ID')
            } else {
                element.innerHTML = dataItems[keyItem]
            }
        }
    }
})