import React from "react";
import Image from "next/image";
import Link from "next/link";
const Resources = () => {
  const resources = [
    {
      heading: "Blog",
      firstText: "Our Systems admin ",
      secondText: "in the west region",
      link:'/blog-page'
    },
    {
      heading: "Help",
      firstText: "Account: How to link your ",
      secondText: "unified BVN ",
      link:'/'
    },
  ];

  return (
    <div className="w-full py-4 mx-auto max-w-6xl px-8 md:px-0">
      <div className="flex justify-between items-center w-full items-center">
        <div className="flex items-center space-x-3">
          <div className="w-16 h-1 bg-gray-200"></div>
          <h4 className="text-sm uppercase">Resources</h4>{" "}
        </div>
      </div>

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-4 sm:mx-8">
        {resources.map((service) => (
          <Link href={service.link} > 
          
            <div className="flex justify-between items-center border rounded-lg p-5 shadow-lg h-auto bg-slate-200 text-white shadow-lg cursor-pointer transition transform hover:-translate-y hover:scale-105 duration-30 ">
              <div className="">
                <div className="flex items-center gap-5">
                  <h6 className="text-sm uppercase text-gray-200">
                    {service.heading}
                  </h6>
                  <div className="w-16 h-1 bg-gray-400"></div>
                </div>

                <p className="font-bold text-lg sm:text-xl">
                  {service.firstText} <br /> {service.secondText}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full text-slate-200 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
