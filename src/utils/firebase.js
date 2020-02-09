import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCw55u3Kr5J6DGP-qMgiB6H883QoO6JY0o",
  authDomain: "geofix-4e08e.firebaseapp.com",
  databaseURL: "https://geofix-4e08e.firebaseio.com",
  projectId: "geofix-4e08e",
  storageBucket: "geofix-4e08e.appspot.com",
  messagingSenderId: "619006444915",
  appId: "1:619006444915:web:070740a026e930d0123106"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
