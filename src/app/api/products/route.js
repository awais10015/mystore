import { NextResponse } from "next/server";
import Product from "@/lib/modals/product";

import {connect} from "@/lib/db";

export async function GET() {
  try {
    await connect();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
