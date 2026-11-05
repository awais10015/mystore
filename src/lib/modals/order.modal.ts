import { Schema, model, models, Types } from "mongoose";

const OrderItemSchema = new Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    lineTotal: { type: Number, required: true },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema(
  {
    name: { type: String },
    line1: { type: String },
    line2: { type: String },
    city: { type: String },
    state: { type: String },
    postal_code: { type: String },
    country: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    stripeSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    items: { type: [OrderItemSchema], required: true },
    currency: { type: String, default: "usd" },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shippingAddress: { type: ShippingAddressSchema },
    purchasedAt: { type: Date },
    estimatedDeliveryDate: { type: Date },
  },
  { timestamps: true }
);

export type OrderDocument = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  stripeSessionId: string;
  status: "pending" | "paid" | "failed" | "refunded";
  items: {
    productId: number;
    name: string;
    image: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }[];
  currency: string;
  subtotal: number;
  total: number;
  shippingAddress?: {
    name?: string;
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  purchasedAt?: Date;
  estimatedDeliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const Order = models?.Order || model("Order", OrderSchema);
export default Order;
