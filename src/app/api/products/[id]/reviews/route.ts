import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connect } from "@/lib/db";
import Product from "@/lib/modals/product";
import Review from "@/lib/modals/review.modal";
import { dummyReviewsFor } from "@/lib/dummy-reviews";

type RouteContext = { params: Promise<{ id: string }> };

type LeanReview = {
  _id: { toString(): string };
  authorName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

function serialize(review: LeanReview) {
  return {
    id: review._id.toString(),
    authorName: review.authorName,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt.toISOString(),
  };
}

async function loadReviews(productId: number) {
  const count = await Review.countDocuments({ productId });
  if (count === 0) {
    await Review.insertMany(dummyReviewsFor(productId));
  }

  const reviews = await Review.find({ productId })
    .sort({ createdAt: -1 })
    .lean<LeanReview[]>();

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return {
    reviews: reviews.map(serialize),
    average: Math.round(average * 10) / 10,
    count: reviews.length,
  };
}

export async function GET(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  try {
    await connect();
    const product = await Product.findOne({ id: productId }).select("id");
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(await loadReviews(productId));
  } catch {
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(req: Request, context: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  let body: { rating?: number; comment?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rating = Number(body.rating);
  const comment = body.comment?.trim() ?? "";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1 to 5" }, { status: 400 });
  }
  if (!comment) {
    return NextResponse.json({ error: "Comment is required" }, { status: 400 });
  }

  try {
    await connect();
    const product = await Product.findOne({ id: productId }).select("id");
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await Review.create({
      productId,
      authorName: session.user.name || session.user.email || "Customer",
      rating,
      comment,
      userId: session.user.id,
    });

    return NextResponse.json(await loadReviews(productId));
  } catch {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}
