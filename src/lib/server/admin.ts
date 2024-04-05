// location of file in lib tells svelte-kit to only use this code on the server / make sure it's not used in client-side code
// ! admin SDK can only be used on the server, so files named +server.ts or +page.server.ts.

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FB_CLIENT_EMAIL, FB_PRIVATE_KEY, FB_PROJECT_ID, FB_SERVICE_ACCOUNT } from '$env/static/private'
import pkg from 'firebase-admin';

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
} catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase Admin Error: ', err.stack)
  }
}


// named with prefix "admin" to distinguish from client SDK
export const adminDB = getFirestore();
export const adminAuth = getAuth();

// TO DO: look into firebase emulator suite for testing and debugging?