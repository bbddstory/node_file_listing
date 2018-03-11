'use strict';

import fs from 'fs';
import ora from 'ora';
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
    password = 'LEON314@firebase',
    spinner = ora();

console.log('\n');
spinner.start('Signing into Firebase...');

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        let isAnonymous = user.isAnonymous,
        uid = user.uid;
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
    spinner.succeed('Signed into Firebase.');
    console.log('\n');

    new Promise((res, rej) => {
        catListing(res, rej, process.argv[2], firebase)
    }).then(catObj => {
        console.log('\n∩ Listing completed.');

        fs.writeFileSync('../output/list.json', JSON.stringify(catObj));
        console.log('\n∩ Saving completed.');

        for (let p in catObj) {
            for (let i in catObj[p]) {
                firebase.database().ref(p).push(catObj[p][i], err => {
                    console.log('\n∩ Uploading completed.\n');
                    process.exit(-1);
                })
            }
        }
    }, reason => {
        console.log('∞ Rejected:', reason);
        process.exit(-1);
    }).catch(err => {
        console.log('∞ Catched:', err);
        process.exit(-1);
    });
}, reason => {
    console.log(reason)
});

// Special symbols: → ∞ ∩

// firebase.auth().signOut();
// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });