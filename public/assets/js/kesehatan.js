import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtZWZ7x8d1l2cTWgc-kFO5ZlzXV7dcPaM",
    authDomain: "infografis-kominfo.firebaseapp.com",
    databaseURL: "https://infografis-kominfo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "infografis-kominfo",
    storageBucket: "infografis-kominfo.appspot.com",
    messagingSenderId: "894598154392",
    appId: "1:894598154392:web:98143b3f2efb2dd7e8e8ed",
    measurementId: "G-DHSWEGSG03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

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
        data: [274, 462, 975]
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
    // title: {
    //     text: 'Tempat Tidur Rawat Inap',
    //     align: 'center',
    //     style: {
    //         fontSize: '18px',
    //         fontWeight: 600
    //     }
    // },
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