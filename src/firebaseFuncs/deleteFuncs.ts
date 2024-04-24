import {
    collection,
    deleteDoc,
    deleteField,
    doc,
    Firestore,
    getDocs,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    updateDoc,
    where,
  } from "firebase/firestore";
import { db } from "../main";
import { Product } from "../types/product";


export function deleteItem(id: string) {
    deleteDoc(doc(db, "products", id))
    .then(() => {
        console.log("Document deleted with ID: ", id);})
    .catch((error) => {
        console.log("Failed to delete document ", id, ":", error);
    });
}