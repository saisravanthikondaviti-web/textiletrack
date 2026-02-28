import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIpuw9_AEaP9gFgFn8dcZudJwygbmm2QQ",
  authDomain: "textile-track-e7414.firebaseapp.com",
  projectId: "textile-track-e7414",
  storageBucket: "textile-track-e7414.firebasestorage.app",
  messagingSenderId: "129989969948",
  appId: "1:129989969948:web:498bb6aef77df0dca6f7d9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);