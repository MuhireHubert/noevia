import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-espresso-900 text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-clay">
            Roasted weekly, brewed slowly
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            A warm cup and a quiet corner, right in Kigali.
          </h1>
          <p className="mt-5 max-w-md text-latte-200/90">
            Noevia Cafe serves small-batch coffee and fresh-baked pastries in
            a space built for lingering — come read, work, or catch up with a
            friend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/menu">
              View Menu
            </Button>
            <Button as={Link} to="/about" variant="outline" className="border-latte-200/40 text-latte-100 hover:bg-latte-100/10 hover:text-cream">
              Our Story
            </Button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop"
            alt="Latte art in a warm-toned cafe"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
