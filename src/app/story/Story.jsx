"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Story = () => {
  const mainRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      mainRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.1,
        delay: 1.2,
        ease: "power2.out",
      }
    );
    gsap.from([".story"], {
      y: 600,
      // scale:0.7,
      opacity: 0,
      duration: 0.7,
      // delay: 1,
    });
  }, []);
  return (
    <>
      <div
        ref={mainRef}
        className="main fixed w-full h-screen bg-[url('/story2.jpg')] bg-cover bg-center z-0"
      />
      <Navbar bg="white" />
      <div
        className="story relative z-10 flex items-center justify-center flex-col gap-5 p-10 
      bg-gradient-to-b from-[#F1F2F2] to-[#FEFEFE]"
      >
        <p className="text-gray-600">ABOUT US</p>
        <h1 className="text-7xl font-bold">OUR STORY</h1>
      </div>

      <div className="story relative bg-[#FEFEFE] w-full p-2 flex items-center justify-center">
        <Image
          src="/story.jpg"
          alt="Story"
          width={768}
          height={512}
          className="object-contain"
        />
      </div>

      <div className="story relative bg-[#FEFEFE] flex flex-col md:flex-row gap-10 px-4 sm:px-10 md:px-20 py-16 ">
        {/* Left Column */}
        <div className="flex-1 text-start">
          <p className="text-gray-600 text-sm sm:text-base mb-2">ABOUT US</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug text-gray-800">
            OUR TEAM IS
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug text-gray-800">
            WHAT WE VALUE
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug text-gray-800">
            THE MOST
          </h1>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6 text-gray-700 text-justify">
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">
            With great people, modern and cool products emerge.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus
            eget enim eget tincidunt. In finibus nisi ex, eu interdum urna
            euismod sit amet. Morbi sollicitudin in magna sed tristique. Nulla
            pharetra sapien eros, sit amet bibendum nibh consectetur quis.
            Curabitur tortor dolor, fringilla eu fringilla id, dignissim in
            urna. Nulla varius dolor ac eros posuere, nec interdum justo
            condimentum. Phasellus lacinia sit amet tellus at pulvinar. Maecenas
            faucibus porta quam.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            Ut in lorem ullamcorper velit facilisis pellentesque. In tincidunt
            metus eget arcu congue, ac aliquam velit ultricies. Aliquam posuere
            eu arcu et elementum. Donec pulvinar eget orci et pellentesque.
            Aenean at ultricies quam. Nunc feugiat sapien quis pharetra
            tincidunt. Etiam a viverra nulla. Pellentesque consectetur libero
            est, sed ullamcorper diam convallis ac. Praesent a convallis ante.
            Suspendisse potenti. Sed sed cursus erat, et auctor metus.
          </p>
        </div>
      </div>

      <div className="relative h-screen w-full flex flex-col items-center justify-center bg-black/10">
        <h1 className="text-white text-5xl font-black">
          SIMPLICITY CARRIED TO AN
        </h1>
        <h1 className="text-white text-5xl font-black">EXTREME BECOMES</h1>
        <h1 className="text-white text-5xl font-black">ELEGANCE</h1>
      </div>
    </>
  );
};

export default Story;
