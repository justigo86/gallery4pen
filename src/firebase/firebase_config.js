// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/database';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyClV6hATGG1i4-F_nrDpafEdCWG2BXLpZc",
    authDomain: "gallery4pen.firebaseapp.com",
    projectId: "gallery4pen",
    storageBucket: "gallery4pen.appspot.com",
    messagingSenderId: "138354369327",
    appId: "1:138354369327:web:795dfd394ad67c522eb7da",
    measurementId: "G-0EXXM7KBXL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const storage = firebase.storage();
  const firestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { storage, firestore, timestamp };