"use strict";

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
};
const email = 'bbddstory@gmail.com';
const password = 'LEON314@firebase';

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        let isAnonymous = user.isAnonymous,
            uid = user.uid;

        console.log('\n======================');
        console.log('| Firebase signed in |');
        console.log('======================');
        console.log('\n-- Uploading completed.\n');
    } else {
        // User is signed out.
    }
});

let authPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
});

authPromise.then(() => {
    let catObj = catListing(process.argv[2]);
    console.log('\n-- Listing completed.');
    
    fs.writeFileSync('../output/list.json', JSON.stringify(catObj));
    console.log('\n-- Saving completed.');
    
    for (let p in catObj) {
        for (let i in catObj[p]) {
            firebase.database().ref().child(p).push(catObj[p][i]);
        }
    }
    
    // process.exit(-1);
    // firebase.auth().signOut();
}, reason => {
    console.log(reason);
});

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });