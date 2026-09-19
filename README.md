# Noevia

A React + Vite website for Noevia cafe: a cozy coffee shop website with a customizable menu, a cart -> checkout flow, and a staff dashboard for managing orders and products -- backed by a real Firebase project (Firestore + Auth).

# Stack
- React 19 + Vite
- react Router v7
- Tailwind CSS V4
- Firebase: Firestore (database) + Authentication (staff login)

## One-time Firebase setup
This we needs a real Firebase project before it will run seemlessly. All of this is done once, in the Firebase console (free tier to updated later):
1. https://console.firebase.google.com -> **Add Project** -> name it: "Noevia" -> finish the wizard (Analytics optional).
2. In the project, click the **web** icon ('</>') to register a web app. Copy the 'firebaseConfig' values it gives you.
3. In the left sidebar: **Build -> Firestore Database -> Create database**.
start in **production mode**, pick the region (EU/Africa).
4. Still in Firestore, go to the **Rules** tab, and paste paste in the contents of 'firestore.rules' from this project. Click **Publish**.
5. In the left sidebar: **Build -> Authentication -> Get started**  -> enable the **Email/Password** signin provider.
6. In Authentication -> **Users** tab, click **Add users** and create a login for each staff member who needs the dashboard (email + password).
This is how staff sign in at `/dashboard` -- there is no self-signup.
7. Back in this project folder:
```bash
cp .env.example .env
```
and paste the six values from step 2 into `.env`.

That's it -- no server to deploy or maintain. The site talks to Firestore directly from the browser, gated by the rules published in step 4.

## Getting started
```bash
npm install
npm run dev         #starts local dev server
npm run build       # production build -> dist/
npm run preview     # preview the production build
```

The very first time the site loads against a fresh Firestore database,
`ProductsContext` notices the `products` collection is empty and seeds it from `src/data/menuData.js` automatically -- you'll see the starter menu appear within a second or two. After taht, Firestore is the source of truth; editing `menuData.js` again won't do anything (use teh dashboard).

## customer-facing site
- **Home / About ? Contact** --marketing pages, reservation form, map embed.
- **Menu** -- browse by category, live from Firestore. Items with size/milk/extras (coffee, tea) show "Customize & add" and open an options modal; the price updates live as options are picked.
- **Cart -> Checkout** -- cart drawer shows each line with its chosen customizations. Checkout collects name + pickup time and a payment choice: "pay now" (marks teh order **paid**) or "Pay at pickup" (marks it **unpaid**) -- tehre's no real payment processor wired in yet, see below. Placing an order on the dashboard immediately, from any device.

## Staff dashboard (`/dasboard`, or the "staff Login" link in the footer)
Signs in with a real Firebase Auth account (the ones created in step 6 above) -- no shared password, each staff member has their own login and a "sign out" button is in teh dashboard header.

- **Orders tab** -- every order placed on the site, live and shared across every device signed in, filtertable by All /Unpaid / Paid, with a "Mark Paid / Unpaid" toggle per order and a running total of what's still outstanding. Orders can't be deleted from the client (by design, per `firestore.rules`) -- there's always a paper trail.
- **Products tab** -- add, edit, or delete menu items (name, category, price, description, image). Changes show up on the public Menu page instantly, everywhere.

## Structure
```
src/
|-- main.jsx            # mounts React app, all providers, router
|-- App.jsx             # layout (Navbar/Footer) + route definitions
|-- firebase.js         # firebase app init (reads .env)
|-- index.css           # tailwind import + theme tokens (colors, fonts)
|-- assets/             # images/icons (currently hosted Unsplashimages -- swap in your own)
|-- components/
|  |-- common/          # Navbar, footer, button, cartdrawer
|  |-- home/            # Hero, Feature
|  |-- menu/            # MenuCard, Filter, CustomizeModal
|  `-- dashboard/       # StaffGate, OrdersPanel, ProductsPanel
|-- pages/              # Home, Menu, About, Contact, Checkout, Dashboard, NotFound
|-- context/
|  |-- AuthContext.jsx          # Firebase Auth sign-in/out state (staff)
|  |-- CartContext.jsx          # in-session cart state (customized line items, qty, subtotal)
|  |-- ProductsContext.jsx      # live Firestore product catalog (+ one-time seed)
|  `-- OrdersContext.jsx        # live Firestore order log (paid/unpaid)
|-- hooks/useFetchMenu.js       # thin hook over ProductsContext, kept for convenience
`-- data/menuData.js            # starter menu + reusable customization option groups (seed only)
firestore.rules         # security rules -- paste into Firebase Console -> Firestore -> Rules
.env.example            # copy to .env and fill in the Firebase config
```

## How customization -> price works
Each product can define an `options` array (see `optionLibrary` in `data/menuData.js`) of groups like size, Milk, extras -- each choice carries a `PriceData`. `CustomizeModal` lets the customer pick from each group, `CartContext.addItem` sums the deltas into `unitPrice`, and that price (not the base price) flows through the cart, checkout total and the order document written to firestore.

## Adding payment processing later
Right now "Pay now" at checkout just marks the order `paid` client-side -- there's no real charge. When you're ready to wire up a payment API (MoMo, Stripe, Flutterwave...):
1. Add the API call in `checkout.jsx`'s `handlePlaceOrder`, before `addorder(...)`.
2. Only call `addOrder` (or set `status: "paid"`) after the payment provider confirms success -- otherwise an order could show as paid without money actually moving in.
3. For anything security-sensitive (secret keys, verifying webhooks), that logic needs to run server-side -- a Firebase cloud Function is the natural next addition here, since you're already on Firebase.