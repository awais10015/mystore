"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Contact = () => {
  useGSAP(() => {
    gsap.from([".contact"], {
      y: 600,
      opacity: 0,
      duration: 0.7,
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="contact bg-[#F1F2F2] flex flex-col items-center px-4 sm:px-8 md:px-16 py-12 gap-5">
        <p className="text-gray-500 m-5 text-sm sm:text-base text-center">
          DON'T BE A STRANGER
        </p>
        <h1 className="text-4xl m-5 sm:text-5xl md:text-6xl font-black text-center">
          CONTACT US
        </h1>

        <div className=" m-5 flex flex-col md:flex-row gap-6 w-full max-w-6xl mt-8">
          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <FaPhoneAlt className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">PHONE NUMBER</h2>
            <p className="text-gray-500 text-sm">888-333-5656</p>
          </div>

          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <MdOutlineEmail className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">EMAIL</h2>
            <p className="text-gray-500 text-sm break-words">
              contact@info.com
            </p>
          </div>

          <div className="bg-white w-full flex-1 p-6 rounded-xl shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col items-center text-center">
            <FaLocationDot className="h-10 w-10 text-black mb-3" />
            <h2 className="text-xl font-bold mb-1">ADDRESS</h2>
            <p className="text-gray-500 text-sm">Jhelum, Punjab, Pakistan</p>
          </div>
        </div>

        <div className="w-full mt-20">
          <p className="text-gray-500 m-5 text-sm sm:text-base text-center">
            MESSAGE US
          </p>
          <h1 className="text-4xl m-5 sm:text-5xl md:text-6xl font-black text-center">
            GET IN TOUCH
          </h1>
          <form action="" className="mt-15 flex flex-col w-full gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="firstName" className="mb-1">
                  First Name
                </label>
                <input
                  className="bg-white p-2 rounded border border-gray-300"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Write first name..."
                />
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="lastName" className="mb-1">
                  Last Name
                </label>
                <input
                  className="bg-white p-2 rounded border border-gray-300"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Write last name..."
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="Email" className="mb-1">
                Email
              </label>
              <input
                className="bg-white p-2 rounded border border-gray-300"
                type="email"
                name="Email"
                id="Email"
                placeholder="Write your email..."
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="Description" className="mb-1">
                Message
              </label>
              <textarea
                className="bg-white p-3 rounded border border-gray-300 min-h-[150px]"
                name="Description"
                id="Description"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div className="flex items-center w-full justify-center">
              <button className="bg-black text-white h-12 text-lg w-25">
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
