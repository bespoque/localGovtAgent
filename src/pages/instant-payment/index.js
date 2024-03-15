import React from "react";
import InstantPaymentForm from "../../components/Form/InstantPaymentForm";

const InstantPayment = () => {
  return (
    <div className=" w-full">
      <div className="flex justify-center w-full">
        <div className="flex justify-between mx-auto w-[80vw] lg:px-8 md:px-2 ">
          <div className="bg-white shadow-xl flex items-center justify-center md:w-full py-10 md:py-10  rounded-xl">
            <div className="">
              <InstantPaymentForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstantPayment;
