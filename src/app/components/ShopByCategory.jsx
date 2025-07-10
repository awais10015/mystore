"use client";

import { Scale } from "lucide-react";
import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  {
    name: "BEDROOM",
    products: "6 PRODUCTS",
    image: "/bedroomCategory.jpg",
    link: "/bedroom",
  },
  {
    name: "DECOR",
    products: "9 PRODUCTS",
    image: "/decorCategory.jpg",
    link: "/decor",
  },
  {
    name: "LIVING ROOM",
    products: "6 PRODUCTS",
    image: "/livingroomCategory.jpg",
    link: "/livingroom",
  },
  {
    name: "OFFICE",
    products: "11 PRODUCTS",
    image: "/officeCategory.jpg",
    link: "/office",
  },
];

const ShopByCategory = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(".category", {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ".category",
        scroller: "body",
      },
    });
  }, []);

  return (
    <div className="category flex flex-col justify-center items-center px-4 py-10 gap-6">
      <p className="text-md text-gray-500">Shop By Category</p>
      <h1 className="text-5xl font-bold text-black mb-6">Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
        {categories.map((cat, i) => (
          <Link key={i} href={cat.link} className="block">
            <div
              className="relative aspect-square rounded-xl bg-cover bg-center overflow-hidden shadow-md group hover:scale-105 transition-all ease-in-out"
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="absolute inset-0 bg-black/2 group-hover:bg-black/30 transition" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-transparent">
                <h1 className="text-lg font-bold text-black">{cat.name}</h1>
                <p className="text-sm text-gray-700">{cat.products}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
