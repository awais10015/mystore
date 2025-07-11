import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  id: {
    type: Number, 
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
});

const Product = models?.Product || model("Product", ProductSchema);
export default Product;
