'use strict';

import fs from 'fs';
import firebase from 'firebase';
import catListing from './modules/cat_listing';

const config = {
        apiKey: 'AIzaSyDM7aH-HGeu6e0F6IKjgy0gjeoeTqkLGOc',
        authDomain: 'phantomzone-leon.firebaseapp.com',
        databaseURL: 'https://phantomzone-leon.firebaseio.com',
        projectId: 'phantomzone-leon',
        storageBucket: 'phantomzone-leon.appspot.com',
        messagingSenderId: '885937044869'
    },
    email = 'bbddstory@gmail.com',
    password = 'LEON314@firebase';

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        let isAnonymous = user.isAnonymous,
            uid = user.uid;

        console.log('\n======================\n| Firebase signed in |\n======================\n');
    } else {
        // User is signed out
    }
});

let authPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
    // Handle Errors here
    let errCode = err.code,
        errMessage = err.message;
});

authPromise.then(() => {
    new Promise((res, rej) => {
        catListing(res, rej, process.argv[2])
    }).then(catObj => {
        console.log('\n-- Listing completed.');

        fs.writeFileSync('../output/list.json', JSON.stringify(catObj));
        console.log('\n-- Saving completed.');

        for (let p in catObj) {
            for (let i in catObj[p]) {
                firebase.database().ref(p).push(catObj[p][i])
            }
        }
        console.log('\n-- Uploading completed.\n');
    }, reason => {
        console.log('Rejected: ', reason)
    }).catch(err => {
        console.log('Catched: ', err)
    });
}, reason => {
    console.log(reason)
});

// process.exit(-1);
// firebase.auth().signOut();
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });