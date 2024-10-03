import { initializeApp } from "firebase/app"; // Correct import for Firebase initialization
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Correct imports from firebase/auth
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage for persistence

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGYD2eGJJUd8u6-zsv484k-zDwoUysGDg",
  authDomain: "react-native-auth-dfa5c.firebaseapp.com",
  projectId: "react-native-auth-dfa5c",
  storageBucket: "react-native-auth-dfa5c.appspot.com",
  messagingSenderId: "950713925251",
  appId: "1:950713925251:web:f75acae2d0a7d2b61265b6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
