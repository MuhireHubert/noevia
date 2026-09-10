import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Requires no manual index — single-field ordering on createdAt.
    // If Firestore prompts for a composite index link in the console
    // for a query added later, click it once; that's a one-time setup step.
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setOrders(
          snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              ...data,
              // Firestore Timestamp -> ISO string for easy formatting/sorting
              createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
            };
          })
        );
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  // order: { customerName, pickupTime, paymentMethod, items, total }
  async function addOrder(order) {
    const status = order.paymentMethod === "pay-now" ? "paid" : "unpaid";
    await addDoc(collection(db, "orders"), {
      ...order,
      status,
      createdAt: serverTimestamp(),
    });
  }

  async function setOrderStatus(id, status) {
    await updateDoc(doc(db, "orders", id), { status });
  }

  const value = { orders, loading, error, addOrder, setOrderStatus };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
