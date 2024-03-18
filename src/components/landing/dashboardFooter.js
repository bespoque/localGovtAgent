import React from "react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="" aria-labelledby="footer-heading">
      {/* <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-6 pb-8 sm:p-8 lg:px-8 lg:pt-12">
        <div className="mt-2 border-t border-gray-400 text-teal-600 md:font-bold sm:mt-20 md:flex md:items-center md:justify-between">
          <p className="text-xs leading-5 text-gray-400 mt-2">
            &copy; {currentYear} Centrify Platform Technologies. All rights
            reserved.
          </p>
        </div>
      </div> */}
    </footer>
  );
}
