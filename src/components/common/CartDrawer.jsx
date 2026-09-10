import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "./Button";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso-950/40 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-espresso-800/10 px-5 py-4">
          <h2 className="font-display text-xl">Your Order</h2>
          <button onClick={onClose} aria-label="Close cart" className="p-1 text-espresso-700 hover:text-clay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-espresso-700/70">
              Your cart is empty. Add something from the menu.
            </p>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.cartId} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-espresso-900">{item.name}</p>
                      <span className="whitespace-nowrap text-xs font-semibold text-espresso-900">
                        ${(item.unitPrice * item.qty).toFixed(2)}
                      </span>
                    </div>
                    {item.options.length > 0 && (
                      <ul className="mt-0.5 text-[11px] leading-snug text-espresso-700/70">
                        {item.options
                          .filter((o) => o.choiceLabel)
                          .map((o) => (
                            <li key={o.groupLabel}>
                              {o.groupLabel}: {o.choiceLabel}
                            </li>
                          ))}
                      </ul>
                    )}
                    <div className="mt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.cartId, item.qty - 1)}
                        className="h-6 w-6 rounded-full border border-espresso-800/20 text-xs"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="w-4 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartId, item.qty + 1)}
                        className="h-6 w-6 rounded-full border border-espresso-800/20 text-xs"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="ml-2 text-xs text-espresso-700/60 hover:text-clay"
                        aria-label={`Remove ${item.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-espresso-800/10 px-5 py-5">
          <div className="mb-4 flex items-center justify-between text-sm font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button
            className="w-full"
            disabled={items.length === 0}
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </aside>
    </>
  );
}
