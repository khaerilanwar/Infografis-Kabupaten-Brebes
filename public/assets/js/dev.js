import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, child, push, update } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { sortCustom, tambahBaris } from "./libs.js";

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

onValue(ref(db, 'mahasiswa'), (items) => {
    const data = items.val()
    // console.log(data)
    const dataUji = data[0]
    const dataUpdate = {
        nama: 'Kak Anwar Sayang',
        nim: 12210952,
    }

    const updates = {}

    updates['/mahasiswa/0'] = dataUji
    updates['/mahasiswa/0'] = dataUpdate

    update(ref(db), updates)
})

// function writeNewPost(uid, username, picture, title, body) {
//     const db = getDatabase();

//     // A post entry.
//     const postData = {
//         author: username,
//         uid: uid,
//         body: body,
//         title: title,
//         starCount: 0,
//         authorPic: picture
//     };

//     // Get a key for a new Post.
//     const newPostKey = push(child(ref(db), 'posts')).key;

//     // Write the new post's data simultaneously in the posts list and the user's post list.
//     const updates = {};
//     updates['/posts/' + newPostKey] = postData;
//     updates['/user-posts/' + uid + '/' + newPostKey] = postData;

//     return update(ref(db), updates);
// }