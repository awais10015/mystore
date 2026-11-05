"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CiShoppingCart } from "react-icons/ci";
import { useSession } from "next-auth/react";
import UserMenu from "@/components/auth/UserMenu";

const mobileLinkClass =
  "w-full text-center py-1 font-medium hover:text-[#C19A83] transition-colors";

const Navbar = ({ bg = "transparent" }) => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "admin";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useGSAP(() => {
    gsap.from([".Navbar"], {
      y: 0,
      scale: 0.7,
      opacity: 0,
      duration: 0.7,
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setMenuMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMenuShown(true));
      });
      return () => cancelAnimationFrame(frame);
    }
    setMenuShown(false);
    const timer = setTimeout(() => setMenuMounted(false), 300);
    return () => clearTimeout(timer);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const overlayTransition = menuShown
    ? "opacity-100"
    : "opacity-0 pointer-events-none";
  const panelTransition = menuShown
    ? "opacity-100 translate-y-0 scale-100"
    : "opacity-0 -translate-y-2 scale-[0.98]";

  return (
    <>
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

          <div className="absolute transition-all ease-in-out sm:hidden lg:flex md:hidden left-1/2 transform -translate-x-1/2 hidden  gap-4 text-black font-medium">
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/shopall"
            >
              SHOP ALL
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/decor"
            >
              DECOR
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/office"
            >
              OFFICE
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/livingroom"
            >
              LIVING ROOM
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/bedroom"
            >
              BEDROOM
            </Link>
          </div>

          <div className="hidden lg:flex transition-all ease-in-out items-center gap-4 text-black font-medium z-10">
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/story"
            >
              STORY
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/contact"
            >
              CONTACT
            </Link>
            <Link
              className="hover:text-[#C19A83] transition-all ease-in-out hover:scale-115"
              href="/help"
            >
              HELP
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  className="hover:text-blue-600 transition-all ease-in-out hover:scale-115"
                  href="/sign-in"
                >
                  SIGN IN
                </Link>
                <Link href="/sign-up">
                  <button className="bg-black hover:bg-neutral-800 hover:scale-110 transition-all ease-in-out text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            <Link href="/cart">
              <CiShoppingCart className="hover:scale-115 transition-all ease-in-out h-8 w-8" />
            </Link>

            {isAuthenticated && <UserMenu isAdmin={isAdmin} />}
          </div>

          <div className="lg:hidden z-[60]">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X size={28} className="text-black" />
              ) : (
                <Menu size={28} className="text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {menuMounted && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-out ${overlayTransition}`}
            onClick={closeMobileMenu}
          />
          <div
            className={`fixed left-4 right-4 top-20 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out ${panelTransition}`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-3 items-center text-black">
              <Link href="/shopall" className={mobileLinkClass} onClick={closeMobileMenu}>
                SHOP ALL
              </Link>
              <Link href="/decor" className={mobileLinkClass} onClick={closeMobileMenu}>
                DECOR
              </Link>
              <Link href="/office" className={mobileLinkClass} onClick={closeMobileMenu}>
                OFFICE
              </Link>
              <Link href="/livingroom" className={mobileLinkClass} onClick={closeMobileMenu}>
                LIVING ROOM
              </Link>
              <Link href="/bedroom" className={mobileLinkClass} onClick={closeMobileMenu}>
                BEDROOM
              </Link>
              <Link href="/story" className={mobileLinkClass} onClick={closeMobileMenu}>
                STORY
              </Link>
              <Link href="/contact" className={mobileLinkClass} onClick={closeMobileMenu}>
                CONTACT
              </Link>
              <Link href="/help" className={mobileLinkClass} onClick={closeMobileMenu}>
                HELP
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link href="/sign-in" className={mobileLinkClass} onClick={closeMobileMenu}>
                    SIGN IN
                  </Link>
                  <Link href="/sign-up" onClick={closeMobileMenu}>
                    <button className="bg-black hover:bg-neutral-800 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </>
              ) : (
                <UserMenu
                  isAdmin={isAdmin}
                  variant="stacked"
                  onAction={closeMobileMenu}
                />
              )}
              <Link href="/cart" onClick={closeMobileMenu}>
                <Image src="/cart.png" height={20} width={20} alt="cart" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
