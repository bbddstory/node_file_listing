//const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDM7aH-HGeu6e0F6IKjgy0gjeoeTqkLGOc",
    authDomain: "phantomzone-leon.firebaseapp.com",
    databaseURL: "https://phantomzone-leon.firebaseio.com",
    projectId: "phantomzone-leon",
    storageBucket: "phantomzone-leon.appspot.com",
    messagingSenderId: "885937044869"
};

firebase.initializeApp(config);

let authPromise = firebase.auth().signInAnonymously().catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
});

authPromise.then(() => {
    firebase.database().ref().child('object').set({
        type: '++++++',
        publish: '++++++'
    });
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