<template>
  <v-card class="store-item" height="100%" hover>
      <v-img :src="image" height="200px"></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>
          <v-rating v-model="rating" color="amber" size="14" readonly class="ma-2"></v-rating>
          <span class="ma-2">
              <v-icon style="color: green;">mdi-cash</v-icon> ${{ price }}
          </span>
          <span class="ma-2">
              <v-icon style="color: blue">mdi-package-variant-closed</v-icon> {{ stock }}
          </span>
      </v-card-subtitle>
      <v-card-text v-if="!editMode">{{ description }}</v-card-text>
      <v-card-actions v-if="!editMode">
          <v-btn color="primary" @click="editMode = true">Modify</v-btn>
          <v-btn color="error" @click="deleteItem">Delete</v-btn>
      </v-card-actions>
      <div v-else>
          <v-text-field v-model="editedItem.data.name" label="Name"></v-text-field>
          <v-text-field v-model="editedItem.data.description" label="Description"></v-text-field>
          <v-text-field v-model="editedItem.data.price" label="Price" type="number"></v-text-field>
          <v-rating v-model="editedItem.data.rating" color="amber" size="14" dense></v-rating>
          <v-text-field v-model="editedItem.data.stock" label="Stock" type="number"></v-text-field>
          <v-text-field v-model="editedItem.data.image" label="Image URL"></v-text-field>
          <v-select v-model="editedItem.data.category" :items="categories" label="Category"></v-select>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="cancelEdit">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="updateItem">Update</v-btn>
          </v-card-actions>
      </div>
  </v-card>
</template>

<script lang="ts" setup>
import { ProductDoc } from '../types/product';
import { ref, reactive } from 'vue';
import { db } from "../main";
import { doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore";

const props = defineProps<{ prod: ProductDoc }>();
const info = props.prod.data;
const name = info.name;
const image = info.image;
const rating = ref(info.rating);
const price = info.price;
const stock = info.stock;
const description = info.description;

const editMode = ref(false);
const editedItem = reactive({ ...props.prod });

const createItem = async () => {
    const newItem = {
        id: 'new-item-id',
        data: {
            name: 'New Item',
            description: 'This is a new item',
            price: 9.99,
            rating: 4,
            category: 'Category',
            image: 'https://example.com/image.jpg',
            stock: 10,
        },
    };

    const confirmed = confirm(`Are you sure you want to add ${newItem.data.name}?`);

    if (confirmed) {
        const docRef = doc(db, "products", newItem.id);
        await setDoc(docRef, { data: newItem.data });
    }
}

const deleteItem = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${props.prod.data.name}?`);

    if (confirmed) {
        const docRef = doc(db, "products", props.prod.id);
        await deleteDoc(docRef);
    }
}

const updateItem = async () => {
    const confirmed = confirm(`Are you sure you want to update ${props.prod.data.name}?`);

    if (confirmed) {
        const docRef = doc(db, "products", props.prod.id);
        await updateDoc(docRef, { data: editedItem.data });
        editMode.value = false;
    }
}

const cancelEdit = () => {
    editedItem.data = { ...props.prod.data };
    editMode.value = false;
}
</script>