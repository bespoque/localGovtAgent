import React from "react";
import { LuHome } from "react-icons/lu";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="" aria-labelledby="footer-heading">
      {/* <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 pb-8 sm:p-8 lg:px-8 lg:pt-12">
        <div className="mt-5 border-t border-gray-400 md:border-t md:border-gray-400 text-emerald-600 md:font-bold pt-8 sm:mt-10 md:flex md:items-center md:justify-between">
          <div className="flex space-x-1 md:space-x-3">
            <Link href="/" className="flex space-x-2 cursor-pointer">
              <span>Go Home</span>{" "}
            </Link>
            <div> &sdot;</div>
            <Link href="/termsandconditions">Terms of Use</Link>
            <div> &sdot;</div>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
          <p className="mt-2 text-xs leading-5 text-gray-400 md:text-gray-500 md:order-1 md:mt-0">
            &copy; {currentYear} Centrify Platform Technologies. All rights
            reserved.
          </p>
        </div>
      </div> */}
    </footer>
  );
}
