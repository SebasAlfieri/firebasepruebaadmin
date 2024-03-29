import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAGt9rwg1Njng6F_rf0sINtEpSkEdPxlnk",
  authDomain: "prueba1-7326c.firebaseapp.com",
  projectId: "prueba1-7326c",
  storageBucket: "prueba1-7326c.appspot.com",
  messagingSenderId: "292909109774",
  appId: "1:292909109774:web:7867cd4525cbc370c5225f",
  measurementId: "G-7DMJ9ZQS19",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOAD OBJECTS
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

// CREATE OBJECT
export async function createPost(orderData: any) {
  const collectionRef = collection(db, "products");
  let respuesta = await addDoc(collectionRef, orderData);

  return respuesta.id;
}

// DELETE ITEM
export async function deleteItem(itemId: string) {
  const itemRef = doc(db, "products", itemId);
  await deleteDoc(itemRef);
}

// LOGIN ADMIN
export async function authenticate(password: string): Promise<boolean> {
  try {
    const passwordDoc = await getDoc(doc(db, "password", "password"));
    const correctPassword = passwordDoc.data()?.password;

    const isAuthenticated = password === correctPassword;
    if (isAuthenticated) {
      localStorage.setItem("ps", password);
    }

    return isAuthenticated;
  } catch (error) {
    console.error("Error fetching password:", error);
    return false;
  }
}

export default app;
export { db };
