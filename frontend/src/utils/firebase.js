import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-4778e.firebaseapp.com",
  projectId: "authexamnotes-4778e",
  storageBucket: "authexamnotes-4778e.firebasestorage.app",
  messagingSenderId: "78915451752",
  appId: "1:78915451752:web:4f569dffe67dabf4e874dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)

const provider=new GoogleAuthProvider();

export {auth,provider}