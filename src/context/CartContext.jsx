import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function buildCartId(productId, selectedOptions) {
    const key = selectedOptions
        .map((o) => `${o.groupId}:${o.choiceIds.join(",")}`)
        .sort()
        .join("|");
    return `${productId}::${key}`;
}

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    function addItem(product, selectedOptions = []) {
        const optionsPriceDelta = selectedOptions.reduce((sum, o) => sum + o.priceDelta, 0);
        const unitPrice = product.price + optionsPriceDelta;
        const cartId = buildCartId(product.id, selectedOptions);

        setItems((prev) => {
            const existing = prev.find((i) => i.cartId === cartId);
            if (existing) {
                return prev.map((i) =>
                i.cartOd === cartId ? {...i, qty: i.qty +1}: i
            );
            }
            return[
                ...prev,
                {cartId,
                productId: product.id,
                name: product.name,
                image: product.image,
                basePrice: product.price,
                unitPrice,
                qty: 1,
                options: selectedOptions.map((o) => ({
                    groupLabel: o.groupLabel,
                    choiceLabel: o.choiceLabels.join(","),
                    priceDelta: o.priceDelta,
                })),
                },
            ];
        });
    }

    function removeItem(cartId) {
        setItems((prev) => prev.filter((i) =>i.cartId !== cartId));
    }

    function updateQty(cartId, qty) {
        if (qty <=0) {
            removeItem(cartId);
            return;
        }
        setItems((prev) => prev.map((i) => (i.cartId === cartId ? {...i, qty } : i)));
    }

    function clearCart() {
        setItems([]);
    }

    const count = useMemo(() => items.reduce((sum, i) => sum +i.qty,0), [items]);
    const subtotal = useMemo(
        () => items.reduce((sum,i) => sum + i.qty * i.unitprice, 0),
        [items]
    );

    const value = {items, addItem, removeItem, updateQty, clearCart, count, subtotal};

    return <CartContext.Provider value = {value} > {children}</CartContext.Provider>
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
}