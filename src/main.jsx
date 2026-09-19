import  { StrictMode } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import setupNotice from "./components/common/SetupNotice.jsx";
import { firebaseConfigError } from "./firebase.js";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const root = createRoot(document.getElementById("root"));

if (firebaseConfigError) {
  root.render(
    <StrictMode>
      <SetupNotice message={firebaseConfigError} />
    </StrictMode>
  );
} else {
  root.render(
  <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <OrdersProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </OrdersProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
}