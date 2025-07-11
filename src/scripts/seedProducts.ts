import "dotenv/config";


import mongoose from "mongoose";
import Product from "../lib/modals/product";


const productsData = [
  {
    id: 1,
    name: "Product One",
    image: "/zproducts/P1.jpg",
    price: "250",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom"],
  },
  {
    id: 2,
    name: "Product Two",
    image: "/zproducts/P2.jpg",
    price: "430",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom", "Decor", "Office"],
  },
  {
    id: 3,
    name: "Product Three",
    image: "/zproducts/P3.jpg",
    price: "500",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Livingroom", "Office"],
  },
  {
    id: 4,
    name: "Product Four",
    image: "/zproducts/P4.jpg",
    price: "700",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom", "Decor"],
  },
  {
    id: 5,
    name: "Product Five",
    image: "/zproducts/P5.jpg",
    price: "600",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Livingroom", "Office"],
  },
  {
    id: 6,
    name: "Product Six",
    image: "/zproducts/P6.jpg",
    price: "630",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Livingroom", "Office"],
  },
  {
    id: 7,
    name: "Product Seven",
    image: "/zproducts/P7.jpg",
    price: "900",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom", "Office"],
  },
  {
    id: 8,
    name: "Product Eight",
    image: "/zproducts/P8.jpg",
    price: "900",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Livingroom"],
  },
  {
    id: 9,
    name: "Product Nine",
    image: "/zproducts/P9.jpg",
    price: "1200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Decor"],
  },
  {
    id: 10,
    name: "Product Ten",
    image: "/zproducts/P10.jpg",
    price: "1100",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Decor", "Livingroom"],
  },
  {
    id: 11,
    name: "Product Eleven",
    image: "/zproducts/P11.jpg",
    price: "1350",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Decor", "Office"],
  },
  {
    id: 12,
    name: "Product Twelve",
    image: "/zproducts/P12.jpg",
    price: "750",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Decor", "Office"],
  },
  {
    id: 13,
    name: "Product Thirteen",
    image: "/zproducts/P13.jpg",
    price: "1500",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Office"],
  },
  {
    id: 14,
    name: "Product Fourteen",
    image: "/zproducts/P14.jpg",
    price: "1400",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Decor", "Office"],
  },
  {
    id: 15,
    name: "Product Fifteen",
    image: "/zproducts/P15.jpg",
    price: "950",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom", "Decor", "Office"],
  },
  {
    id: 16,
    name: "Product Sixteen",
    image: "/zproducts/P16.jpg",
    price: "1330",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam fugiat ab, ut excepturi eos consectetur rerum rem dolore, quas minima iste labore eius eaque voluptatum natus maxime incidunt? Harum?",
    category: ["Bedroom", "Decor", "Livingroom", "Office"],
  },
];


const MONGODB_URL = process.env.MONGODB_URL;
console.log("MONGODB_URL:", MONGODB_URL);
const seedProducts = async () => {
  try {
    if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables.");
}
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");

    // Optional: Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new data
    await Product.insertMany(productsData);
    console.log("Inserted products successfully");

    mongoose.connection.close();

    console.log("Connected to DB:", mongoose.connection.name);

  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

seedProducts();
