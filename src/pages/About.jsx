export default function About () {
    return (
        <div className = "mx-auto max-w-4xl px-5 py-16">
            <h1 className = "font-display text-4xl text-espresso-900">Our Story</h1>
        <div className = "mt-8 grid gap-10 md:grid-cols-2 md:items-center">
            <img src = "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop"
            alt="Cafe interior with wooden tables"
            className = "aspect-[4/3] w-full rounded-3xl object-cover"
            />
            <div>
                <p className = "mt-4 text-espresso-800/90">
                We work directly with Rwandan Coffee cooperatives, paying fairly
                Prices for exceptional beans and we roast everything here so
                you can taste teh difference a week makes.
                </p>
            </div>
        </div>
        <div className="mt-16 grid gap-8 rounded-3xl bg-latte-100 p-8 md:grid-cols-3">
            <div>
                <h3 className = "font-display text-lg text-espresso-900">Location</h3>
                <p className="mt-1 text-sm text-espresso-700/80">
                Kicukiro, Gahanga, KK 15 Rd (At Engen Station on the Gahanga - Nyamata Road)
                </p>
            </div>
            <div>
                <h3 className="font-display text-lg text-espresso-900">Hours</h3>
                <p className = "mt-1 text-sm text-espresso-700/80">
                Mon -Sun
                8:00 AM - 09:00 PM</p>
                </div>
                <div>
                <h3 className = "font-display text-lg text-espresso-900">Roaster</h3>
                <p className = "mt-1 text-sm text-espresso-700/80">
                Beans roasted on-site, every Tuesday</p>
            </div>
        </div>
        </div>
    );
}