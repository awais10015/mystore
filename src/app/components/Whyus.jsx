"use client";
import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  {
    name: "FAST DELIVERY",
    products:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    image: "/truck.svg",
  },
  {
    name: "FREE SHIPPING",
    products:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    image: "/info.svg",
  },
  {
    name: "SECURE CHECKOUT",
    products:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    image: "/shield.svg",
  },
  {
    name: "EASY RETURNS",
    products:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.",
    image: "/cart.svg",
  },
];

const Whyus = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(".why", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".why",
        scroller: "body",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div className="why flex flex-col justify-center items-center px-4 py-14 gap-6">
      <p className="text-sm text-gray-500">BEST PRODUCTS</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-black mb-10 text-center">
        WHY CHOOSE US
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-screen-xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="rounded-xl shadow-lg p-6 gap-4 bg-white flex flex-col items-center text-center min-h-[320px] hover:shadow-xl transition"
          >
            <Image src={cat.image} alt={cat.name} width={60} height={60} />
            <h1 className="text-lg font-bold text-black mt-4">{cat.name}</h1>
            <p className="text-sm text-gray-600 mt-2">{cat.products}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Whyus;
