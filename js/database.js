/**
 * Firebase controls and interactions
 */

import { app, db, initializeFirebase } from "./app.js"
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

export async function getDocList(collectionPath, documentId) {
  if (!db) { await initializeFirebase(); }

  try {
    // Reference the document
    const docRef = doc(db, collectionPath, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const fields = docSnap.data();
      return Object.values(fields);
    } else {
      console.error("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving document values:", error);
    return [];
  }
}

export async function getDocListKeyed(collectionPath, documentId) {
  if (!db) { await initializeFirebase(); }

  try {
    // Reference the document
    const docRef = doc(db, collectionPath, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const fields = docSnap.data();
      return Object.entries(fields);
    } else {
      console.error("No such document!");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving document values:", error);
    return [];
  }
}


export async function removeField(collectionPath, documentId, fieldName) {
  try {
    // Reference the document within the collection
    const docRef = doc(db, collectionPath, documentId);

    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error(`No document found with ID: ${documentId}`);
      return;
    }

    // Update the document, removing the specified field
    await updateDoc(docRef, {
      [fieldName]: deleteField()
    });

    console.log(`Field '${fieldName}' removed successfully.`);
  } catch (error) {
    console.error(`Error removing field '${fieldName}':`, error);
  }
}