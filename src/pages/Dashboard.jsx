import { useState } from "react";
import StaffGate from "../components/dashboard/StaffGate";
import OrdersPanel from "../components/dashboard/OrdersPanel";
import ProductsPanel from "../components/dashboard/ProductsPanel";
import { useAuth } from "../context/AuthContext";

const tabs = ["Orders", "Products"];

export default function Dashboard() {
  const [tab, setTab] = useState("Orders");
  const { user, signOut } = useAuth();

  return (
    <StaffGate>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl text-espresso-900">Staff Dashboard</h1>
            <p className="mt-2 text-espresso-700/80">
              Track incoming orders and manage what's on the menu.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-espresso-700/60">{user?.email}</p>
            <button
              onClick={signOut}
              className="mt-1 text-xs font-medium text-clay hover:underline"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-2 border-b border-espresso-800/10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? "border-clay text-espresso-900"
                  : "border-transparent text-espresso-700/60 hover:text-espresso-900"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Orders" ? <OrdersPanel /> : <ProductsPanel />}
        </div>
      </div>
    </StaffGate>
  );
}
