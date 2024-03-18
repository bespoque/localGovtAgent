import React from "react";
import { HiOutlineCash } from "react-icons/hi";
import {
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import {
  HiOutlineUserAdd,
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
} from "react-icons/hi";
const Services = () => {
  const quickLinks = [
    {
      imgSrc: "/images/landing/coins.svg",
      icon: <HiOutlineUserAdd className="text-4xl text-emerald-500" />,
      heading: "Create Personal ILID",
      firstText: "Pay demand notices",
      secondText: "and income tax in one place",
      link: "/create-account",
    },
    {
      imgSrc: "/images/landing/coins.svg",
      icon: <HiOutlineShoppingCart className="text-4xl text-emerald-500" />,
      heading: "Create Business ILID",
      firstText: "Pay demand notices",
      secondText: "and income tax in one place",
      link: "/nonindividual-signup",
    },
    {
      imgSrc: "/images/landing/book.svg",
      icon: <HiOutlineCash className="text-4xl text-emerald-500" />,
      heading: "Make Instant Payment",
      firstText: "Seamless make payment for utilities,",
      secondText: "on you phone",
      link: "/instant-payment",
    },
    {
      imgSrc: "/images/landing/coins.svg",
      icon: <HiOutlineUserCircle className="text-4xl text-emerald-500" />,
      heading: "Register as an Agent",
      firstText: "Verify ILID and seamlessly",
      secondText: "make payment for utilities",
      link: "/agent-signup",
    },
  ];

  return (
    <div className="w-full pt-16 mx-auto max-w-6xl px-8 md:px-0">
      <h4 className="font-bold text-center my-8 md:mx-16">
        Access Government Quick links and benefits
      </h4>
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:mx-8">
        {quickLinks.map((quickLink) => (
          <div className="flex flex-col items-center justify-between rounded-xl p-4 text-center shadow-lg cursor-pointer hover:shadow-xl hover:border-4 h-auto ">
            <div className="my-4">{quickLink.icon}</div>

            <div className="mt-4">
              <h6 className="font-bold text-gray-500">{quickLink.heading}</h6>
              <p className="text-gray-400 text-[10px]">
                {quickLink.firstText} {quickLink.secondText}
              </p>
            </div>

            <a
              href={quickLink.link}
              className="mt-4 w-full flex items-center justify-center space-x-3 text-white py-3 rounded focus:outline-none text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-400 rounded-lg text-sm"
            >
              <sapn className="text-[14px] font-bold ">Proceed</sapn>
              <MdOutlineArrowForwardIos />
            </a>
          </div>
        ))}
      </div>
      {/* <div className="about flex flex-col items-center justify-center h-64 rounded-xl mt-16 sm:mx-8">
        <h5 className="font-bold text-white text-center text-xl md:text-3xl">
          Access Government Quick links and benefits
        </h5>
        <div className="text-white items-center justify-center pt-8 space-y-4 md:space-y-0 md:space-x-4 md:flex">
          <a
            href="/create-account"
            className="flex justify-center w-48 px-5 py-3 rounded-sm bg-emerald-600 font-bold text-xs hover:bg-emerald-700 "
          >
            Get Started
          </a>
          <a href="/privacy-policy" className="flex justify-center w-48 px-5 py-3 rounded-sm bg-white text-emerald-600 font-bold text-xs hover:bg-gray-200">
            Learn About Our Policy
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Services;
