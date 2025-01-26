/**
 * Firebase controls and interactions
 */

import { db, displayError, initializeFirebase } from "./app.js"
import { doc, getDoc, setDoc, updateDoc, deleteField, collection, getDocs } from "firebase/firestore";

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

export async function getDocumentIds(collectionPath) {
  if (!db) { await initializeFirebase(); }

  try {
    const collectionRef = collection(db, collectionPath);
    const querySnapshot = await getDocs(collectionRef);

    const documentIds = [];

    querySnapshot.forEach((docSnap) => {
      documentIds.push(docSnap.id); // The document ID
    });

    return documentIds;

  } catch (error) {
    console.error("Error retrieving document IDs:", error);
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

export async function getCustomType(type, fallback) {
  return await getDocList("types", type)
    .then((elements) => {
      if (elements.length === 0) { throw new Error(`No elements found for type: ${type}`); }
      return elements;
    })
    .catch((error) => {
      displayError("Error connecting to database, try logging in again or refreshing the page", 0);
      console.error(`${error.message}\nUsing fallback ${type}s!`);
      return fallback; // Return fallback to ensure the function always resolves with a value.
    });
}

export async function createCharacter(name, data) {
  try {
    const docRef = doc(db, "characters", name);
    await setDoc(docRef , data);
    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}
