import React, { useEffect, useState } from "react";
import url from "../../config/url";
import axios from "axios";
import Validation from "../forms/validation";
import Alert from "../alerts";
import setAuthToken from "../../functions/setAuthToken";
import Widget from "../widget";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { Routes, Route, useNavigate } from "react-router-dom";

const RetailTransport = ({ message = null }) => {
  const navigate = useNavigate();
  const { register, errors, handleSubmit } = useForm();
  const [data, setData] = useState(null);
  const [details, setDetails] = useState("");
  const [state, setState] = useState({
    amount: null,
    payment_ref: null,
    message: null,
    showEnumeration: true,
    showEnumerationDetails: false,
    openPaymentModal: false,
    loading: false,
    user: {
      taxpayer_name: null,
      lga: null,
      location: "",
      revenue_year: null,
      vehicle_category: null,
      vehicle_plate_number: null,
    },
  });

  setAuthToken();

  // const fetchInfo = async () => {
  //   try {
  //     const result = await axios.get(`${url.BASE_URL}user/view-user`);
  //     let userDet = result.data.body.taxpayerDetails;
  //     setDetails(userDet);

  //     console.log(details);
  //     // console.log(userDet);
  //   } catch (error) {

  //   }
  // };

  const postRetailTransport = async (data) => {
    try {
      const response = await axios.post(
        `${url.BASE_URL}enumeration/retail-single-transport`,
        data
      );
      console.log(response, "RESPONSE");
      console.log(data, "FORM DATA");

      setState((prev) => {
        return {
          ...prev,
          loading: true,
          message: response?.data?.message,
          amount: response?.data?.amount,
          payment_ref: response?.data?.payment_ref,
          showEnumeration: false,
          showEnumerationDetails: true,
          fundingLoading: false,
          user: {
            taxpayer_name: data?.taxpayer_name,
            lga: data?.lga,
            location: data?.location,
            revenue_year: data?.revenue_year,
            vehicle_category: data?.vehicle_category,
            vehicle_plate_number: data?.vehicle_plate_number,
          },
        };
      });
      console.log(state.payment_ref, "PAYMENT REF");
      console.log(state.user.location, "Location");
      toast.success(response?.data?.message);
      navigate("/");
      // setTimeout(() => {
      //   navigate("/")
      // }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message?.vehicle_plate_number
      );
    }
  };

  return (
    <>
      {state.showEnumeration && (
        <form
          onSubmit={handleSubmit(postRetailTransport)}
          className="p-5 bg-white border shadow-xl rounded-xl md:p-8"
        >
          {/* <div className='border rounded-md'> */}
          <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 ">
            <div className="flex space-x-3 items-center">
              <div>
                <h6 className="text-md md:text font-bold mb-2">
                  Retail Transport Enumeration
                </h6>
                <p className="text-gray-500 flex flex-col  text-xs md:flex-row">
                  Kindly ensure that all the information provided are accurate
                </p>
              </div>
            </div>

            <button className="hidden -mt-2 bg-teal-600 shadow text-white px-6 py-1 md:px-6 md:py-3 rounded-md font-bold hover:bg-teal-500 hover:shadow-lg md:flex items-center space-x-2">
              {state.loading && (
                <BiLoaderCircle className="animate-spin mr-2 text-xl" />
              )}
              Start Enumeration
            </button>
          </div>
          <div className="border rounded-md py-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
              <div>
                <label className="text-gray-700">Vehicle Category</label>
                <span className="text-emerald-400 align-right">*</span>
                <select
                  className="bg-gray-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  type="text"
                  name="vehicle_category"
                  ref={register({ required: true })}
                >
                  <option defaultValue></option>
                  <option value="CAR">Car</option>
                  <option value="BUS">Bus</option>
                  <option value="TRUCK">Truck</option>
                  <option value="TRACTOR">Tractor</option>
                </select>
                {errors.indv_title && (
                  <span className="text-emerald-500">Title is required</span>
                )}
              </div>
              <div>
                <label className="text-gray-700">Revenue Year</label>
                <span className="text-emerald-400 align-right">*</span>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  type="text"
                  name="revenue_year"
                  ref={register({ required: true })}
                >
                  <option defaultValue></option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                </select>
              </div>
              <div>
                <label className="text-gray-700">LGA</label>
                <span className="text-emerald-400 align-right">*</span>

                <input
                  type="number"
                  id="lga"
                  name="lga"
                  ref={register({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  // defaultValue={query.firstname}
                />
                {errors.firstName && (
                  <span className="text-emerald-500">LGA is required</span>
                )}
              </div>
              <div>
                <label className="text-gray-700">Vehicle Plate Number</label>
                <span className="text-emerald-400 align-right">*</span>

                <input
                  type="text"
                  id="vehicle_plate_number"
                  name="vehicle_plate_number"
                  ref={register({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  // defaultValue={query.firstname}
                />
                {errors.firstName && (
                  <span className="text-emerald-500">
                    Plate Number is required
                  </span>
                )}
              </div>
              <div>
                <label className="text-gray-700">Taxpayer Name</label>
                <span className="text-emerald-400 align-right">*</span>

                <input
                  type="text"
                  id="taxpayer_name"
                  name="taxpayer_name"
                  // ref={register({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  // defaultValue={query.firstname}
                />
                {errors.firstName && (
                  <span className="text-emerald-500">
                    taxpayer Name is required
                  </span>
                )}
              </div>

              <div>
                <label className="text-gray-700">Location</label>
                <span className="text-emerald-400 align-right">*</span>

                <input
                  type="text"
                  id="location"
                  name="location"
                  // ref={register({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  // defaultValue={query.firstname}
                />
                {errors.firstName && (
                  <span className="text-emerald-500">Location is required</span>
                )}
              </div>
            </div>
          </div>
          <ToastContainer></ToastContainer>
          <button className="block mt-4 w-full bg-teal-500 shadow text-white px-6 py-3 rounded-md font-bold hover:bg-teal-600 hover:shadow-lg md:hidden">
            Start Enumeration
          </button>
        </form>
      )}
      {state.showEnumerationDetails && (
        <section>
          <button
            onClick={() =>
              setState((prev) => {
                return {
                  ...prev,
                  showEnumeration: true,
                  showEnumerationDetails: false,
                  loading: false,
                };
              })
            }
            className="flex text-md items-center font-bold text-teal-700 my-3"
          >
            <BsArrowLeftShort className="text-3xl" />
            <p>Go Back</p>
          </button>
          <div className="p-5 bg-white border shadow-xl rounded-xl md:p-8">
            <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 ">
              <div className="flex space-x-3 items-center">
                <div>
                  <h6 className="text-md md:text font-bold mb-2">
                    Confirm Enumeration Details
                  </h6>
                  <p className="text-gray-500 flex flex-col  text-xs md:flex-row">
                    Kindly ensure that all the information provided are accurate
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setState((prev) => {
                    return {
                      ...prev,
                      openPaymentModal: true,
                    };
                  })
                }
                className="hidden -mt-2 bg-teal-600 shadow text-white px-6 py-1 md:px-6 md:py-3 rounded-md font-bold hover:bg-teal-500 hover:shadow-lg md:block"
              >
                Proceed to checkout
              </button>
            </div>
            <div className="border rounded-md py-4 px-4">
              <div>
                <label className="text-gray-700">Payment Reference</label>
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-xl">{state?.payment_ref} </h3>
                  <LuCopy className="text-xl cursor-pointer" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
                <div>
                  <label className="text-gray-700">Vehicle Category</label>
                  <p className="font-bold text-md">
                    {state?.user?.vehicle_category}
                  </p>
                </div>
                <div>
                  <label className="text-gray-700">Revenue Year</label>
                  <p className="font-bold text-md">
                    {state?.user?.revenue_year}
                  </p>
                </div>
                <div>
                  <label className="text-gray-700">LGA</label>
                  <p className="font-bold text-md">{state?.user?.lga}</p>
                </div>
                <div>
                  <label className="text-gray-700">Vehicle Plate Number</label>
                  <p className="font-bold text-md">
                    {state?.user?.vehicle_plate_number}
                  </p>
                </div>
                {/* <div>
                  <label className="text-gray-700">Taxpayer Name</label>
                  <p className="font-bold text-md">
                    {state?.user?.taxpayer_name}
                  </p>
                </div> */}

                {/* <div>
                  <label className="text-gray-700">Location</label>
                  <p className="font-bold text-md">{state?.user?.location}</p>
                </div> */}
              </div>
            </div>
            <button
              onClick={() =>
                setState((prev) => {
                  return {
                    ...prev,
                    openPaymentModal: true,
                  };
                })
              }
              className="block mt-4 w-full bg-teal-500 shadow text-white px-6 py-3 rounded-md font-bold hover:bg-teal-600 hover:shadow-lg md:hidden"
            >
              Proceed to checkout
            </button>
          </div>

          {state.openPaymentModal && (
            <>
              <div className="modal-backdrop fade-in"></div>
              <div className="modal show w-full ">
                <div className="rounded-2xl">
                  <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                    <div className="relative p-8">
                      <div className="flex items-center justify-between space-x-4">
                        <h1 className="text-xl mb-2 font-bold w-56 md:w-80">
                          Confirm Payment
                        </h1>
                        <div className="flex justify-between items-center pl-8">
                          <button
                            onClick={() =>
                              setState((prev) => {
                                return {
                                  ...prev,
                                  openPaymentModal: false,
                                };
                              })
                            }
                          >
                            <MdClose className="w-6 h-6" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-4 border-2 rounded-xl w-full mt-16 shadow-md p-6">
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Payment Reference</p>
                          <p className="font-bold">{state?.payment_ref}</p>
                        </div>
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Enumeration Type</p>
                          <p className="font-bold">Retail Transport</p>
                        </div>
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Amount</p>
                          <p className="font-bold">NGN 1500</p>
                        </div>
                        <div className="flex w-full justify-between ">
                          <p className="text-gray-400">Vehicle Plate Number</p>
                          <p className="font-bold">
                            {state?.user?.vehicle_plate_number}
                          </p>
                        </div>
                      </div>

                      {state.fundingLoading ? (
                        <div
                          onClick={() =>
                            setState((prev) => {
                              return {
                                ...prev,
                                openPaymentModal: false,
                              };
                            })
                          }
                          className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-600 text-white font-bold hover:bg-teal-400"
                        >
                          Checking
                          <ImSpinner className="w-5 h-5 ml-2 animate-spin" />
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            setState((prev) => {
                              return {
                                ...prev,
                                openPaymentModal: false,
                              };
                            })
                          }
                          className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-600 text-white font-bold hover:bg-teal-400"
                        >
                          Transferred
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default RetailTransport;
