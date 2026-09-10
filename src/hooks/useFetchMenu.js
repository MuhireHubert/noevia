import { useProducts } from "../context/ProductsContext";

// Thin convenience wrapper around ProductsContext, kept as its own hook
// so call sites read naturally ("what's on the menu") and so this is the
// one place to touch if the product catalog ever moves to a real backend
// (swap the body for a fetch() + loading/error state, keep the shape).
export default function useFetchMenu() {
  const { products } = useProducts();
  return { data: products, loading: false, error: null };
}
