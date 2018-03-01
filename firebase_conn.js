// import firebase from 'firebase';
let firebase = require('firebase');

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
    // console.log(error);
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
});

authPromise.then(() => {
    firebase.database().ref().child('object').set({
        type: '265',
        publish: '357'
    });
    
    // firebase.auth().signOut();
}, (reason) => {
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

// firebase.database().ref().child('object').set({
//     type: '3.14',
//     publish: '159'
// });

// let dbRoot = firebase.database().ref();

// dbRoot.on('value', snap => {
//     console.log(JSON.stringify(snap.val(), null, 3));
// });

// const pushData = () => {
//     firebaseConn.database().ref().child('phantomzone-leon').child('movies').set({
//         type: 'Documentary'
//     })
// }

// pushData();

// let message = {text: 'hey', timestamp: new Date().toString()},
//     ref = firebaseConn.database().ref(),
//     logsRef = ref.child('logs'),
//     messagesRef = ref.child('messages'),
//     messageRef = messagesRef.push(message);

// logsRef.child(messageRef.key).set(message);