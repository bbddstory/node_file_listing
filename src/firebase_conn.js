'use strict';

import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDM7aH-HGeu6e0F6IKjgy0gjeoeTqkLGOc",
    authDomain: "phantomzone-leon.firebaseapp.com",
    databaseURL: "https://phantomzone-leon.firebaseio.com",
    projectId: "phantomzone-leon",
    storageBucket: "phantomzone-leon.appspot.com",
    messagingSenderId: "885937044869"
};
const email = 'bbddstory@gmail.com';
const password = 'LEON314@firebase';

firebase.initializeApp(config);

let authPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
});

authPromise.then(() => {
    // firebase.database().ref('Documentaries').once('value').then(function (snapshot) {
    //     let value = snapshot.val();
    //     console.log(value);

    //     process.exit(-1);
    // });

    // firebase.database().ref('Movies').orderByChild("rating").equalTo("8.6").once('value').then(function (snapshot) {
    //     let value = snapshot.val();
    //     console.log(value);

    //     process.exit(-1);
    // });

    let obj = {
        "2016 - XXXXXXXXXXXXXXXX": {
            "title": "2016 - Dawson City Frozen Time",
            "type": "documentary",
            "status": "true"
        }
    };

    let inner = {
        "title": "2016 - Dawson City Frozen Time",
        "type": "documentary",
        "status": "true"
    };

    // firebase.database().ref('Documentaries').set(obj)

    // firebase.database().ref().child('Animations').set({
    //     type: '------',
    //     publish: '======'
    // });
    // firebase.auth().signOut();
}, reason => {
    console.log(reason);
});

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        let isAnonymous = user.isAnonymous,
            uid = user.uid;

        console.log(isAnonymous);
        console.log(uid);
    } else {
        // User is signed out.
    }
});

// let dbRoot = firebase.database().ref();

// dbRoot.on('value', snap => {
//     console.log(JSON.stringify(snap.val(), null, 3));
// });