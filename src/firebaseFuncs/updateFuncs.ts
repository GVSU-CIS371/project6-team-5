import {
    Firestore,
    doc,
    updateDoc,
    arrayRemove,
    increment,
  } from "firebase/firestore";

import { db } from "../main";
import { Product } from "../types/product";

