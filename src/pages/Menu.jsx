import { usememo, useState } from "react";
import { useProducts } from "../context/ProductsContext";
import Filter from "../components/menu/Filter";
import MenuCard from "../components/menu/MenuCard";

export default function Menu() {
    const { products, categories, loading } = useProducts();
    const [active, setActive] = useState("All");

    const filtered = useMemo(
        () => (active === "All" ? products : products.filter((i) => i.category === active)),
        [products, active]
    );

    return (
        <div className = "mx-auto max-w-6xl px-5 py-16">
            <div className = "mb-10 text-center">
                <h1 classname= "font-display text-4xl text-espresso-900">Our Menu</h1>
                <p className="mt-2 text-espresso-700/80">
                    Made fresh, everyday. Prices in RWF.
                </p>
            </div>
            <div className="mb-8 flex justify-center">
                <Filter categories = {categories} active = { active } onChange = { setActive } />
            </div>

            {loading ? (
                <p className = "text-center text-espresso-700/60">Loading menu...</p>   
            ) : filtered.length === 0 ? (
                <p className = "text-center text-espresso-700/60"> Nothing in this category yet - check back soon. </p>
            ) : (
                <div className = "grid gap-6 sm:drid-cols-2 lg: grid-cols-3">
                    {filtered.map((item) => (
                        <MenuCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}