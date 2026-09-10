const features = [
  {
    title: "Single-Origin Beans",
    desc: "Sourced directly from Rwandan cooperatives and roasted in-house every week.",
    icon: "☕",
  },
  {
    title: "Baked Daily",
    desc: "Our pastry case is restocked each morning — nothing sits overnight.",
    icon: "🥐",
  },
  {
    title: "A Place to Stay",
    desc: "Free wifi, plenty of outlets, and seating that doesn't rush you out.",
    icon: "🪑",
  },
];

export default function Feature() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-espresso-800/10 bg-latte-100 p-7"
          >
            <span className="text-3xl">{f.icon}</span>
            <h3 className="mt-4 font-display text-xl text-espresso-900">
              {f.title}
            </h3>
            <p className="mt-2 text-sm text-espresso-700/80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
