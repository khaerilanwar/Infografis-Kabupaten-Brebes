import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

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
onValue(ref(db, 'dashboard/jumlah'), (items) => {
  const dataJumlah = items.val();

  document.querySelector('[penduduk]').innerHTML = dataJumlah['penduduk'].toLocaleString('id-ID')
  document.querySelector('[kecamatan]').innerHTML = dataJumlah['kecamatan'].toLocaleString('id-ID')
  document.querySelector('[kelurahan]').innerHTML = dataJumlah['kelurahan'].toLocaleString('id-ID')
  document.querySelector('[desa]').innerHTML = dataJumlah['desa'].toLocaleString('id-ID')
});

onValue(ref(db, 'dashboard/ipm'), (items) => {
  const key = [];
  const value = [];
  const dataIPM = items.val();
  // console.log(dataIPM);
  for (let x in dataIPM) {
    key.push(x);
    value.push(dataIPM[x])
  }
  var optionsProfileVisit = {
    annotations: {
      position: 'back'
    },
    dataLabels: {
      enabled: false
    },
    chart: {
      type: 'bar',
      height: 300
    },
    fill: {
      opacity: 1
    },
    series: [{
      name: 'IPM',
      data: value
    }],
    colors: '#435ebe',
    xaxis: {
      categories: key
    },
    yaxis: {
      min: 65.00,
      max: parseInt(Math.max(...value)) + 1,
      tickAmount: 5
    }
  }

  var chartProfileVisit = new ApexCharts(document.querySelector("#chart-profile-visit"), optionsProfileVisit);
  chartProfileVisit.render();
});

