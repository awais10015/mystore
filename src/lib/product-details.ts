export type ProductDetails = {
  materials: string;
  dimensions: string;
  finish: string;
  care: string;
};

const details: Record<number, ProductDetails> = {
  1: {
    materials: "Brass and frosted glass",
    dimensions: "8 in diameter × 14 in height",
    finish: "Warm antique brass",
    care: "Wipe with a dry cloth. Avoid abrasive cleaners on the brass.",
  },
  2: {
    materials: "Solid oak and linen",
    dimensions: "32 in wide × 18 in deep × 30 in high",
    finish: "Natural oak",
    care: "Dust weekly. Use a coaster on the wood surface.",
  },
  3: {
    materials: "Powder-coated steel",
    dimensions: "24 in wide × 24 in deep × 16 in high",
    finish: "Matte black",
    care: "Wipe spills promptly so the powder coat stays even.",
  },
  4: {
    materials: "Walnut veneer and foam",
    dimensions: "72 in wide × 36 in deep × 32 in high",
    finish: "Dark walnut",
    care: "Vacuum fabric with a soft brush. Keep out of direct sun.",
  },
  5: {
    materials: "Marble and iron",
    dimensions: "40 in wide × 20 in deep × 18 in high",
    finish: "Polished stone",
    care: "Seal the stone yearly. Clean with a pH-neutral stone cleaner.",
  },
  6: {
    materials: "Ash wood and leather",
    dimensions: "28 in wide × 30 in deep × 32 in high",
    finish: "Light ash",
    care: "Condition the leather twice a year. Avoid heat vents.",
  },
  7: {
    materials: "Upholstered maple frame",
    dimensions: "84 in wide × 40 in deep × 34 in high",
    finish: "Oatmeal linen",
    care: "Rotate cushions monthly. Spot-clean with mild soap.",
  },
  8: {
    materials: "Ceramic and cotton shade",
    dimensions: "16 in diameter × 22 in height",
    finish: "Gloss white",
    care: "Unplug before cleaning. Dust the shade with a lint roller.",
  },
  9: {
    materials: "Hand-blown glass",
    dimensions: "10 in wide × 10 in deep × 12 in high",
    finish: "Clear with smoke tint",
    care: "Wash by hand. Do not use in a dishwasher.",
  },
  10: {
    materials: "Rattan and steel",
    dimensions: "20 in diameter × 18 in height",
    finish: "Natural rattan",
    care: "Keep dry. Brush dust out of the weave.",
  },
  11: {
    materials: "Cast aluminum",
    dimensions: "22 in wide × 22 in deep × 18 in high",
    finish: "Satin bronze",
    care: "Suitable for covered outdoor use. Dry after rain.",
  },
  12: {
    materials: "Wool felt and birch",
    dimensions: "18 in wide × 18 in deep × 17 in high",
    finish: "Charcoal felt",
    care: "Blot spills. Do not machine wash the cushion.",
  },
  13: {
    materials: "Tempered glass and chrome",
    dimensions: "48 in wide × 24 in deep × 29 in high",
    finish: "Mirror chrome",
    care: "Use a glass cleaner on the top only. Dry the frame.",
  },
  14: {
    materials: "Boucle and pine",
    dimensions: "60 in wide × 34 in deep × 31 in high",
    finish: "Cream boucle",
    care: "Lint-roll the fabric. Keep pets from the arms.",
  },
  15: {
    materials: "Matte ceramic",
    dimensions: "12 in diameter × 3 in height",
    finish: "Soft black",
    care: "Hand wash. Not for the oven or microwave.",
  },
  16: {
    materials: "Brushed brass and steel",
    dimensions: "14 in diameter × 20 in height",
    finish: "Brushed brass",
    care: "Dust the shade and wipe fingerprints from the metal.",
  },
};

const fallback: ProductDetails = {
  materials: "Mixed hardwood and textile",
  dimensions: "Varies by piece",
  finish: "Studio finish",
  care: "Dust with a soft cloth and avoid standing water.",
};

export function getProductDetails(productId: number): ProductDetails {
  return details[productId] ?? fallback;
}
