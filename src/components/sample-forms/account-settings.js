import React, { useEffect, useState } from "react";
import url from "../../config/url";
import axios from "axios";
import Validation from "../forms/validation";
import Alert from "../alerts";
import setAuthToken from "../../functions/setAuthToken";
import Widget from "../widget";
import { useForm } from "react-hook-form";
import { fetchLga } from "../../services/general";

const AccountSettings = ({ message = null }) => {
  const { register, handleSubmit, errors, watch } = useForm();

  const [data, onSubmit] = useState(null);
  const [details, setDetails] = useState("");
  setAuthToken();
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const result = await axios.get(`${url.BASE_URL}user/view-user`);
        let userDet = result.data.body.taxpayerDetails;
        setDetails(userDet);
        const lga = await fetchLga();

        // console.log(userDet);
      } catch (error) {}
    };
    fetchInfo();
  }, []);

  let items = [
    {
      label: "ILIDNumber",
      error: { required: "Please enter a valid first name" },
      name: "first-name",
      type: "text",
      placeholder: `${details.KGTIN}`,
    },
    {
      label: "Taxpayer Name",
      error: { required: "Please enter a valid last name" },
      name: "last-name",
      type: "text",
      placeholder: `${details.tp_name}`,
    },
    {
      label: "TaxPayer Type",
      error: { required: "Please enter a valid last name" },
      name: "last-name",
      type: "text",
      placeholder: `${details.tp_type}`,
    },
    {
      label: "Email address",
      error: { required: "Please enter a valid email address" },
      name: "email",
      type: "email",
      placeholder: `${details.email}`,
    },
    {
      label: "Phone number",
      error: { required: "Please enter a valid company" },
      name: "company",
      type: "text",
      placeholder: `${details.phone_number}`,
    },
    {
      label: "Tax office",
      error: { required: "Please enter a valid position" },
      name: "position",
      type: "text",
      placeholder: `${details.tax_office}`,
    },
    // {
    //   label: 'Language',
    //   error: {
    //     required: 'Language is required',
    //     validate: value =>
    //       ['english', 'spanish', 'portuguese'].includes(value) ||
    //       'Language is required'
    //   },
    //   name: 'language',
    //   type: 'select',
    //   options: [
    //     {value: null, label: 'Select language'},
    //     {value: 'english', label: 'English'},
    //     {value: 'spanish', label: 'Spanish'},
    //     {value: 'portuguese', label: 'Portuguese'}
    //   ]
    // }
  ];
  return (
    <>
      {/* <div className='border rounded-md'> */}
      <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 ">
        <div className="flex space-x-3 items-center">
          <div>
            <h6 className="text-md md:text font-bold mb-2">Personal Details</h6>
            <p className="text-gray-500 flex flex-col  text-xs md:flex-row">
              Kindly ensure that all the information provided are accurate
            </p>
          </div>
        </div>

        <button className="-mt-2 bg-teal-600 text-white px-6 py-1 md:px-6 md:py-3 rounded-md font-bold hover:bg-teal-500">
          Save
        </button>
      </div>
      {data && message && (
        <div className="w-full mb-4">
          <Alert
            color="bg-transparent border-green-500 text-green-500"
            borderLeft
            raised
          >
            {message}
          </Alert>
        </div>
      )}
      <div className="border rounded-md py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
          <div>
            <label className="text-gray-700">Title</label>
            <span className="text-emerald-400 align-right">*</span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              type="text"
              name="indv_title"
              ref={register({ required: true })}
            >
              <option selected></option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Mrss">Miss</option>
            </select>
            {errors.indv_title && (
              <span className="text-emerald-500">Title is required</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">First Name</label>
            <span className="text-emerald-400 align-right">*</span>

            <input
              type="text"
              id="first_name"
              name="first_name"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              // defaultValue={query.firstname}
            />
            {errors.firstName && (
              <span className="text-emerald-500">First Name is required</span>
            )}
          </div>
          <div>
            <label className="text-gray-700">Last Name</label>
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
            <label className="text-gray-700">Middle Name</label>
            <input
              type="text"
              id="middle_name"
              name="middle_name"
              ref={register}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              // defaultValue={query?.middlename}
            />
          </div>

          <div>
            <label className="text-gray-700">Gender</label>
            <span className="text-emerald-400 align-right">*</span>

            <select
              id="gender"
              name="gender"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              // defaultValue={query?.gender}
            >
              {/* <option value={query?.gender}>{query?.gender}</option> */}
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="text-emerald-500">Gender is required</span>
            )}
          </div>
          <div>
            <label htmlFor="birth_date" className="text-gray-700">
              Date of Birth
            </label>
            <span className="text-emerald-400 align-right">*</span>

            <input
              type="date"
              id="birth_date"
              name="birth_date"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              // value={convertedDate}
            />
            {/* {errormsg?.birth_date && (
                <span className="text-emerald-500">{errormsg.birth_date}</span>
              )} */}
          </div>

          <div>
            <label className="text-gray-700">ILIDNumber</label>
            <input
              id="occupation"
              name="occupation"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
            />

            {errors?.occupation && (
              <span className="text-emerald-500">Occupation is required</span>
            )}
          </div>
          <div>
            <label htmlFor="firstName" className="text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={register({ required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              // value={query?.email}
            />
            {/* {errormsg?.email && (
                <span className="text-emerald-500">{errormsg.email}</span>
              )} */}
          </div>
        </div>

        <hr />

        <div>
          <p>Residential Address</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
            <div>
              <label>Address Line 1</label>
              <input
                type="address"
                id="address"
                placeholder="Enter Address Line 1"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>Address Line 2</label>
              <input
                type="address"
                id="address"
                placeholder="Enter Address Line 2"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="address"
                id="address"
                placeholder="Enter Address Line 1"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>Postal Code</label>
              <input
                type="number"
                id="address"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>LGA</label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address Line 1"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>State</label>
              <input
                type="text "
                id="address"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="mt-2">
          <p>Employment Status</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
            <div>
              <label>Select Status</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                type="text"
                name="indv_title"
                ref={register({ required: true })}
              >
                <option selected></option>
                <option value="Umemployed">Umemployed</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
              </select>
            </div>
            <div>
              <label>Income Range(Monthly)</label>
              <input
                type="text "
                id="address"
                name="address"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>Occupation</label>
              <input
                type="text"
                id="occupation"
                placeholder="occupation"
                name="occupation"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
            <div>
              <label>Company Name</label>
              <input
                type="text "
                id="companyName"
                placeholder="Enter Company Name"
                name="companyName"
                ref={register({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
          </div>
        </div>
      </div>

      {/* <Validation items={items} onSubmit={onSubmit} />
       */}

      {/* </div> */}
    </>
  );
};

export default AccountSettings;
