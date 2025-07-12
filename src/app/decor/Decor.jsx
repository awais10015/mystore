"use client";
import { useEffect } from "react";
import { useProductContext } from "@/app/context/ProductContext";
import Navbar from "../components/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCart } from "@/app/context/CartContext";

const Decor = ({ product }) => {
  useGSAP(() => {
    gsap.from([".decor"], {
      y: 600,

      opacity: 0,
      duration: 0.7,
    });
  }, []);

  const { addToCart } = useCart();
  const { filteredProducts, setSelectedCategory } = useProductContext();

  useEffect(() => {
    setSelectedCategory("Decor");
    return () => setSelectedCategory(null);
  }, []);

  return (
    <>
      <Navbar />
      <div className="decor p-10">
        <h1 className="text-3xl font-bold mb-4">Decor Products</h1>
        <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#F1F3F2] p-4 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <h2 className="text-xl mt-6 font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 text-lg">${product.price}</p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 px-5 py-2 bg-black text-white rounded-lg transition-all duration-200 hover:bg-gray-800 active:scale-95 active:shadow-inner"
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

export default Decor;
