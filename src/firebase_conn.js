'use strict';

import firebase from 'firebase';

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
    firebase.database().ref('Movies')
        // .orderByChild('year').startAt('2016').endAt('2017')
        .orderByChild('index').startAt(12).endAt(23)
        // .limitToFirst(3)
        .once('value').then((snapshot) => {
        let value = snapshot.val();
        let c = 1;

        console.log(value);
        
        
        // for(let i in value) {
        //     console.log(c);
        //     c = c + 1;
            
        //     for(let j in value) {
        //         if(i !== j && value[i].engTitle.toLowerCase() === value[j].engTitle.toLowerCase()) {
        //             console.log(value[i]);
        //             console.log('\n');
        //         }
        //     }
        // }
    });

    // firebase.database().ref('Animations').orderByChild('engTitle').equalTo('Neo Tokyo').once('value').then(snapshot => {
    //     console.log('then()\n')
    //     console.log(snapshot.val())
    // }, fail => {
    //     console.log('then() failed\n')
    // });

    // Both of the following commands work
    // firebase.database().ref('Documentaries/-L71xVTXsB-f6q1PxXoF/production').set('BBC');
    // firebase.database().ref('Documentaries').child('-L71xVTXsB-f6q1PxXoF').child('production').set('n/a');

    // firebase.auth().signOut();
}, reason => {
    console.log(reason);    
});