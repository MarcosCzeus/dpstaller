import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC1_WO3RsSl-cdceRbGziU9D9g3X6AaNZU",
  authDomain: "ndehhh-54d17.firebaseapp.com",
  projectId: "ndehhh-54d17",
  storageBucket: "ndehhh-54d17.appspot.com",
  messagingSenderId: "254995930126",
  appId: "1:254995930126:web:9e7b561b6780ad7ae6705f"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db};