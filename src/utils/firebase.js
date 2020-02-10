import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/database';

import firebaseConfig from '../config/firebase.config';

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
