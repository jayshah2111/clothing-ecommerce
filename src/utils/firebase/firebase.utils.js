import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from 'firebase/auth';
 import {
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCaekxoH2pbgt6L_hn_eLFeNxoZc94bMGY",
    authDomain: "crwn-clothing-db-8d977.firebaseapp.com",
    projectId: "crwn-clothing-db-8d977",
    storageBucket: "crwn-clothing-db-8d977.appspot.com",
    messagingSenderId: "620599053623",
    appId: "1:620599053623:web:86d17be2dee5e974599eb2"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
  }

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    //if user data doesnt exist
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
    
  };
