export const CATEGORIES = ["Bedroom", "Decor", "Office", "Livingroom"] as const;

export type Category = (typeof CATEGORIES)[number];

export type SalesRow = {
  date: string;
  category: Category;
  revenue: number;
  orders: number;
  itemsSold: number;
  cartItems: number;
  delivered: number;
};

const END = Date.UTC(2026, 10, 5);

function hash(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

function dateKey(daysBeforeEnd: number) {
  const d = new Date(END - daysBeforeEnd * 86400000);
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${d.getUTCFullYear()}-${month}-${day}`;
}

export const salesRows: SalesRow[] = [];

for (let day = 89; day >= 0; day -= 1) {
  CATEGORIES.forEach((category, index) => {
    const seed = day * 17 + index * 13;
    const wave = 0.65 + hash(seed) * 0.7;
    const orders = Math.max(1, Math.round((3 + index) * wave));
    const itemsSold = orders * (1 + Math.round(hash(seed + 1) * 2));
    const revenue =
      itemsSold * (160 + index * 45 + Math.round(hash(seed + 2) * 90));
    const cartItems = Math.round(itemsSold * (0.35 + hash(seed + 3) * 0.55));
    const delivered = Math.min(
      itemsSold,
      Math.round(itemsSold * (0.62 + hash(seed + 4) * 0.3))
    );

    salesRows.push({
      date: dateKey(day),
      category,
      revenue,
      orders,
      itemsSold,
      cartItems,
      delivered,
    });
  });
}

export function rowsInRange(days: number, category: Category | "All") {
  const cutoff = dateKey(days - 1);
  return salesRows.filter(
    (row) =>
      row.date >= cutoff && (category === "All" || row.category === category)
  );
}
