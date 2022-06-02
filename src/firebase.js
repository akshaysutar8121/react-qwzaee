import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app=initializeApp({
  apiKey: 'AIzaSyCuHItoCyS3kq5TfVxD4J8Oqpb5Kahj9Xs',
  authDomain: 'insta-react-project-37465.firebaseapp.com',
  projectId: 'insta-react-project-37465',
  storageBucket: 'insta-react-project-37465.appspot.com',
  messagingSenderId: '559544006345',
  appId: '1:559544006345:web:62196356d6ef08bd3f7f18',
  measurementId: 'G-KJM7C8W5D2',

})

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {db,auth,storage};
