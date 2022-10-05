import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsLsiyXTJkQWD69K2ehj5WLg8U44cTKn8",
  authDomain: "uploading-7362c.firebaseapp.com",
  projectId: "uploading-7362c",
  storageBucket: "uploading-7362c.appspot.com",
  messagingSenderId: "522649781395",
  appId: "1:522649781395:web:862ca597842c3a1a45f966",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
