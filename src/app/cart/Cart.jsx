"use client";
import { useCart } from "@/app/context/CartContext";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Cart = () => {
  useGSAP(() => {
    gsap.from([".cart", ".cartItems"], {
      y: 600,
      opacity: 0,
      duration: 0.7,
      delay: 0.5,
    });
  }, []);

  const { cart, removeFromCart, clearCart, total } = useCart();

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <>
      <Navbar />
      <div className="cart p-6 sm:p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="h-72 text-center text-gray-500 text-xl mt-20">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="cartItems space-y-4 w-full">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-center bg-[#F1F3F2] p-4 rounded-xl shadow transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt="productImage"
                      className="rounded object-cover"
                    />
                    <div className="text-gray-800">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>
                  <button
                    className="mt-4 sm:mt-0 text-red-600 font-medium hover:text-red-800 transition"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t pt-6 text-gray-800 text-xl flex flex-col sm:flex-row justify-between items-center gap-4">
              <p>
                Total: <span className="font-bold text-2xl">${total}</span>
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="rounded-full bg-black px-8 py-2.5 text-white text-base font-medium hover:bg-gray-900 active:scale-95 transition-all duration-200"
                >
                  Proceed to checkout
                </button>
                <button
                  onClick={clearCart}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
