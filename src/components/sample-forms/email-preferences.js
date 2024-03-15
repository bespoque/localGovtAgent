import React, { useState } from "react";
import Validation from "../forms/validation";
import Alert from "../alerts";
import { useForm } from "react-hook-form";

const EmailPreferences = ({ message = null }) => {
  const [data, onSubmit] = useState(null);
  const { register, handleSubmit, errors, watch } = useForm();

  let items = [
    {
      label: "Current email",
      error: { required: "Please enter a valid email" },
      name: "email",
      type: "email",
      placeholder: "Enter you current email address",
    },
    {
      label: "New email",
      error: { required: "Please enter a valid email" },
      name: "email",
      type: "email",
      placeholder: "Enter you new email address",
    },
    {
      label: "Daily updates",
      error: {
        required: "Daily updates is required",
      },
      name: "daily-updates",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      label: "Weekly updates",
      error: {
        required: "Weekly updates is required",
      },
      name: "weekle-updates",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 ">
        <div className="flex space-x-3 items-center">
          <div>
            <h6 className="text-md md:text font-bold mb-2">
              Change Your Password
            </h6>
            <p className="text-gray-500 flex flex-col  text-xs md:flex-row">
              Kindly ensure that all the information provided are accurate
            </p>
          </div>
        </div>

        <button className="-mt-2 bg-teal-600 text-white px-6 py-1 md:px-6 md:py-3 rounded-md font-bold hover:bg-teal-500">
          Save
        </button>
      </div>

      <div className="border rounded-md py-4 px-4">
        <p>Change Email</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
          <div>
            <label className="text-gray-700">Enter Old Email</label>
            <span className="text-emerald-400 align-right">*</span>
            <input
              type="email"
              id="email"
              name="email"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
            />
            {errors.indv_title && (
              <span className="text-emerald-500">Old Email is required</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Enter New Email</label>
            <span className="text-emerald-400 align-right">*</span>

            <input
              type="text"
              id="new_email"
              name="new_email"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
            />
            {errors.firstName && (
              <span className="text-emerald-500">New Email is required</span>
            )}
          </div>
          <button className="-mt-2  w-20 bg-teal-600 text-white px-2 py-1 md:px-2 md:py-3 rounded-md font-bold hover:bg-teal-500">
            Save
          </button>
        </div>
        <hr />

        <div className="mt-4">
          <p>Change Password</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
            <div>
              <label className="text-black-700 ">Enter Old Password</label>
              <span className="text-emerald-400 align-right">*</span>

              <input
                type="text"
                id="surname"
                name="surname"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                // defaultValue={query.lastname}
              />
              {errors.lastName && (
                <span className="text-emerald-500">Last Name is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Enter New Password</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                ref={register}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                // defaultValue={query?.middlename}
              />
            </div>
            <button className="-mt-2  w-20 bg-teal-600 text-white px-2 py-1 md:px-2 md:py-3 rounded-md font-bold hover:bg-teal-500">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPreferences;
