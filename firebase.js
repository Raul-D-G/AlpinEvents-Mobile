// Import the functions you need from the SDKs you need

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9gdgYlt5rLI1wAUNkvzuwhUbPLcYoUHY',
  authDomain: 'alpineventsbackend.firebaseapp.com',
  projectId: 'alpineventsbackend',
  storageBucket: 'alpineventsbackend.appspot.com',
  messagingSenderId: '998781478960',
  appId: '1:998781478960:web:6d538151d6f9fb36c425f5',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export {auth};
