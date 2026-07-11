import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBIn5EMlzc63hOQTicfGjWiw9LfvpdOLEw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "starshineworlds.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "starshineworlds",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "starshineworlds.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "660615122099",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:660615122099:web:4f61fb9d70ea11b4b3b4c6",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ENVKTWBTMF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Safe initialization of Analytics
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// Operation Types for diagnostic error reporting
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

// Mandatory platform-compliant error handling
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
