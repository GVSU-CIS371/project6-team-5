import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { collection, setDoc, DocumentReference, doc, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../main";

export const useProductStore = defineStore("ProductStore", {
  //initProducts is the list of items
  //ProductDoc is the type of each item
  
  /*
  ProductDoc {
    id: string;
    data: { //Product
      name: string;
      description: string;
      price: number;
      rating: number;
      category: string;
      image: string;
    };
  }
  */

  state: () => {
      return { items: [] as ProductDoc[] };
    },
    actions: {
      init() {
        //Check whether the database has been initialized
        const prodColl = collection(db, "products");
        getDocs(prodColl).then((qs:QuerySnapshot) => {
          if (qs.size > 0) {
            console.log("Database already initialized");
            qs.docs.forEach((doc) => {
              this.items.push({id: doc.id, data: doc.data().data});
              console.log("Document data: ", doc.data().data);
            });
            return;
          } else {
            console.log("Database not initialized, adding items...")
            this.items = initProducts;
            //Add the items to the Firestore database
            initProducts.forEach(async (item) => {
              const doc1: DocumentReference = doc(db, "products", item.id);
              await setDoc(doc1, {data: item.data})
              .then(() => {
                console.log("Document written with ID: ", doc1.id);})
              .catch((error) => {
                console.log("Failed to add document ", doc1.id, ":", error);
              });
            });
          }
        }).catch((error) => {
          console.log("Failed to get snapshot: ", error);
          return;
        });
        
      },
      filterByCategory(category: string) {
        return this.items.filter((item) => item.data.category === category);
      },
      filterByRating(minRating: number) {
        return this.items.filter((item) => item.data.rating >= minRating);
      }
    },
});

