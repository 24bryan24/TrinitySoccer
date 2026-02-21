import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let db = null;
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

const CONTENT_DOC = 'site';
const CONTENT_FIELD = 'content';

export async function loadContentFromFirebase() {
  if (!db) return null;
  try {
    const ref = doc(db, 'config', CONTENT_DOC);
    const snap = await getDoc(ref);
    if (snap.exists() && snap.data()[CONTENT_FIELD]) {
      return snap.data()[CONTENT_FIELD];
    }
  } catch (err) {
    console.warn('Firebase load failed:', err);
  }
  return null;
}

export async function saveContentToFirebase(content) {
  if (!db) return;
  try {
    const ref = doc(db, 'config', CONTENT_DOC);
    await setDoc(ref, { [CONTENT_FIELD]: content }, { merge: true });
  } catch (err) {
    console.warn('Firebase save failed:', err);
  }
}
