import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import seedMenuData from "../data/menuData";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasSeeded = useRef(false);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("name"));
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        // First load, collection is empty: seed it once from the local
        // starter menu so the site isn't blank on a fresh Firebase project.
        if (snapshot.empty && !hasSeeded.current) {
          hasSeeded.current = true;
          const batch = writeBatch(db);
          seedMenuData.forEach((item) => {
            const { id, ...rest } = item;
            batch.set(doc(collection(db, "products")), rest);
          });
          await batch.commit().catch((err) => setError(err));
          return; // the resulting snapshot fires this listener again
        }
        setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  async function addProduct(product) {
    await addDoc(collection(db, "products"), product);
  }

  async function updateProduct(id, patch) {
    await updateDoc(doc(db, "products", id), patch);
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(db, "products", id));
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))).sort(),
  ];

  const value = {
    products,
    categories,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductsProvider");
  return ctx;
}
