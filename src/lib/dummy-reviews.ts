const authors = [
  "Maya Chen",
  "Jonah Ellis",
  "Priya Shah",
  "Owen Brooks",
  "Lina Ortiz",
  "Samir Patel",
  "Nora Blake",
  "Chris Adeyemi",
];

const comments = [
  "Solid build and it looks exactly like the photo. Easy to place in a small room.",
  "Arrived well packed. The finish is quieter in person than I expected, which I like.",
  "Comfortable and sturdy. I would buy a second one for the other side of the room.",
  "Nice weight and clean lines. Took a few days to settle into the space.",
  "The color matches the listing. Simple to wipe down after daily use.",
  "Better than the showroom sample. Guests keep asking where it is from.",
];

const ratings = [5, 4, 5, 4, 3, 5];

export type DummyReview = {
  productId: number;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

export function dummyReviewsFor(productId: number): DummyReview[] {
  return [0, 1, 2].map((offset) => ({
    productId,
    authorName: authors[(productId + offset) % authors.length],
    rating: ratings[(productId + offset) % ratings.length],
    comment: comments[(productId * 2 + offset) % comments.length],
    createdAt: new Date(Date.now() - (offset + 3 + productId) * 86400000),
  }));
}
