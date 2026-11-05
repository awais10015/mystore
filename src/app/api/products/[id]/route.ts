import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Product from "@/lib/modals/product";
import { getProductDetails } from "@/lib/product-details";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  try {
    await connect();
    const product = await Product.findOne({ id: productId }).lean<{
      id: number;
      name: string;
      image: string;
      price: string;
      description: string;
      category: string[];
    }>();

    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        category: product.category,
        details: getProductDetails(product.id),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}
