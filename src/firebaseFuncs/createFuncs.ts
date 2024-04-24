import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Firestore,
  setDoc,
} from "firebase/firestore";
    import { db } from "../main";
    import { Product } from "../types/product";

export function createItem(id: string, data: Product) {
    const doc1 = doc(db, "products", id);
    setDoc(doc1, {data: data})
    .then(() => {
        console.log("Document written with ID: ", doc1.id);})
    .catch((error) => {
        console.log("Failed to add document ", doc1.id, ":", error);
    });
}

export function addItem(data: Product) {
    addDoc(collection(db, "products"), {data: data})
    .then((docRef: DocumentReference) => {
        console.log("Document written with ID: ", docRef.id);})
    .catch((error) => {
        console.log("Failed to add document: ", error);
    });
}
    