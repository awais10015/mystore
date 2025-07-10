"use client";
import React from "react";

import { useProductContext } from "@/app/context/ProductContext";
import Navbar from "../components/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCart } from "@/app/context/CartContext";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Shopall = ({ product }) => {
  useGSAP(() => {
    gsap.from([".shopall"], {
      y: 600,
      // scale:0.7,
      opacity: 0,
      duration: 0.7,
      // delay: 1,
    });
  }, []);

  const router = useRouter()
  const {isSignedIn} = useUser()
  const { addToCart } = useCart();

  const { filteredProducts, setMaxPrice, setSelectedCategory } =
    useProductContext();
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-6 md:px-10 py-10 shopall bg-white text-black">
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <select
            onChange={(e) => {
              if (e.target.value !== "All Categories") {
                setSelectedCategory(e.target.value);
              } else {
                setSelectedCategory(null);
              }
              // console.log(e.target.value);
            }}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-400 transition"
          >
            <option className="text-gray-500">All Categories</option>
            <option className="text-gray-800">Bedroom</option>
            <option className="text-gray-800">Livingroom</option>
            <option className="text-gray-800">Office</option>
            <option className="text-gray-800">Decor</option>
          </select>

          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-0 focus:border-gray-400 transition placeholder:text-gray-500"
          />
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#F1F3F2] p-4 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full  object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <h2 className="text-xl mt-6 font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 text-lg">${product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className=" px-5 py-2 bg-black text-white rounded-lg transition-all duration-200 hover:bg-gray-800 active:scale-95 active:shadow-inner"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shopall;
