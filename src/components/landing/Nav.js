import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { IbejuLekkiLogoSm, KgirsLogo2 } from "../Images/Images";

const Nav = () => {
  const navs = [
    // {
    //   name: "Home",
    //   link: "/",
    //   target: "_self",
    //   isActive: true,
    // },
    // {
    //   name: "Register ILIRS Number",
    //   link: "/signup",
    //   target: "_self",
    //   isActive: false,
    // },
    // {
    //   name: "Register As Agent",
    //   target: "_self",
    //   link: "/agent-signup",
    //   isActive: false,
    // },
    // {
    //   name: "Platform Status",
    //   target: "_blank",
    //   link: "https://status.abiapay.com",
    //   isActive: false,
    // },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: "Home", href: "#" },
    { name: "FAQs", href: "/faqs" },
    { name: "Register", href: "/agent-signup" },
    { name: "Download Registration Slip", href: "/download-slip" },
  ];

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Africa/Lagos",
      };

      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", options);
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="w-full h-10 bg-emerald-600 font-bold text-xs md:text-sm text-white flex items-center justify-center md:justify-end px-6 py-4 lg:px-8">
        <Image src="/nigeria-icon.png" alt="My Image" width={20} height={30} />
        <p className="mx-2 font-normal ">Kogi, Nigeria:</p>
        {currentTime}
      </div>
      <nav
        className="flex bg-white items-center justify-between px-6 py-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <a href="/">
              <div className="flex space-x-3 items-center">
                <KgirsLogo2 />
                {/* <IbejuLekkiLogoSm /> */}
                <div className="text-justify leading-2">
                  <p className="uppercase text-emerald-600 text-xl font-bold">
                    Kogi State 
                  </p>
                  <p className="uppercase text-emerald-600 text-sm font-bold -mt-2">
                   Government
                  </p>
                  <p className="uppercase text-xs text-yellow-400 -mt-1">
                    Internal-Revenue Service
                  </p>
                </div>
              </div>
            </a>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12 items-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-600 hover:text-emerald-400"
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="flex gap-4">
            <a
              href="/signup"
              className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 transition transform hover:-translate-y hover:scale-105 duration-30"
            >
              Create Account
            </a>
            <a
              href="/create-account"
              className="rounded-md border-2 border-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-emerald-500 shadow-sm hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 transition transform hover:-translate-y hover:scale-105 duration-30"
            >
              Create KGTIN
            </a>
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                src="/images/landing/ILIRSlogoSingle.png"
                alt="My Image"
                width={50}
                height={30}
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Nav;
