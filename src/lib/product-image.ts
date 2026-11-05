/**
 * Normalize product image paths for next/image and public assets.
 * Orders often store absolute Stripe URLs; files live under /zproducts/.
 */
export function normalizeProductImage(src?: string | null): string {
  if (!src?.trim()) return "";

  let path = src.trim();

  try {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      path = new URL(path).pathname;
    }
  } catch {
    return "";
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  // Legacy / wrong folder name used in some stored order snapshots
  if (path.startsWith("/products/")) {
    path = path.replace(/^\/products\//, "/zproducts/");
  }

  return path;
}
