import { useState } from "react";
import {NavLink} from "react-router-dom";
import { useCart } from "../../context/CartContext";

const links = [
    { to: "/", label: "Home"},
    { to: "/menu", label: "Menu"},
    { to: "/about", label: "About"},
    {to: "/contact", label: "Contact"},
];

export default function Navbar({ onCartClick }) {
    const [open, setOpen] = useState(false);
    const { count } = useCart();

    return (
        <header className = "sticky top-0 z-40 border-b border-espresso-800/10 bg-cream/90 backdrop-blur">
            <nav className = "mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
                <NavLink to="/" className="font-display text-2xl font-semibold text-espresso-900">
                Noevia <span className="text-clay">Cafe</span>
                </NavLink>
                
                <ul className="hidden items-center gap-8 md:flex">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                            to={link.to}
                            end={link.to === "/"}
                            className = {({ isActive }) =>
                            `text-sm font-medium tracking tracking-wide transition-colors ${
                                isActive ? "text-clay" : "text-espresso-800 hover:text-clay"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                        </li>
                    ))}
                </ul>

                <div className ="flex items-center gap-3">
                    <button
                    onClick={onCartClick}
                    className="relative rounded-full border border-espresso-800/20 p-2.5 text-espresso-900 hover:bg-latte-200"
                    aria-label="Open cart"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <circle cx="9" cy="21" r="1.2" />
                            <circle cx="18" cy="21" r="1.2" />
                            <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
                        </svg>
                        {count >0 && (
                            <span className = "absolute -right-1 -top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-clay text-[10px] font-bold text-cream">
                                {count}
                            </span>
                        )}
                    </button>

                    <button
                    className = "p-2 md:hidden"
                    aria-label="Toggle menu"
                    onClick={() => setOpen((v) => !v)}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <ul className = "flex flex-col gap-1 border-t border-espresso-800/10 px-5 pb-4 md:hidden">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                            to={link.to}
                            end={link.to === "/"}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) => 
                            `block rounded-lg px-2 py-2.5 text-sm font-medium ${
                                isActive ? "text-clay" : "text-espresso-800"
                            }`
                            }
                        >
                            {link.label}
                        </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}