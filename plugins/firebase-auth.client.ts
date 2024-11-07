// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import "firebase/storage";
import "firebase/firestore";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public;
  const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_PACKET,
    messagingSenderId: config.FIREBASE_MESSAGE_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
});
