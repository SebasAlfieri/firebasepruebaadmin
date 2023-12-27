import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAGt9rwg1Njng6F_rf0sINtEpSkEdPxlnk",
  authDomain: "prueba1-7326c.firebaseapp.com",
  projectId: "prueba1-7326c",
  storageBucket: "prueba1-7326c.appspot.com",
  messagingSenderId: "292909109774",
  appId: "1:292909109774:web:7867cd4525cbc370c5225f",
  measurementId: "G-7DMJ9ZQS19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const analytics = getAnalytics(app);

export async function getItems() {
  const collectionRef = collection(db, "products");
  let respuesta = await getDocs(collectionRef);

  let dataDocs = respuesta.docs.map((documento) => {
    let docFormateado = { ...documento.data(), id: documento.id };
    console.log(docFormateado);
    return docFormateado;
  });

  return dataDocs;
}

export async function createPost(orderData: any) {
  const collectionRef = collection(db, "products");
  let respuesta = await addDoc(collectionRef, orderData);
  // window.location.reload();

  return respuesta.id;
}

export async function deleteItem(itemId: string) {
  const itemRef = doc(db, "products", itemId);
  await deleteDoc(itemRef);
}

export default app;
export { db };
