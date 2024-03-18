import React from "react";
import LoginForm from "../Form/LoginForm";
const SliderContent = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 min-h-screen/20">
      <div className="pt-14 md:space-x-4  block lg:flex flex-row-reverse md:flex-row d:justify-between max-w-6xl mx-auto px-4 lg:px-8">
        <div className="sm-mb-10">
          <div
            className=" inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div
            className="md:mx-4 md:mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 
          "
          >
            {/* <div className="hidden max-w-lg md:block sm:mb-8 sm:flex sm:justify-center md:justify-start">
              <div className="relative rounded-full px-3 py-1 text-xs md:text-sm text-gray-300 ring-1 ring-white/10 hover:ring-white/20">
                Announcing our Agents recruitment, 2024.{" "}
                <a href="/create-account" className="font-semibold text-white">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Register
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div> */}
            {/* <div className="sm:text-center md:text-left px-4 md:px-0">
              <div className="space-y-3 hidden md:block">
                <p className="text-3xl md:text-5xl font-bold text-white leading-[120px]">
                  {"Agents Registration for"}
                </p>
                <p className="text-3xl md:text-5xl font-bold text-white leading-[120px]">
                  {"Ibeju-Lekki LGA, Lagos State."}
                </p>
              </div>
              <div className="space-y-3 block md:hidden">
                <p className="text-3xl md:text-5xl font-bold text-white leading-[120px] mt-3">
                  Agents Registration for Ibeju-Lekki LGA, Lagos State.
                </p>
              </div>
              <p className="text-[2px] md:text-md mt-6 text-lg leading-7 text-gray-300">
                Official Announcements calling for Agents domiciled in the
                Ibeju-Lekki Local Government Area of Lagos State Nigeria.
                Register by clicking the link below.
              </p>
              <div className="mt-10 flex flex-col md:flex-row sm:items-center sm:justify-center md:items-center md:justify-start gap-6">
                <a
                  href="/create-account"
                  className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 transition transform hover:-translate-y hover:scale-105 duration-30"
                >
                  Register as an Agent
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div> */}
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <div className="max-w-sm bg-white flex  h-full shadow-xl border-4 my-auto rounded-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
