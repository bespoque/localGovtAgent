import CustomButton from "../CustomButton/CustomButton";
import { HazardIcon } from "../Icons";
import { useState, useEffect } from "react";
import { BsSendCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { SubmitButton } from "../CustomButton/CustomButton";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";

export const TokenModalsOverlay = ({ children }) => {
  const { backdrop } = useSelector(
    (state) => ({
      backdrop: state.modal.backdrop,
    }),
    shallowEqual
  );
  return (
    <div
      className={`bg-black bg-opacity-50 absolute inset-0  flex justify-center items-center h-screen  ${
        backdrop ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

export const TokenModals = () => {
  const dispatch = useDispatch();
  const { hidden } = useSelector(
    (state) => ({
      hidden: state.modal.hidden,
    }),
    shallowEqual
  );

  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };

  return (
    <div
      className={`lg:w-2/5 md:w-4/5 w-full mx-3 z-10 bg-gray-200 p-6 md:p-10 border shadow-2xl rounded-xl ${
        hidden && "hidden"
      }`}
    >
      <div className="w-full flex justify-center ">
        <div className="flex flex-col items-center justify-center space-y-4">
          <HazardIcon />
          <h1 className="text-xl font-bold ">Disclaimer</h1>
          <p className="text-justify font-medium  my-4">
            A six(6) digit token will be sent to the phone number and a link to the email used
            in registering . Use that to
            complete the sign up process.
          </p>

          <CustomButton onClick={toggleModal}> OK </CustomButton>
        </div>
      </div>
    </div>
  );
};

export const PopupModals = ({ title, message, onClick }) => {
  return (
    <div
      className={`bg-black  bg-opacity-0 absolute inset-0  flex justify-center items-center`}
    >
      <div
        className={`lg:w-2/5  md:w-4/5 w-4/5 z-10 bg-green-400  p-10 border shadow-2xl rounded-xl `}
      >
        <div className="w-full flex justify-center ">
          <div className="text-center">
            {/* <HazardIcon /> */}
            <h1 className="text-lg font-bold text-white">{title}</h1>
            <p className="text-justify font-medium font-sans my-4">{message}</p>

            <button className="border-2 w-20 bg-white text-green-500 rounded py-2" type="button" onClick={onClick}>
              {" "}
              OK{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SignUpPopupModals = ({ title, message, onClick }) => {
  return (
    <div
      className={`bg-black  bg-opacity-50 absolute inset-0  flex justify-center items-center`}
    >
      <div
        className={`lg:w-3/5  md:w-3/5 w-4/5 z-10 bg-white  p-10 border shadow-2xl rounded-xl `}
      >
        <div className="w-full flex justify-center text-center">
          <div className="text-center">
            {/* <HazardIcon /> */}
            <div className="flex items-center space-x-3 justify-center">
              <div className="h-12 w-12 p-2 bg-teal-100  flex items-center justify-center rounded-full">
                <BsSendCheck className="text-teal-600 text-2xl" />
              </div>{" "}
              <h1 className="text-lg font-bold ">{title}</h1>
            </div>

            <p className="text-justify font-medium font-sans my-4 text-gray-500 text-center">
              {message}
            </p>

            <Link
              href="/"
              type="submit"
              onClick={onClick}
              className="`inline-flex disabled:opacity-50 bg-teal-500 py-2 px-6 rounded-md w-full justify-center text-white border-2 border-teal-600 font-bold hover:text-teal-500 hover:bg-teal-100 hover:border-teal-500"
            >
              OK{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export const SideModal = ({ title, children, onClick }) => {
  return (
    <div
      className={`overflow-none bg-black bg-opacity-10 absolute inset-0 flex justify-end transition-all duration-700 ease-in-out`}
    >
      <div
        className={`h-full w-full md:w-3/5 lg:w-2/5 z-10 bg-white border pr-4 overscroll-contain`}
      >
        <div className="w-11/12 flex justify-between m-8  overscroll-contain">
          <div className=" w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-md md:text-xl font-bold">{title}</p>
              <div onClick={onClick} className="w-auto cursor-pointer">
                <MdClose className="text-3xl" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
