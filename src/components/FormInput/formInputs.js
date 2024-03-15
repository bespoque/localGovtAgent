import React, { useState } from "react";
import { PasswordHideIcon, PasswordShowIcon } from "../Icons";

const Input = React.forwardRef((props, ref) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [inputType, setInputType] = useState(props.type || "password");
  const [inputType, setInputType] = useState(props.type || "password");

  const typeHandler = () => {
    if (showPassword) {
      setShowPassword(false);
      setInputType("password");
    } else {
      setShowPassword(true);
      setInputType("text");
    }
  };
  return (
    <>
      {/* <div className="mt-4">
        <div className="form relative flex">
          <input
            className=""
            type={inputType}
            name={props.name}
            {...props}
            ref={ref}
          />

          {props.label && (
            <label className="">
              <span className="">{props.label}</span>
            </label>
          )}
          {props.usePasswordIcon && (
            <div className="absolute">
              <button
                type="button"
                className="relative top-9 btn-abs cursor-pointer"
                onClick={typeHandler}
              >
                {showPassword ? <PasswordShowIcon /> : <PasswordHideIcon />}
              </button>
            </div>
          )}
        </div>
      </div> */}

      <div className="w-full">
        <div className=" relative mb-4">
          {props.label ? (
            <label
              htmlFor={props.name}
              className={`absolute block my-2.5 mx-3 text-2xl font-medium text-gray-300 dark:text-white ${
                props.bordercolor ? props.bordercolor : `border-black`
              } `}
            >
              <span className="font-bold text-gray-600">{props.label}</span>
            </label>
          ) : null}

          {props.usePasswordIcon && (
            <div className="absolute">
              <button
                type="button"
                // className="relative btn-abs cursor-pointer mt-3 left-1 ml-64 md:ml-96 md:ml-96 text-md"
                // className="relative text-sm btn-abs cursor-pointer mt-3 left-64 md:left-96 lg:left-88"
                className="relative w-5 h-5 mt-3 btn-abs cursor-pointer lg:left-64"
                onClick={typeHandler}
              >
                {showPassword ? <PasswordShowIcon /> : <PasswordHideIcon />}
              </button>
            </div>
          )}

          <input
            ref={ref}
            name={props.name}
            {...props}
            type={inputType}
            id={props.id}
            className={`pl-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 ${props.className}`}
            placeholder={props.placeholder}
            required
          />
        </div>
      </div>

      <style jsx>{`
        .form {
          width: 100%;
          height: 70px;
          overflow: hidden;
        }
        .btn-abs {
          right: -22.5rem;
        }
        .form input {
          width: 100%;
          height: 100%;
          color: #595f6e;
          padding-top: 30px;
          border: none;
          outline: none;
          background: none;
        }
        .form label {
          position: absolute;
          bottom: 0px;
          left: 0%;
          width: 100%;
          height: 100%;
          pointer-events: none;
          border-bottom: 1px solid black;
        }
        .form label::after {
          content: "";
          position: absolute;
          left: 0px;
          bottom: -1px;
          height: 100%;
          width: 100%;
          border-bottom: 2px solid #5fa8d3;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .form input:focus + .label-name .content-name,
        .form input:valid + .label-name .content-name {
          transform: translateY(-60%);
          font-size: 14px;
          color: #5fa8d3;
        }

        .form input:focus + .label-name::after,
        .form input:valid + .label-name::after {
          transform: translateX(0%);
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
});
export default Input;

export const NewFormInput = React.forwardRef((props, ref) => {
  const [readOnly, setReadOnly] = useState(false);
  return (
    <>
      {/* <div className="w-full">
        <div className="form">
          <input
            ref={ref}
            name={props.name}
            {...props}
            readOnly={readOnly}
            className={props.className}
          />
          {props.label ? (
            <label
              className={`label-name  border-b ${
                props.bordercolor ? props.bordercolor : `border-black`
              } `}
            >
              <span className="content-name">{props.label}</span>
            </label>
          ) : null}
        </div>
      </div> */}

      <div className="w-full">
        <div className="mb-6">
          {props.label ? (
            <label
              htmlFor={props.name}
              className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
                props.bordercolor ? props.bordercolor : `border-black`
              } `}
            >
              <span className="font-bold text-gray-600">{props.label}</span>
            </label>
          ) : null}

          <input
            ref={ref}
            name={props.name}
            {...props}
            readOnly={readOnly}
            type={props.type}
            id={props.id}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 ${props.className}`}
            placeholder={props.placeholder}
            required
          />
        </div>
      </div>

      <style jsx>{`
        .form {
          width: 100%;
          position: relative;
          height: 50px;
          overflow: hidden;
        }
        .form input {
          width: 100%;
          height: 100%;
          color: black;
          padding-top: 20px;
          border: none;
          outline: none;
        }
        .form label {
          position: absolute;
          bottom: 0px;
          left: 0%;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .form label::after {
          content: "";
          position: absolute;
          left: 0px;
          bottom: -1px;
          height: 100%;
          width: 100%;
          border-bottom: 1px solid #5fa8d3;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .content-name {
          position: absolute;
          bottom: 2px;
          left: 0px;
          transition: all 0.3s ease;
        }
        .form input:focus + .label-name .content-name,
        .form input:valid + .label-name .content-name {
          transform: translateY(-100%);
          font-size: 14px;
          color: #5fa8d3;
        }

        .form input:focus + .label-name::after,
        .form input:valid + .label-name::after {
          transform: translateX(0%);
          transition: transform 0.3s ease;
        }
      `}</style>
    </>
  );
});
