import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB8DhYsFdN5QYhSmbwiopTaKHSMapPkGbM",
  authDomain: "businesspacampus.firebaseapp.com",
  projectId: "businesspacampus",
  storageBucket: "businesspacampus.firebasestorage.app",
  messagingSenderId: "859266654889",
  appId: "1:859266654889:web:4c6678dafc83939324bfb8",
  measurementId: "G-9MFBRM5DRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://businesspacampus.firebasestorage.app");

// Export the app instance
export { app };
