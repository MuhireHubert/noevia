# Noevia Cafe

A React + Vite website for Noevia Cafe: a cozy, rustic-themed coffee shop
site with a customizable menu, a cart -> checkout flow, and a staff
dashboard for managing orders and products -- backed by a real Firebase
project (Firestore + Auth).

## Stack
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Firebase: Firestore (database) + Authentication (staff login)

## One-time Firebase setup
This app needs a real Firebase project before it'll run. All of this is
done once, in the Firebase console (free tier is plenty to start):

1. Go to https://console.firebase.google.com -> **Add project** -> name it
   (e.g. "noevia-cafe") -> finish the wizard (Analytics optional).
2. In the project, click the **Web** icon (`</>`) to register a web app.
   Copy the `firebaseConfig` values it gives you.
3. In the left sidebar: **Build -> Firestore Database -> Create database**.
   Start in **production mode**, pick the region closest to your
   customers (e.g. an EU/Africa region for Rwanda-based traffic).
4. Still in Firestore, go to the **Rules** tab, and paste in the contents
   of `firestore.rules` from this project. Click **Publish**.
5. In the left sidebar: **Build -> Authentication -> Get started** ->
   enable the **Email/Password** sign-in provider.
6. In Authentication -> **Users** tab, click **Add user** and create a
   login for each staff member who needs the dashboard (email + password).
   This is how staff sign in at `/dashboard` -- there's no self-signup.
7. Back in this project folder:
   ```bash
   cp .env.example .env
   ```
   and paste the six values from step 2 into `.env`.

That's it -- no server to deploy or maintain. The site talks to Firestore
directly from the browser, gated by the rules you published in step 4.

## Getting started
```bash
npm install
npm run dev       # starts local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

The very first time the site loads against a fresh Firestore database,
`ProductsContext` notices the `products` collection is empty and seeds it
from `src/data/menuData.js` automatically -- you'll see the starter menu
appear within a second or two. After that, Firestore is the source of
truth; editing `menuData.js` again won't do anything (use the dashboard).

## Customer-facing site
- **Home / About / Contact** -- marketing pages, reservation form, map embed.
- **Menu** -- browse by category, live from Firestore. Items with size/milk/
  extras (coffee, tea) show "Customize & add" and open an options modal;
  the price updates live as options are picked.
- **Cart -> Checkout** -- cart drawer shows each line with its chosen
  customizations. Checkout collects name + pickup time and a payment
  choice: "Pay now" (marks the order **paid**) or "Pay at pickup" (marks it
  **unpaid**) -- there's no real payment processor wired in yet, see below.
  Placing an order writes it straight to Firestore, so it shows up on the
  dashboard immediately, from any device.

## Staff dashboard (`/dashboard`, or the "Staff Login" link in the footer)
Signs in with a real Firebase Auth account (the ones you created in step 6
above) -- no shared password, each staff member has their own login and a
"Sign out" button is in the dashboard header.

- **Orders tab** -- every order placed on the site, live and shared across
  every device signed in, filterable by All / Unpaid / Paid, with a
  "Mark Paid / Unpaid" toggle per order and a running total of what's
  still outstanding. Orders can't be deleted from the client (by design,
  per `firestore.rules`) -- there's always a paper trail.
- **Products tab** -- add, edit, or delete menu items (name, category,
  price, description, image). Changes show up on the public Menu page
  instantly, everywhere.

## Structure
```
src/
|-- main.jsx                 # mounts React app, all providers, router
|-- App.jsx                   # layout (Navbar/Footer) + route definitions
|-- firebase.js                # Firebase app init (reads .env)
|-- index.css                   # Tailwind import + theme tokens (colors, fonts)
|-- assets/                    # images/icons (currently hosted Unsplash images -- swap in your own)
|-- components/
|   |-- common/                 # Navbar, Footer, Button, CartDrawer
|   |-- home/                    # Hero, Feature
|   |-- menu/                     # MenuCard, Filter, CustomizeModal
|   `-- dashboard/                 # StaffGate, OrdersPanel, ProductsPanel
|-- pages/                     # Home, Menu, About, Contact, Checkout, Dashboard, NotFound
|-- context/
|   |-- AuthContext.jsx          # Firebase Auth sign-in/out state (staff)
|   |-- CartContext.jsx           # in-session cart state (customized line items, qty, subtotal)
|   |-- ProductsContext.jsx        # live Firestore product catalog (+ one-time seed)
|   `-- OrdersContext.jsx           # live Firestore order log (paid/unpaid)
|-- hooks/useFetchMenu.js        # thin hook over ProductsContext, kept for convenience
`-- data/menuData.js             # starter menu + reusable customization option groups (seed only)
firestore.rules                # security rules -- paste into Firebase Console -> Firestore -> Rules
.env.example                    # copy to .env and fill in your Firebase config
```

## How customization -> price works
Each product can define an `options` array (see `optionLibrary` in
`data/menuData.js`) of groups like Size, Milk, Extras -- each choice carries
a `priceDelta`. `CustomizeModal` lets the customer pick from each group,
`CartContext.addItem` sums the deltas into `unitPrice`, and that price
(not the base price) flows through the cart, checkout total, and the
order document written to Firestore.

## Adding payment processing later
Right now "Pay now" at checkout just marks the order `paid` client-side --
there's no real charge. When you're ready to wire up a payment API
(MoMo, Stripe, Flutterwave, etc.):
1. Add the API call in `Checkout.jsx`'s `handlePlaceOrder`, before
   `addOrder(...)`.
2. Only call `addOrder` (or set `status: "paid"`) after the payment
   provider confirms success -- otherwise an order could show as paid
   without money actually moving.
3. For anything security-sensitive (secret keys, verifying webhooks),
   that logic needs to run server-side -- a Firebase Cloud Function is
   the natural next addition here, since you're already on Firebase.
