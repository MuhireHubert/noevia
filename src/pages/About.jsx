export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <h1 className="font-display text-4xl text-espresso-900">Our Story</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
        <img
          src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop"
          alt="Cafe interior with wooden tables"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
        <div>
          <p className="text-espresso-800/90">
            Noevia Cafe opened its doors to bring a slower kind of coffee
            culture to Kigali — one where beans are roasted in small batches,
            pastries come out of the oven each morning, and nobody rushes you
            to give up your table.
          </p>
          <p className="mt-4 text-espresso-800/90">
            We work directly with Rwandan coffee cooperatives, paying fair
            prices for exceptional beans, and roast everything ourselves so
            you can taste the difference a week makes.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-8 rounded-3xl bg-latte-100 p-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg text-espresso-900">Location</h3>
          <p className="mt-1 text-sm text-espresso-700/80">
            12 Kiyovu Road, Kigali, Rwanda
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg text-espresso-900">Hours</h3>
          <p className="mt-1 text-sm text-espresso-700/80">
            Mon – Sun, 7:00am – 7:00pm
          </p>
        </div>
        <div>
          <h3 className="font-display text-lg text-espresso-900">Roaster</h3>
          <p className="mt-1 text-sm text-espresso-700/80">
            Beans roasted on-site, every Tuesday
          </p>
        </div>
      </div>
    </div>
  );
}
