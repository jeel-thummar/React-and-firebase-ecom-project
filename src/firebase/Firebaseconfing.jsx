import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9bQYlas_d4zgiKg1SIQk37vXt8uUYihU",
  authDomain: "mye-com-fb710.firebaseapp.com",
  projectId: "mye-com-fb710",
  storageBucket: "mye-com-fb710.appspot.com",
  messagingSenderId: "365199888352",
  appId: "1:365199888352:web:2ff4eb15c52fc672742585"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }