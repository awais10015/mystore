import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-[#F1F2F2] text-[#C19A83] px-6 py-10 md:px-16 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center sm:items-start md:items-start gap-10">
        
       
        <div className="flex-shrink-0">
          <Image src="/logo.png" alt="logo" height={100} width={140} />
        </div>

       
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-black text-2xl font-bold">LINKS</h1>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/story">STORY</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/contact">CONTACT</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/help">HELP</Link>
        </div>

       
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-black text-2xl font-bold">CATEGORIES</h1>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/shopall">SHOP ALL</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/decor">DECOR</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/office">OFFICE</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/livingroom">LIVING ROOM</Link>
          <Link className="hover:text-[#C19A83] hover:scale-105 transition" href="/bedroom">BEDROOM</Link>
        </div>

        
        <div className="flex flex-col gap-3 w-full md:w-auto items-center">
          <h1 className="text-2xl font-bold text-black">SUBSCRIBE</h1>
          <form action="" className="flex flex-col  items-center  gap-3">
            <input
              type="text"
              placeholder="Your Email Address..."
              className="w-full sm:w-full px-4 py-2 border border-gray-300 rounded placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="w-32 sm:w-32 h-12 bg-black text-white font-medium rounded hover:bg-gray-800 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
