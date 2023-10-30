import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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

function keyToWord(kata) {
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

// DATA WILAYAH
// Luas Daerah
onValue(ref(db, 'demografi/wilayah'), (items) => {
    document.querySelector('[luas-daerah]').innerHTML = items.val()['luasDaerah'].toLocaleString('id-ID') + ' km²';
    document.querySelector('[nama-kecamatan-terluas]').innerHTML = items.val()['kecamatanTerluas']['nama'];
    document.querySelector('[luas-kecamatan-terluas]').innerHTML = items.val()['kecamatanTerluas']['luas'].toLocaleString('id-ID');
})

onValue(ref(db, 'demografi/lahanBukanSawah'), (items) => {
    const data = items.val();
    const key = [], value = [];
    for (let x in data) {
        key.push(keyToWord(x));
        value.push(data[x])
    }

    var optionsLahanBukanSawah = {
        series: [{
            name: "Luas Lahan",
            data: value
        }],

        title: {
            text: 'Lahan Bukan Sawah',
            align: 'center',
            margin: 15,
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
            }
        },

        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px',
                // fontFamily: 'Poppins, Arial, sans-serif'
            },
            formatter: function (value) {
                // Menghilangkan desimal dan angka nol di belakang koma
                return value.toLocaleString('id-ID');
            }
        },

        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },

        stroke: {
            curve: 'smooth'
        },

        grid: {
            show: false,
            position: 'back',
        },

        xaxis: {
            type: 'category',
            categories: key,
            title: 'Jenis Lahan',
            position: 'bottom',
            labels: {
                show: true,
                style: {
                    colors: '#000',
                    fontSize: '14px'
                }
            },
            axisBorder: {
                show: true,
                borderType: 'solid',
                color: '#000'
            },
            axisTicks: {
                show: true,
                color: '#000'
            },

        },

        yaxis: {
            title: {
                text: 'Luas Lahan (ha)',
                style: {
                    fontSize: '12px',
                    fontWeight: 600
                }
            },
            min: 0,
            max: 520,
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
                style: {
                    fontSize: '12px'
                },
                formatter: function (value) {
                    // Menghilangkan desimal dan angka nol di belakang koma
                    return parseInt(value);
                }
            }
        },

        tooltip: {
            y: {
                formatter: function (value) {
                    // Biarkan nilai yang ditampilkan saat menghover tetap seperti data aslinya
                    return value;
                }
            }
        },
    };

    var chartLahanBukanSawah = new ApexCharts(document.querySelector("#chart-lahan"), optionsLahanBukanSawah);
    chartLahanBukanSawah.render();

})

onValue(ref(db, 'demografi/luasKemiringanLahan'), (items) => {
    const data = items.val();
    const key = [], value = [];
    for (let x in data) {
        key.push(keyToWord(x));
        value.push(data[x]);
    }

    var optionsKemiringanLahan = {
        responsive: [
            {
                breakpoint: 768,
                options: {
                    legend: {
                        show: true
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        }
                    },

                    yaxis: {
                        show: true,
                        axisTicks: {
                            show: true,
                            color: '#000'
                        },
                        labels: {
                            style: {
                                fontSize: '12px'
                            },
                            formatter: function (value) {
                                // Menghilangkan desimal dan angka nol di belakang koma
                                return value.toLocaleString('id-ID');
                            }
                        },
                        axisBorder: {
                            show: true,
                            borderType: 'solid',
                            color: '#000'
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '8px'
                        },
                        formatter: function (value) {
                            // Menghilangkan desimal dan angka nol di belakang koma
                            return value.toLocaleString('id-ID');
                        }
                    },
                }
            }
        ],

        series: [{
            name: 'Luas Kemiringan Lahan',
            data: value
        }],

        chart: {
            type: 'bar',
            height: 300
        },

        colors: ['#1F4172', '#EE9322', '#D80032', '#004225'],

        plotOptions: {
            bar: {
                distributed: true,
            }
        },

        fill: {
            opacity: 1
        },


        dataLabels: {
            enabled: true,
            style: {
                fontSize: '14px'
            },
            formatter: function (value) {
                // Menghilangkan desimal dan angka nol di belakang koma
                return value.toLocaleString('id-ID');
            }
        },

        legend: {
            show: false
        },


        title: {
            text: 'Lahan Kemiringan Lahan (ha)',
            align: 'center',
            margin: 15,
            style: {
                fontSize: '20px',
                fontWeight: 'bold',
            }
        },

        xaxis: {
            categories: key,
            axisBorder: {
                show: true,
                borderType: 'solid',
                color: '#000'
            },
            axisTicks: {
                show: false,
                color: '#000'
            },
            labels: {
                style: {
                    fontSize: '15px',
                    fontWeight: 550
                }
            }
        },

        grid: {
            show: true,
            borderColor: '#000',
        },

        yaxis: {
            show: true,
            axisTicks: {
                show: true,
                color: '#000'
            },
            labels: {
                style: {
                    fontSize: '15px'
                },
                formatter: function (value) {
                    // Menghilangkan desimal dan angka nol di belakang koma
                    return value.toLocaleString('id-ID');
                }
            },
            axisBorder: {
                show: true,
                borderType: 'solid',
                color: '#000'
            },
        }
    }
    var chartKemiringanLahan = new ApexCharts(document.querySelector('#chart-kemiringan-lahan'), optionsKemiringanLahan);
    chartKemiringanLahan.render();
})

