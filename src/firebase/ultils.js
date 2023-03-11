import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({promt:'select_accout'});

export const handleUserProfile = async (userAuth ,additionalData)=>{
    if(!userAuth){
        return;
    }
    const {uid} =userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName,email} =userAuth;
        const timestamp = new Date();
        const userRoles =['user'];
        try {
            await userRef.set({
                displayName,
                email,
                createdDate :timestamp,
                userRoles,
                ...additionalData
            });
        } catch (error) {
            console.log(error);
        }
    }
    return userRef;
};