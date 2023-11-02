import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCGz05DCyrXdLxAkWzqTM7vsDdun3fOauM",
  authDomain: "playstation-9e778.firebaseapp.com",
  projectId: "playstation-9e778",
  storageBucket: "playstation-9e778.appspot.com",
  messagingSenderId: "982858943529",
  appId: "1:982858943529:web:ed2bb77971ee0e8c6d2038",
};

const app = initializeApp(firebaseConfig, {});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
