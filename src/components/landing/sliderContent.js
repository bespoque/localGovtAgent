import React from "react";
import LoginForm from "../Form/LoginForm";
const SliderContent = () => {
  return (
    <div className="bg-gray-900 bg-opacity-75 min-h-screen/20">
      <div className="pt-14 md:space-x-4 h-96 block lg:flex flex-row-reverse md:flex-row d:justify-between max-w-6xl mx-auto px-4 lg:px-8">
        <div className="max-w-sm bg-white flex  h-full shadow-xl border-4 my-auto rounded-xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SliderContent;
