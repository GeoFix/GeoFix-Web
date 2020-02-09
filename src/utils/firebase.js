import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "**HIDDEN_DATA**",
  authDomain: "geofix-4e08e.firebaseapp.com",
  databaseURL: "https://geofix-4e08e.firebaseio.com",
  projectId: "geofix-4e08e",
  storageBucket: "geofix-4e08e.appspot.com",
  messagingSenderId: "619006444915",
  appId: "**HIDDEN_DATA**"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
