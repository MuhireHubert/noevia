export default function Filter ({ categories, active, onChange }) {
    return (
        <div className = "flex flex-wrap gap-2">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick = {() => onChange(cat)}
                className = {`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === cat
                    ? "bg-espresso-900 text-cream"
                    : "bg-latte-200 text-espresso-800 hover:bg-latte-300"
                }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
