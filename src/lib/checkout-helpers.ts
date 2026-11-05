import Product from "@/lib/modals/product";

export function resolveCheckoutOrigin(req: Request): string {
  const requestOrigin = new URL(req.url).origin;
  const envUrl = process.env.AUTH_URL?.trim();
  if (!envUrl) return requestOrigin;

  try {
    const parsed = new URL(envUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return requestOrigin;
    }
    return parsed.origin;
  } catch {
    return requestOrigin;
  }
}

export function toAbsoluteImageUrl(
  image: string | undefined | null,
  origin: string
): string | undefined {
  if (!image?.trim()) return undefined;
  const trimmed = image.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  try {
    return new URL(trimmed, origin).href;
  } catch {
    return undefined;
  }
}

export type CheckoutLineItem = {
  productId: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  stripeLineItem: {
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: {
        name: string;
        images?: string[];
        metadata: { productId: string };
      };
    };
    quantity: number;
  };
};

export async function buildCheckoutFromRequestItems(
  items: { id: number; quantity: number }[],
  origin: string
): Promise<{ lineItems: CheckoutLineItem[]; subtotal: number }> {
  if (!items?.length) {
    throw new Error("Cart is empty");
  }

  const lineItems: CheckoutLineItem[] = [];

  for (const item of items) {
    const qty = Math.floor(Number(item.quantity));
    const productId = Number(item.id);
    if (!productId || qty < 1) {
      throw new Error("Invalid cart item");
    }

    const product = await Product.findOne({ id: productId });
    if (!product) {
      throw new Error(`Product not found: ${productId}`);
    }

    const unitPrice = parseFloat(product.price);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      throw new Error(`Invalid price for product: ${productId}`);
    }

    const lineTotal = unitPrice * qty;
    const unitAmountCents = Math.round(unitPrice * 100);
    const imageUrl = toAbsoluteImageUrl(product.image, origin);

    lineItems.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice,
      quantity: qty,
      lineTotal,
      stripeLineItem: {
        price_data: {
          currency: "usd",
          unit_amount: unitAmountCents,
          product_data: {
            name: product.name,
            ...(imageUrl ? { images: [imageUrl] } : {}),
            metadata: { productId: String(product.id) },
          },
        },
        quantity: qty,
      },
    });
  }

  const subtotal = lineItems.reduce((sum, li) => sum + li.lineTotal, 0);
  return { lineItems, subtotal };
}
