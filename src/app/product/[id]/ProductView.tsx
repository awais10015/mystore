"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import PageLoader from "@/app/components/PageLoader";
import { useCart } from "@/app/context/CartContext";

type ProductDetails = {
  materials: string;
  dimensions: string;
  finish: string;
  care: string;
};

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  category: string[];
  details: ProductDetails;
};

type Review = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

function Stars({ value }: { value: number }) {
  return (
    <span className="text-amber-500" aria-label={`${value} out of 5 stars`}>
      {"★★★★★".slice(0, Math.round(value))}
      <span className="text-gray-300">{"★★★★★".slice(Math.round(value))}</span>
    </span>
  );
}

export default function ProductView({ productId }: { productId: string }) {
  const { data: session, status } = useSession();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [average, setAverage] = useState(0);
  const [missing, setMissing] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function loadReviews() {
    const res = await fetch(`/api/products/${productId}/reviews`);
    if (!res.ok) return;
    const data = await res.json();
    setReviews(data.reviews ?? []);
    setAverage(data.average ?? 0);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) {
        if (!cancelled) setMissing(true);
        return;
      }
      const data = await res.json();
      if (!cancelled) setProduct(data.product);
      if (!cancelled) await loadReviews();
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setSubmitting(true);
    const res = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setFormError(data.error || "Could not save review");
      return;
    }
    setReviews(data.reviews ?? []);
    setAverage(data.average ?? 0);
    setComment("");
    setRating(5);
  }

  return (
    <>
      <Navbar />
      {missing && (
        <PageLoader>
          <p className="text-center text-gray-600">
            This product is not available.{" "}
            <Link href="/shopall" className="underline">
              Back to the shop
            </Link>
          </p>
        </PageLoader>
      )}

      {!product && !missing && <PageLoader>Loading product…</PageLoader>}

      {product && (
        <main className="w-full px-4 py-10 sm:px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              className="h-[28rem] w-full rounded-xl bg-[#F1F3F2] object-contain"
            />
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">
                {product.category.join(" · ")}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-3 text-2xl font-semibold text-gray-800">
                ${product.price}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                <Stars value={average} />{" "}
                {average > 0 ? `${average} · ${reviews.length} reviews` : "No reviews yet"}
              </p>
              <p className="mt-6 leading-relaxed text-gray-700">
                {product.description}
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-[#F1F3F2] p-3">
                  <dt className="font-semibold text-gray-900">Materials</dt>
                  <dd className="text-gray-700">{product.details.materials}</dd>
                </div>
                <div className="rounded-xl bg-[#F1F3F2] p-3">
                  <dt className="font-semibold text-gray-900">Dimensions</dt>
                  <dd className="text-gray-700">{product.details.dimensions}</dd>
                </div>
                <div className="rounded-xl bg-[#F1F3F2] p-3">
                  <dt className="font-semibold text-gray-900">Finish</dt>
                  <dd className="text-gray-700">{product.details.finish}</dd>
                </div>
                <div className="rounded-xl bg-[#F1F3F2] p-3">
                  <dt className="font-semibold text-gray-900">Care</dt>
                  <dd className="text-gray-700">{product.details.care}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-8 rounded-full bg-black px-8 py-2.5 text-white hover:bg-gray-900"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <section className="mt-14 border-t pt-10">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>

            {status === "authenticated" ? (
              <form onSubmit={onSubmit} className="mt-6 max-w-xl space-y-3">
                <label className="block text-sm text-gray-700">
                  Rating
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} star{n === 1 ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-gray-700">
                  Your review
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    rows={4}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder={`Reviewing as ${session?.user?.name || "you"}`}
                  />
                </label>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-black px-6 py-2 text-sm text-white disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Submit review"}
                </button>
              </form>
            ) : (
              <p className="mt-4 text-sm text-gray-600">
                <Link href={`/sign-in?callbackUrl=/product/${productId}`} className="underline">
                  Sign in
                </Link>{" "}
                to write a review.
              </p>
            )}

            <ul className="mt-8 space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-gray-900">{review.authorName}</p>
                    <Stars value={review.rating} />
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}
    </>
  );
}
