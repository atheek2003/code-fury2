import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
// import { Link as Link } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import LogoVPN from "../../public/assets/logo.png";
import Image from "next/image";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 bg-white transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-0")
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4 lg:py-0">
          <div className="flex items-center">
            <Image src={LogoVPN} width={150} height={150} />
          </div>
          <ul className="hidden lg:flex col-start-4 gap-x-7 col-end-8 text-black items-center">
            <Link
              href="/"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black hover:text-red-500`}
            >
              <span className="hover:text-red-600 cursor-pointer text-base">
                Home
              </span>
            </Link>
            <Link
              href="/broadcast"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black hover:text-red-500 "
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-base">
                Community Bulletin
              </span>
            </Link>
            <Link
              href="/pastdisaster"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "feature"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-base">
                Previous Disasters
              </span>
            </Link>
            <Link
              href="live_maps.html"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "testimoni"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-base">
                LiveMap
              </span>
            </Link>
            <Link
              href="/aichat"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "pricing"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
              
            >

              <span className="hover:text-red-600 cursor-pointer text-base">
                AI Chat
              </span>
            </Link>
            <Link
              href="/helpform"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "testimoni"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-base">
                HelpForm
              </span>
            </Link>
            
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            <Link href="/auth/signin">
              <a className="text-black mx-2 sm:mx-4 capitalize tracking-wide hover:text-red-500 transition-all">
                Sign In
              </a>
            </Link>
            <Link href={"/auth/signup"}>
              <ButtonOutline>
                <Link href={"/auth/signup"}>Sign Up</Link>
              </ButtonOutline>
            </Link>
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav className="fixed lg:hidden py-3 bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
        <div className="bg-white sm:px-3">
          <ul className="flex w-full justify-between items-center text-black">
            <Link
              href="/"
              className={`px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black hover:text-red-500`}
            >
              <span className="hover:text-red-600 cursor-pointer text-sm">
                Home
              </span>
            </Link>
            <Link
              href="/broadcast"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative text-black hover:text-red-500 "
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-sm">
                Community Bulletin
              </span>
            </Link>
            <Link
              href="/pastdisaster"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "feature"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-sm">
                Previous Disasters
              </span>
            </Link>
            <Link
              href="/aichat"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "pricing"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-sm">
                AI Chat
              </span>
            </Link>
            <Link
              href="/helpform"
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "testimoni"
                  ? " text-red-500 animation-active "
                  : " text-black hover:text-red-500 ")
              }
            >
              <span className="hover:text-red-600 cursor-pointer text-sm">
                HelpForm
              </span>
            </Link>
          </ul>
        </div>
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
