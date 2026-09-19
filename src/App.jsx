import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/navbar";
import Footer from "./components/common/Footer";
import CartDrawer from "./components/common/CartDrawer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className = "flex min-h-screen flex-col">
            <Navbar onCartClick = {() => setCartOpen(true)} />
            <main className = "flex-1">
            <Routes>
                <Route path="/" element = {<Home />} />
                <Route path="/menu" element = {<Menu />} />
                <Route path="/about" element = {<About />} />
                <Route path="/contact" element = {<Contact />} />
                <Route path="/checkout" element = {<Checkout />} />
                <Route path="/dashboard" element = {<Dashboard />} />
                <Route path="*" element = {<NotFound />} />
            </Routes>
            </main>

            <Footer />

            <CartDrawer open = {cartOpen} onClose = {() => setCartOpen(false)} />
        </div>
    );
}