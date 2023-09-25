// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0m8NMKhJEl7Y9ydels32T4jD0XLEyAdo",
  authDomain: "in-food-c46b4.firebaseapp.com",
  projectId: "in-food-c46b4",
  storageBucket: "in-food-c46b4.appspot.com",
  messagingSenderId: "236660884581",
  appId: "1:236660884581:web:2166e0713b6b7615ad328c",
  measurementId: "G-DYT0T1YLGK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const Provider = new GoogleAuthProvider(app);
export const Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const Auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);

// export const storageRef = firebase.storage().ref();
