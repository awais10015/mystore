"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ImageSlider from "@/app/components/ImageSlider";
import Navbar from "@/app/components/Navbar";
import ShopByCategory from "@/app/components/ShopByCategory";

import Whyus from "@/app/components/Whyus";

const Page = () => {
  useGSAP(() => {
    gsap.from([".one", ".two", ".three"], {
      x: 200,
      opacity: 0,
      duration: 1.2,
      delay: 1,
    });
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full h-screen bg-[url('/hero.jpg')] bg-cover bg-center z-0" />
      <Navbar />

      <div className="relative z-10 pt-2 px-4 sm:px-16 flex flex-col items-start justify-center h-screen">
        <h1 className="one mt-5 text-black w-full text-3xl sm:text-7xl font-black">
          Up to 50% off
        </h1>
        <h5 className="two mt-5 text-black w-full text-xl sm:text-3xl font-black">
          Hundreds of styles available
        </h5>
        <button className=" three mt-5 w-32 h-12 bg-black text-white font-medium rounded hover:cursor-pointer">
          SHOP NOW
        </button>
      </div>

      <div className="z-10 relative bg-white px-4 py-10">
        <ImageSlider />
      </div>

      <hr className="relative z-10 border-t border-gray-400 " />

      <div className="z-10 relative bg-white px-4 py-10">
        <ShopByCategory />
      </div>

      <div className="z-10 relative bg-white">
        <Whyus />
      </div>
    </>
  );
};

export default Page;
