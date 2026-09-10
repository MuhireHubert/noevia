import { useMemo, useState } from "react";
import { useOrders } from "../../context/OrdersContext";

const filters = ["All", "Unpaid", "Paid"];

export default function OrdersPanel() {
  const { orders, loading, setOrderStatus } = useOrders();
  const [filter, setFilter] = useState("All");
  const [pendingId, setPendingId] = useState(null);

  async function handleToggleStatus(order) {
    setPendingId(order.id);
    try {
      await setOrderStatus(order.id, order.status === "paid" ? "unpaid" : "paid");
    } finally {
      setPendingId(null);
    }
  }

  const filtered = useMemo(() => {
    if (filter === "All") return orders;
    return orders.filter((o) => o.status === filter.toLowerCase());
  }, [orders, filter]);

  const unpaidTotal = orders
    .filter((o) => o.status === "unpaid")
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-espresso-900 text-cream"
                  : "bg-latte-200 text-espresso-800 hover:bg-latte-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        {unpaidTotal > 0 && (
          <p className="text-sm text-espresso-700/80">
            <span className="font-semibold text-clay">${unpaidTotal.toFixed(2)}</span>{" "}
            outstanding across unpaid orders
          </p>
        )}
      </div>

      {loading ? (
        <p className="rounded-2xl border border-espresso-800/10 bg-latte-100 p-8 text-center text-sm text-espresso-700/70">
          Loading orders…
        </p>
      ) : filtered.length === 0 ? (
        <p className="rounded-2xl border border-espresso-800/10 bg-latte-100 p-8 text-center text-sm text-espresso-700/70">
          No orders here yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((order) => (
            <li
              key={order.id}
              className="rounded-2xl border border-espresso-800/10 bg-latte-100 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-espresso-900">
                    {order.customerName || "Unnamed order"}
                  </p>
                  <p className="text-xs text-espresso-700/60">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Just now"} · Pickup{" "}
                    {order.pickupTime || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      order.status === "paid"
                        ? "bg-sage/20 text-sage"
                        : "bg-clay/15 text-clay"
                    }`}
                  >
                    {order.status}
                  </span>
                  <button
                    onClick={() => handleToggleStatus(order)}
                    disabled={pendingId === order.id}
                    className="rounded-full border border-espresso-800/20 px-3 py-1 text-xs font-medium text-espresso-800 hover:bg-espresso-900 hover:text-cream disabled:opacity-50"
                  >
                    {pendingId === order.id
                      ? "Updating…"
                      : `Mark ${order.status === "paid" ? "Unpaid" : "Paid"}`}
                  </button>
                </div>
              </div>

              <ul className="mt-4 space-y-1 border-t border-espresso-800/10 pt-3">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm text-espresso-800">
                    <span>
                      {item.qty} × {item.name}
                      {item.options?.some((o) => o.choiceLabel) && (
                        <span className="ml-2 text-xs text-espresso-700/60">
                          ({item.options
                            .filter((o) => o.choiceLabel)
                            .map((o) => `${o.groupLabel}: ${o.choiceLabel}`)
                            .join(", ")})
                        </span>
                      )}
                    </span>
                    <span>${item.lineTotal.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-end border-t border-espresso-800/10 pt-3 text-sm font-semibold text-espresso-900">
                Total: ${order.total.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
