// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyB8DhYsFdN5QYhSmbwiopTaKHSMapPkGbM",
  authDomain: "businesspacampus.firebaseapp.com",
  projectId: "businesspacampus",
  storageBucket: "businesspacampus.firebasestorage.app",
  messagingSenderId: "859266654889",
  appId: "1:859266654889:web:4c6678dafc83939324bfb8",
  measurementId: "G-9MFBRM5DRF"
};

export const app = initializeApp(firebaseConfig); // ✅ Named export
export const auth = getAuth(app);
