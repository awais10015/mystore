"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CiShoppingCart } from "react-icons/ci";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = ({ bg = "transparent" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from([".Navbar"], {
      y: 0,
      scale: 0.7,
      opacity: 0,
      duration: 0.7,
      // delay: 1,
    });
  }, []);
  return (
    <nav
      className={`Navbar relative top-0 text-sm left-0 w-full z-50 ${
        bg === "white" ? "bg-white" : "bg-transparent"
      } px-6 py-4`}
    >
      <div className="relative flex items-center justify-between">
        <div className="z-10">
          <Link href="/">
            <Image src="/logo.png" height={70} width={100} alt="logo" />
          </Link>
        </div>

        <div className="absolute sm:hidden lg:flex md:hidden left-1/2 transform -translate-x-1/2 hidden  gap-4 text-black font-medium">
          <Link
            className="hover:text-[#C19A83] hover:scale-115"
            href="/shopall"
          >
            SHOP ALL
          </Link>
          <Link className="hover:text-[#C19A83] hover:scale-115" href="/decor">
            DECOR
          </Link>
          <Link className="hover:text-[#C19A83] hover:scale-115" href="/office">
            OFFICE
          </Link>
          <Link
            className="hover:text-[#C19A83] hover:scale-115"
            href="/livingroom"
          >
            LIVING ROOM
          </Link>
          <Link
            className="hover:text-[#C19A83] hover:scale-115"
            href="/bedroom"
          >
            BEDROOM
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-black font-medium z-10">
          <Link className="hover:text-[#C19A83] hover:scale-115" href="/story">
            STORY
          </Link>
          <Link
            className="hover:text-[#C19A83] hover:scale-115"
            href="/contact"
          >
            CONTACT
          </Link>
          <Link className="hover:text-[#C19A83] hover:scale-115" href="/help">
            HELP
          </Link>
          {/* <Link className="hover:text-[#C19A83] hover:scale-115" href="/login">
            LOG IN
          </Link> */}
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/cart">
            <CiShoppingCart className="hover:scale-115 h-8 w-8" />
          </Link>
        </div>

        <div className="lg:hidden z-10">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={28} className="text-black" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-3 items-center text-black bg-white/80 p-4 rounded-lg shadow">
          <Link href="/shopall">SHOP ALL</Link>
          <Link href="/decor">DECOR</Link>
          <Link href="/office">OFFICE</Link>
          <Link href="/livingroom">LIVING ROOM</Link>
          <Link href="/bedroom">BEDROOM</Link>
          <Link href="/story">STORY</Link>
          <Link href="/contact">CONTACT</Link>
          <Link href="/help">HELP</Link>
          {/* <Link href="/login">Log In</Link> */}
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/cart">
            <Image src="/cart.png" height={20} width={20} alt="cart" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