onValue(ref(db, 'demografi/dataJumlah'), (items) => {
    const data = items.val();
    document.querySelector('[jumlah-kecamatan]').innerHTML = data['kecamatan'];
    document.querySelector('[jumlah-kelurahan]').innerHTML = data['kelurahan'];
    document.querySelector('[jumlah-desa]').innerHTML = data['desa'];
    document.querySelector('[jumlah-rt]').innerHTML = data['rt'].toLocaleString('id-ID');
    document.querySelector('[jumlah-rw]').innerHTML = data['rw'].toLocaleString('id-ID');
    document.querySelector('[jumlah-sungai]').innerHTML = data['sungai'];
    document.querySelector('[jumlah-waduk]').innerHTML = data['waduk'];
    document.querySelector('[jumlah-curah-hujan]').innerHTML = data['curahHujan'].toLocaleString('id-ID');
    document.querySelector('[jumlah-hari-hujan]').innerHTML = data['hariHujan'].toLocaleString('id-ID');

    document.querySelector('[jumlah-kk]').innerHTML = data['penduduk']['kk'].toLocaleString('id-ID')+' KK';
    document.querySelector('[kepadatan-penduduk]').innerHTML = data['penduduk']['kepadatan'].toLocaleString('id-ID')+' jiwa/km²';
    document.querySelector('[usia-produktif]').innerHTML = data['penduduk']['usiaProduktif'].toLocaleString('id-ID')+'%';
    document.querySelector('[sex-ratio]').innerHTML = data['penduduk']['sexRatio'].toLocaleString('id-ID');
    document.querySelector('[jumlah-jiwa]').innerHTML = data['penduduk']['jumlahJiwa'].toLocaleString('id');
    document.querySelector('[jumlah-pria]').innerHTML = data['penduduk']['pria'].toLocaleString('id-ID');
    document.querySelector('[jumlah-wanita]').innerHTML = data['penduduk']['wanita'].toLocaleString('id-ID');

    var optionsGender = {
        responsive: [
            {
                breakpoint: 576,
                options: {
                    plotOptions: {
                        pie: {
                            offsetX: 0,
                            dataLabels: {
                                offset: -30
                            }
                        }
                    },
                    legend: {
                        show: true,
                        position: 'bottom',
                        fontSize: '15px',
                        inverseOrder: true,
                        offsetX: 0,
                        itemMargin: {
                            horizontal: 10,
                            vertical: 0
                        }
                    }
                }
            }
        ],
        series: [data['penduduk']['pria'], data['penduduk']['wanita']],
        labels: ['Laki-laki', 'Perempuan'],
        colors: ['#4D7CD8', '#E5518D'],
        chart: {
            width: 332,
            type: 'pie'
        },
        plotOptions: {
            pie: {
                offsetX: -40,
                dataLabels: {
                    offset: -30
                }
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '20px',
            },
            dropShadow: {
                enabled: false
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '15px',
            inverseOrder: true,
            offsetX: -95,
            itemMargin: {
                horizontal: 10,
                vertical: 0
            }
        }
    
    }
    
    var chartGender = new ApexCharts(document.querySelector("#chart-gender"), optionsGender);
    
    chartGender.render();
})