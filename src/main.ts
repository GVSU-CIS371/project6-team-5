import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmIeQP8ScsCp4yoUg55NcWAabF7080qDI",
  authDomain: "project6-electric-eels.firebaseapp.com",
  projectId: "project6-electric-eels",
  storageBucket: "project6-electric-eels.appspot.com",
  messagingSenderId: "945731599682",
  appId: "1:945731599682:web:ebbf12a49ac1f5fbf61cdb",
  measurementId: "G-S02V4K0TRH"
};

const myapp: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(myapp);

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi, fa },
  },

  components,
  directives,
});

const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
