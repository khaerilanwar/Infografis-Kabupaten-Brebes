import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { keyToWord, tambahBaris } from "./libs.js";

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

onValue(ref(db, 'pemerintahan/asn'), (items) => {
    const data = items.val();
    let totalASN = 0;
    const pria = [], wanita = [];
    for (let x in data) {
        let row = data[x];
        pria.push(row.pria)
        wanita.push(row.wanita)
        for (let y in row) {
            totalASN += row[y]
        }
    }

    // SET TOTAL ASN
    document.querySelector('[jumlah-asn]').innerHTML = totalASN.toLocaleString('id-ID');

    // SET DATA FOR CHART ASN
    var optionsASN = {
        series: [
            {
                name: 'Laki-laki',
                data: pria
            },
            {
                name: 'Perempuan',
                data: wanita
            }
        ],

        chart: {
            type: 'bar',
            // height: 300
        },

        fill: {
            opacity: 1
        },

        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                borderRadiusApplication: 'end',
                barHeight: '80%',
                barWidth: '40%',
                dataLabels: {
                    position: 'top'
                }
            }
        },

        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            },
            formatter: function (value) {
                // Menghilangkan desimal dan angka nol di belakang koma
                return value.toLocaleString('id-ID');
            }
        },

        stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
        },

        tooltip: {
            shared: true,
            intersect: false
        },

        grid: {
            borderColor: '#000'
        },

        legend: {
            fontSize: '14px',
            itemMargin: {
                horizontal: 15
            },
            markers: {
                radius: 100
            }
        },

        // title: {
        //     text: 'TOTAL PNS dan PPPK',
        //     align: 'center',
        //     style: {
        //         fontSize: '20px',
        //         fontWeight: 600
        //     }
        // },

        dataLabels: {
            offsetY: 20,
            style: {
                fontSize: '16px'
            },
            formatter: function (value) {
                // Menghilangkan desimal dan angka nol di belakang koma
                return value.toLocaleString('id-ID');
            }
        },

        xaxis: {
            categories: ['PNS dan CPNS', 'PPPK'],
            axisBorder: {
                color: '#000'
            },
            // axisTicks: {
            //     color: '#000'
            // },
            labels: {
                style: {
                    fontSize: '16px',
                    fontWeight: 550
                }
            }
        },

        yaxis: {
            axisTicks: {
                show: true,
                color: '#000'
            },
            axisBorder: {
                show: true,
                color: '#000'
            },
            labels: {
                style: {
                    fontSize: '14px'
                },
                formatter: function (value) {
                    // Menghilangkan desimal dan angka nol di belakang koma
                    return value.toLocaleString('id-ID');
                }
            }
        }
    }
    var chartASN = new ApexCharts(document.querySelector('#chart-asn'), optionsASN);
    chartASN.render();

})

onValue(ref(db, 'pemerintahan/pendidikanASN'), (items) => {
    const data = items.val();

    data.forEach(item => {
        // define data dalam bentuk list
        const dataItem = [item.jenjang, item.perempuan, item.lakiLaki, item.jumlah]
        tambahBaris('data-table-asn', dataItem);
    });

})

onValue(ref(db, 'pemerintahan/skpd'), (items) => {
    const data = items.val();
    let totalSKPD = 0;
    for (let key in data) {
        totalSKPD += data[key]
    }
    // Mengubah nilai SKPD
    document.querySelector('[sekda]').innerHTML = data.sekda;
    document.querySelector('[dprd]').innerHTML = data.dprd;
    document.querySelector('[inspektorat]').innerHTML = data.inspektorat;
    document.querySelector('[dinas]').innerHTML = data.dinas;
    document.querySelector('[badan]').innerHTML = data.badan;
    document.querySelector('[satpol-pp]').innerHTML = data.satpolPP;
    document.querySelector('[kecamatan]').innerHTML = data.kecamatan;
    document.querySelector('[kelurahan]').innerHTML = data.kelurahan;
    document.querySelector('[rsud]').innerHTML = data.rsud;
    document.querySelector('[skpd]').innerHTML = `${totalSKPD} SKPD`
})

onValue(ref(db, 'pemerintahan/pejabat'), (items) => {
    const data = items.val();

    // DIAGRAM PEJABAT STRUKTURAL
    const pejabatStruktural = data.struktural;
    var optionsPejabatStruktural = {
        series: [pejabatStruktural.eselon2, pejabatStruktural.eselon3, pejabatStruktural.eselon4],
        labels: ['Eselon II', 'Eselon III', 'Eselon IV'],
        colors: ['#3876BF', '#F99417', '#BFCCB5'],
        chart: {
            // width: 320,
            height: 330,
            type: 'pie'
        },
        plotOptions: {
            pie: {
                // offsetX: -40,
                dataLabels: {
                    offset: -30
                }
            }
        },
        title: {
            text: 'Pejabat Struktural',
            // align: 'center',
            offsetX: 40,
            style: {
                fontSize: '25px',
                fontWeight: 'bold'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '18px',
            },
            dropShadow: {
                enabled: false
            },
            formatter: function (val, opts) {
                return opts.w.globals.series[opts.seriesIndex];
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.8
                },
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '13px',
            // inverseOrder: true,
            // offsetX: -95,
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        }

    }
    var chartPejabatStruktural = new ApexCharts(document.querySelector('#chart-pejabat-struktural'), optionsPejabatStruktural);
    chartPejabatStruktural.render();

    // DIAGRAM PEJABAT FUNGSIONAL
    const pejabatFungsional = data.fungsional;
    const key = [], value = [];
    for (let x in pejabatFungsional) {
        key.push(keyToWord(x))
        value.push(pejabatFungsional[x])
    }
    var optionsPejabatFungsional = {
        series: value,
        labels: key,
        colors: ['#E9B824', '#D83F31'],
        chart: {
            // width: 320,
            height: 330,
            type: 'pie'
        },
        plotOptions: {
            pie: {
                // offsetX: -40,
                dataLabels: {
                    offset: -30
                }
            }
        },
        title: {
            text: 'Pejabat Fungsional',
            // align: 'center',
            offsetX: 25,
            style: {
                fontSize: '25px',
                fontWeight: 'bold'
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '18px',
            },
            dropShadow: {
                enabled: false
            },
            formatter: function (val, opts) {
                return opts.w.globals.series[opts.seriesIndex];
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.8
                },
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '13px',
            inverseOrder: true,
            // offsetX: -25,
            // floating: true,
            // itemMargin: {
            //     horizontal: 5,
            //     vertical: 0
            // }
        }

    }
    var chartPejabatFungsional = new ApexCharts(document.querySelector('#chart-pejabat-fungsional'), optionsPejabatFungsional);
    chartPejabatFungsional.render();
})