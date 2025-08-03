// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8Znyi6UwkT5qH222LH3wC8AO2JzJIDrQ",
  authDomain: "blog-mern-7af07.firebaseapp.com",
  projectId: "blog-mern-7af07",
  appId: "1:997231135703:web:2d98d9653f8c0c76085992",
  // other config values if needed
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
