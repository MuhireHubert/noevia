import { useState } from "react";
import { useProducts } from "../../context/ProductsContext";
import Button from "../common/Button";

const emptyForm = { name: "", category: "", price: "", description: "", image: "" };

export default function ProductsPanel() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: form.name.trim(),
      category: form.category.trim() || "Uncategorized",
      price: parseFloat(form.price) || 0,
      description: form.description.trim(),
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    };
    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await addProduct(payload);
      }
      cancelEdit();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    setPendingDeleteId(id);
    try {
      await deleteProduct(id);
    } finally {
      setPendingDeleteId(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <h2 className="mb-4 font-display text-xl text-espresso-900">
          {editingId ? "Edit Product" : "Add a Product"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-2xl border border-espresso-800/10 bg-latte-100 p-5"
        >
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-espresso-700/70">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border border-espresso-800/20 bg-cream px-3 py-2 text-sm outline-none focus:border-clay"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-espresso-700/70">
                Category
              </label>
              <input
                required
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Coffee, Tea, Pastries…"
                className="w-full rounded-xl border border-espresso-800/20 bg-cream px-3 py-2 text-sm outline-none focus:border-clay"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-espresso-700/70">
                Price (RWF)
              </label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full rounded-xl border border-espresso-800/20 bg-cream px-3 py-2 text-sm outline-none focus:border-clay"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-espresso-700/70">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full rounded-xl border border-espresso-800/20 bg-cream px-3 py-2 text-sm outline-none focus:border-clay"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-espresso-700/70">
              Image URL
            </label>
            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://…"
              className="w-full rounded-xl border border-espresso-800/20 bg-cream px-3 py-2 text-sm outline-none focus:border-clay"
            />
          </div>
          <p className="text-xs text-espresso-700/60">
            Note: this form covers name, category,
            price, description, and image.
            New products' customization options (size, milk,
            etc.) will be added in code —
          </p>
          <div className="flex gap-2 pt-1">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : editingId ? "Save Changes" : "Add Product"}
            </Button>
            {editingId && (
              <Button type="button" variant="ghost" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl text-espresso-900">
          Current Menu ({products.length})
        </h2>
        {loading ? (
          <p className="text-sm text-espresso-700/60">Loading products…</p>
        ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-3 rounded-xl border border-espresso-800/10 bg-latte-100 p-3"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 flex-shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-espresso-900">
                  {product.name}
                </p>
                <p className="text-xs text-espresso-700/60">
                  {product.category} · ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => startEdit(product)}
                className="rounded-full border border-espresso-800/20 px-3 py-1 text-xs font-medium text-espresso-800 hover:bg-espresso-900 hover:text-cream"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                disabled={pendingDeleteId === product.id}
                className="rounded-full border border-clay/40 px-3 py-1 text-xs font-medium text-clay hover:bg-clay hover:text-cream disabled:opacity-50"
              >
                {pendingDeleteId === product.id ? "Deleting…" : "Delete"}
              </button>
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
}