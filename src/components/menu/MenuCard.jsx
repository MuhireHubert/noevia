import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CustomizeModal from "./CustomizeModal";

export default function MenuCard({ item }) {
    const { addItem } = useCart();
    const [customizing, setCustomizing] = useState(false);
    const hasOptions = Array.isArray(item.options) && item.options.length > 0;

    function handleAddClick() {
        if (hasOptions) {
            setCustomizing(true);
        } else {
            addItem(item, []);
        }
    }

    return (
        <div className = "group flex-col overflow-hidden rounded-2xl border border-espresso-800/10 bg-latte-100 transition-shadow hover:shadow-lg">
            <div className = "aspect-[4/3] overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className = "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    </div>
                    <div className = "flex flex-1 flex-col p-5">
                        <div className = "flex items-start justify-between gap-2">
                            <h3 className = "font-display text-lg text-espresso-900">{item.name}</h3>
                            <span className = "whitespace-nowrap font-semibold text-clay">
                                RWF{item.price.toFixed(0)}
                            </span>
                        </div>
                        <p className = "mt-1.5 flex-1 text-sm text-espresso-700/80">
                        {item.description}
                        </p>
                        <button
                        onClick={handleAddClick}
                        className="mt-4 self-start rounded-full border border-espresso-800/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-espresso-800 transiotion-colors hover:bg-clay hover:text-cream hover:border-clay"
                        >
                            {hasOptions ? "Customize & add" : "Add to order"}
                        </button>
                    </div>

                    {customizing && (
                        <CustomizeModal
                            product={item}
                            onClose={() => setCustomizing(false)}
                            onConfirm={(selectedOptions) => addItem(item, slectedOptions)}
                            />
                    )}
        </div>
    );
}