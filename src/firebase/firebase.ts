import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB1ueL-o2RcL76EtJefdL_9I9WU8UK8I0c",
	authDomain: "dream-journal-fc0dd.firebaseapp.com",
	projectId: "dream-journal-fc0dd",
	storageBucket: "dream-journal-fc0dd.firebasestorage.app",
	messagingSenderId: "958038057634",
	appId: "1:958038057634:web:95fc7844d7f649c1702dfb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);