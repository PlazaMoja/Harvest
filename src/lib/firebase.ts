import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAiMk-ZQXd4WistpC90GaeRllM_T8-EHOk",
  authDomain: "mimi-53a26.firebaseapp.com",
  projectId: "mimi-53a26",
  storageBucket: "mimi-53a26.firebasestorage.app",
  messagingSenderId: "496799233166",
  appId: "1:496799233166:web:4d6f17cca3e6c5d29505df",
  measurementId: "G-5GXB6T54VQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
