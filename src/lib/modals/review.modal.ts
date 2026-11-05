import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    productId: {
      type: Number,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Review = models?.Review || model("Review", ReviewSchema);
export default Review;
