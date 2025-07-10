"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { RxAvatar } from "react-icons/rx";
import { FaHeadphonesAlt } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";

const faqData = [
  {
    question: "How do I know that my products lorem ipsum dolor sit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.",
  },
  {
    question: "Where can I see my invoices?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.",
  },
  {
    question: "Can I compare prices between tincidunt dui in congue?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.",
  },
  {
    question: "Are there any surcharges?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.",
  },
  {
    question: "I made an online purchase. Where can I check order status?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus dignissim turpis nec interdum. Nunc faucibus turpis vitae mi rhoncus, sed interdum mi commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris est, sagittis id arcu eu, scelerisque maximus odio.",
  },
];

const Help = () => {
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
    gsap.from([".help"], {
      y: 600,
      // scale:0.7,
      opacity: 0,
      duration: 0.7,
      // delay: 1,
    });
  }, []);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <>
      <div
        ref={mainRef}
        className="main fixed w-full h-screen bg-[url('/helpbg.jpg')] bg-cover bg-center z-0"
      />
      <Navbar bg="white" />
      <div className="help relative bg-[#F1F2F2] flex flex-col items-center px-4 sm:px-8 md:px-16 py-12 gap-5">
        <p className="text-gray-500 text-sm sm:text-base text-center">
          24/7 SUPPORT
        </p>
        <h1 className="text-4xl m-5 sm:text-5xl md:text-6xl font-black text-center">
          READY TO HELP
        </h1>

        <div className=" m-5 flex flex-col md:flex-row gap-6 w-full max-w-6xl mt-8">
          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <RxAvatar className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">ACCOUNT PRIVACY</h2>
            <p className="text-gray-500 text-sm">
              Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin
              leo eu congue gravida. In semper lectus neque, eu interdum nisl
              pretium sit amet etiam efficitur.
            </p>
          </div>

          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <FaHeadphonesAlt className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">SUPPORT SPECIALIST</h2>
            <p className="text-gray-500 text-sm break-words">
              Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin
              leo eu congue gravida. In semper lectus neque, eu interdum nisl
              pretium sit amet etiam efficitur.
            </p>
          </div>

          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <IoStarSharp className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">SELLER STANDARDS</h2>
            <p className="text-gray-500 text-sm">
              Quisque a pharetra quam. Donec et risus sem. Etiam sollicitudin
              leo eu congue gravida. In semper lectus neque, eu interdum nisl
              pretium sit amet etiam efficitur.
            </p>
          </div>
        </div>
      </div>

      <div className="contact relative bg-[#F1F2F2] flex flex-col items-center px-4 sm:px-8 md:px-16 py-12 gap-5">
        <p className="text-gray-500 text-sm sm:text-base text-center">FAQ</p>
        <h1 className="text-4xl m-5 sm:text-5xl md:text-6xl font-black text-center">
          FIND ANSWERS
        </h1>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-4xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border border-gray-300 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-4 font-semibold text-lg flex justify-between items-center"
                  >
                    {faq.question}
                    <span className="text-xl">{isOpen ? "-" : "+"}</span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 px-4 ${
                      isOpen
                        ? "max-h-40 opacity-100 py-2"
                        : "max-h-0 opacity-0 py-0"
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative h-screen w-full flex flex-col items-center justify-center bg-black/10">
        <h1 className="text-white text-5xl font-black">STILL NEED HELP</h1>
        <Link href="/contact">
          <button className="bg-red-400 hover:bg-white mt-5 cursor-pointer h-13 w-35">
            CONTACT US
          </button>
        </Link>
      </div>
    </>
  );
};

export default Help;
