import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24 bg-espresso-950 text-latte-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl text-cream">Noevia Cafe</h3>
          <p className="mt-3 max-w-xs text-sm text-latte-300/80">
            Small-batch coffee, fresh pastries, and a warm place to sit a
            while.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-clay">
            Visit
          </h4>
          <address className="mt-3 space-y-1 text-sm not-italic text-latte-300/80">
            <p>12 Kiyovu Road</p>
            <p>Kigali, Rwanda</p>
            <p>Mon–Sun, 7:00am – 7:00pm</p>
          </address>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-clay">
            Explore
          </h4>
          <ul className="mt-3 space-y-1.5 text-sm text-latte-300/80">
            <li><Link to="/menu" className="hover:text-cream">Menu</Link></li>
            <li><Link to="/about" className="hover:text-cream">About</Link></li>
            <li><Link to="/contact" className="hover:text-cream">Contact & Reservations</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-latte-300/10 px-5 py-5 text-center text-xs text-latte-300/60">
        <span>© {new Date().getFullYear()} Noevia Cafe. All rights reserved.</span>
        <Link to="/dashboard" className="underline decoration-dotted hover:text-latte-100">
          Staff Login
        </Link>
      </div>
    </footer>
  );
}
