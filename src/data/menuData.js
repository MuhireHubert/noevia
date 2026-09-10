// Static local content mock — used to seed ProductsContext on first run.
// After that, the source of truth is localStorage (edited from the staff
// dashboard), not this file. See src/context/ProductsContext.jsx.

// Shared, reusable customization groups. Each item below opts into the
// ones that make sense for it via its own `options` array.
const sizeOption = {
  id: "size",
  label: "Size",
  type: "single",
  choices: [
    { id: "regular", label: "Regular", priceDelta: 0 },
    { id: "large", label: "Large", priceDelta: 0.75 },
  ],
};

const milkOption = {
  id: "milk",
  label: "Milk",
  type: "single",
  choices: [
    { id: "whole", label: "Whole Milk", priceDelta: 0 },
    { id: "oat", label: "Oat Milk", priceDelta: 0.6 },
    { id: "almond", label: "Almond Milk", priceDelta: 0.6 },
    { id: "skim", label: "Skim Milk", priceDelta: 0 },
  ],
};

const espressoExtrasOption = {
  id: "extras",
  label: "Extras",
  type: "multi",
  choices: [
    { id: "extra-shot", label: "Extra Shot", priceDelta: 1.0 },
    { id: "decaf", label: "Make it Decaf", priceDelta: 0 },
  ],
};

const sweetnessOption = {
  id: "sweetness",
  label: "Sweetness",
  type: "single",
  choices: [
    { id: "regular-honey", label: "Regular Honey", priceDelta: 0 },
    { id: "extra-honey", label: "Extra Honey", priceDelta: 0.3 },
    { id: "no-sweetener", label: "No Sweetener", priceDelta: 0 },
  ],
};

const menuData = [
  {
    id: "esp-01",
    name: "Espresso",
    category: "Coffee",
    price: 3.0,
    description: "A tight, syrupy shot pulled from our house blend.",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption, espressoExtrasOption],
  },
  {
    id: "esp-02",
    name: "Cortado",
    category: "Coffee",
    price: 4.0,
    description: "Equal parts espresso and warm milk, no foam.",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption, milkOption, espressoExtrasOption],
  },
  {
    id: "esp-03",
    name: "Oat Milk Latte",
    category: "Coffee",
    price: 5.25,
    description: "Double shot, steamed oat milk, a whisper of latte art.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption, milkOption, espressoExtrasOption],
  },
  {
    id: "esp-04",
    name: "Pour Over",
    category: "Coffee",
    price: 4.5,
    description: "Single-origin, brewed to order, rotates weekly.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption],
  },
  {
    id: "esp-05",
    name: "Iced Cold Brew",
    category: "Coffee",
    price: 4.75,
    description: "Steeped 18 hours, smooth and low-acid, over ice.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
    options: [
      sizeOption,
      {
        id: "extras",
        label: "Extras",
        type: "multi",
        choices: [
          { id: "extra-shot", label: "Extra Shot", priceDelta: 1.0 },
          { id: "sweet-cream", label: "Sweet Cream Float", priceDelta: 0.5 },
        ],
      },
    ],
  },
  {
    id: "tea-01",
    name: "Chamomile Honey Tea",
    category: "Tea",
    price: 3.75,
    description: "Loose-leaf chamomile, local honey, a slice of lemon.",
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption, sweetnessOption],
  },
  {
    id: "tea-02",
    name: "Matcha Latte",
    category: "Tea",
    price: 5.0,
    description: "Ceremonial-grade matcha whisked with steamed milk.",
    image: "https://images.unsplash.com/photo-1536013455962-9fb26a8f2b0e?q=80&w=800&auto=format&fit=crop",
    options: [sizeOption, milkOption, espressoExtrasOption],
  },
  {
    id: "pas-01",
    name: "Almond Croissant",
    category: "Pastries",
    price: 4.25,
    description: "Twice-baked, almond cream, dusted with powdered sugar.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pas-02",
    name: "Cinnamon Roll",
    category: "Pastries",
    price: 4.75,
    description: "Slow-proofed dough, brown butter icing, baked daily.",
    image: "https://images.unsplash.com/photo-1583527976967-3ec3f8dcbf0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "pas-03",
    name: "Banana Walnut Loaf",
    category: "Pastries",
    price: 3.95,
    description: "Dense, moist, toasted walnuts folded through.",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "food-01",
    name: "Avocado Toast",
    category: "Light Bites",
    price: 8.5,
    description: "Sourdough, smashed avocado, chili flake, flaky salt.",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "food-02",
    name: "Egg & Gruyère Sandwich",
    category: "Light Bites",
    price: 9.0,
    description: "Soft scrambled egg, gruyère, chive butter, brioche.",
    image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=800&auto=format&fit=crop",
  },
];

export const categories = ["All", "Coffee", "Tea", "Pastries", "Light Bites"];

// Reusable option groups, exposed so the staff dashboard can offer them
// when adding/editing a product without redefining the choices.
export const optionLibrary = {
  size: sizeOption,
  milk: milkOption,
  espressoExtras: espressoExtrasOption,
  sweetness: sweetnessOption,
};

export default menuData;
