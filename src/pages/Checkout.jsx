import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";
import Button from "../components/common/Button";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [placed, setPlaced] = useState(false);
  const [name, setName] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pay-now");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await addOrder({
        customerName: name,
        pickupTime,
        paymentMethod,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          qty: i.qty,
          unitPrice: i.unitPrice,
          options: i.options,
          lineTotal: i.qty * i.unitPrice,
        })),
        total: subtotal,
      });
      setPlaced(true);
      clearCart();
    } catch {
      setError("Something went wrong placing your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-espresso-900">
          Order confirmed!
        </h1>
        <p className="mt-3 text-espresso-700/80">
          {paymentMethod === "pay-now"
            ? "Payment received — we'll have it ready for pickup shortly."
            : "We'll have it ready for pickup — please pay in store when you arrive."}
        </p>
        <Button as={Link} to="/menu" className="mt-8">
          Back to Menu
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-3xl text-espresso-900">
          Your cart is empty
        </h1>
        <p className="mt-3 text-espresso-700/80">
          Add a few things from the menu before checking out.
        </p>
        <Button as={Link} to="/menu" className="mt-8">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl text-espresso-900">Checkout</h1>

      <ul className="mt-8 divide-y divide-espresso-800/10">
        {items.map((item) => (
          <li key={item.cartId} className="flex items-start justify-between gap-4 py-3">
            <div>
              <p className="text-sm text-espresso-800">
                {item.qty} × {item.name}
              </p>
              {item.options.length > 0 && (
                <p className="mt-0.5 text-xs text-espresso-700/60">
                  {item.options
                    .filter((o) => o.choiceLabel)
                    .map((o) => `${o.groupLabel}: ${o.choiceLabel}`)
                    .join(" · ")}
                </p>
              )}
            </div>
            <span className="whitespace-nowrap text-sm font-semibold text-espresso-900">
              ${(item.qty * item.unitPrice).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-espresso-800/10 pt-4 text-lg font-semibold text-espresso-900">
        <span>Total</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <form onSubmit={handlePlaceOrder} className="mt-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-espresso-800">
            Name
          </label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-espresso-800">
            Pickup time
          </label>
          <input
            required
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
          />
        </div>

        <div>
          <span className="mb-1 block text-sm font-medium text-espresso-800">
            Payment
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("pay-now")}
              className={`rounded-xl border px-4 py-3 text-left text-sm ${
                paymentMethod === "pay-now"
                  ? "border-clay bg-clay/10 text-espresso-900"
                  : "border-espresso-800/20 text-espresso-700/80"
              }`}
            >
              <span className="block font-semibold">Pay now</span>
              <span className="block text-xs opacity-70">Card, demo checkout</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("pay-at-pickup")}
              className={`rounded-xl border px-4 py-3 text-left text-sm ${
                paymentMethod === "pay-at-pickup"
                  ? "border-clay bg-clay/10 text-espresso-900"
                  : "border-espresso-800/20 text-espresso-700/80"
              }`}
            >
              <span className="block font-semibold">Pay at pickup</span>
              <span className="block text-xs opacity-70">Settle in store</span>
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting
            ? "Placing order…"
            : paymentMethod === "pay-now"
            ? `Pay & Place Order — $${subtotal.toFixed(2)}`
            : `Place Order — $${subtotal.toFixed(2)}`}
        </Button>
        {error && <p className="text-center text-sm text-clay">{error}</p>}
        <p className="text-center text-xs text-espresso-700/60">
          Demo checkout — no payment is actually processed yet.
        </p>
      </form>
    </div>
  );
}
