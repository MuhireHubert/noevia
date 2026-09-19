import { useProducts } from "../context/ProductsContext";

export default function useFetchMenu() {
  const { products } = useProducts();
  return { data: products, loading: false, error: null };
}