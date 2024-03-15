import React, { useState, useRef, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { IoMdAdd } from "react-icons/io";
import Header from "../../components/shared/Header";
import { SideModal } from "../../components/modals/Modal";
import { BsCloudUpload, BsInfoCircle, BsDownload } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SubmitButton } from "../../components/CustomButton/CustomButton";
import { useFormik } from "formik";
import { vehicleData } from "./components/vehicleData.mjs";
import { exportCSV } from "../../Helpers/exportCSV";
import * as Yup from "yup";
import TransportEnumerationComponent from "../../components/transport-enumeration";
import url from "../../config/url";
import axios from "axios";
import { Line } from "rc-progress";
import setAuthToken from "../../functions/setAuthToken";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LuCopy } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import {
  fetchLga,
  fetchUnions,
  fetchVehicles,
  fetchParks,
} from "../../services/general";
import Loader from "react-loader-spinner";

import StatsCard from "./components/statsCard";

const TransportEnumeration = () => {
  const { register, errors, handleSubmit, formState } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const isP = formState.isValid;

  const [data, setData] = useState(null);
  const [details, setDetails] = useState("");
  const fileInputRef = useRef(null);
  const [openAddBulk, setOpenAddBulk] = useState(false);
  const [lga, setLga] = useState([]);
  const [paymentChannel, setPaymentChannel] = useState(null);
  const [channel, setChannel] = useState([
    // { key: "Credo", value: "Credo" },
    // { key: "Bank", value: "Bank" },
    { key: "Interswitch Webpay", value: "Interswitch Webpay" },
    { key: "Wallet", value: "Wallet" },
  ]);
  // const [openAddSingle, setOpenAddSingle] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [parks, setParks] = useState([]);
  const [unions, setUnions] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [state, setState] = useState({
    welcomeModal: false,
    isHovering: false,
    isUploading: false,
    dragging: false,
    fileName: "",
    amount: null,
    payment_ref: null,
    message: null,
    showEnumeration: true,
    showEnumerationDetails: false,
    openPaymentModal: false,
    openAddSingle: false,
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
  const [years, setYears] = useState([]);

  setAuthToken();

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const pastYear = 1988;
    const yearRange = Array.from(
      { length: currentYear - pastYear + 1 },
      (_, index) => currentYear - index
    );

    setYears(yearRange);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://newwebpay.interswitchng.com/inline-checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchLga();
        const vehicle = await fetchVehicles();
        const parks = await fetchParks();
        const unions = await fetchUnions();
        setLga(result);
        setVehicleDetails(vehicle);
        setParks(parks);
        setUnions(unions);
      } catch (error) {}
    };

    fetchDataAsync();
  }, []);

  const handleMouseOver = () => {
    setState((prev) => {
      return {
        ...prev,
        isHovering: true,
      };
    });
  };

  const handleMouseOut = () => {
    setState((prev) => {
      return {
        ...prev,
        isHovering: false,
      };
    });
  };

  const validTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
  ];

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const initialValues = {
    file: "",
  };

  const submitBulk = async (idVal) => {
    console.log("value", idVal);
    if (!formik.isValid) {
      // Handle form validation errors
      return;
    }

    setState((prev) => ({
      ...prev,
      isUploading: true,
    }));

    const formData = new FormData();
    console.log(formData);
    formData.append("filename", formik.values.file);
    for (const key in idVal) {
      if (idVal.hasOwnProperty(key)) {
        formData.append(key, idVal[key]);
      }
    }

    try {
      const response = await axios.post(
        `${url.BASE_URL}enumeration/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let data = response.data;
      console.log(response.data);

      setState((prev) => ({
        ...prev,
        isUploading: false,
        fileName: "",
        openPaymentModal: true,
        payment_ref: data.payment_ref,
        amount: data.total_amount,
      }));
      setOpenAddBulk(false);

      toast.success(data.message);
    } catch (error) {
      // apiErrorHandler(error);
      toast.error(error.response.data.message);

      setState((prev) => ({
        ...prev,
        isUploading: false,
      }));
    }
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("File cannot be blank")
      .test("fileType", "Unsupported File Format", (value) =>
        value ? validTypes.includes(value.type) : true
      ),
  });

  const formik = useFormik({
    initialValues,
    // onSubmit,
    validationSchema,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer && e.dataTransfer.files;
    const file = files && files[0];
    setFileCount(e.dataTransfer?.files?.length || 0);
    setFileName(file.name);
    if (e.dataTransfer?.files) {
      formik.setFieldValue("file", file);
    }

    setDragging(false);
  };

  const postRetailTransport = async (data) => {
    try {
      const response = await axios.post(
        `${url.BASE_URL}enumeration/retail-single-transport`,
        data
      );

      setState((prev) => {
        return {
          ...prev,
          loading: true,
          message: response?.data?.message,
          amount: response?.data?.total_amount,
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
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message?.vehicle_plate_number
      );
    }
  };

  //Interswitch callback function
  const paymentCallback = async (response) => {
    console.log("response", response);
    response.src = "interswitch";
    if (
      response.resp === "00" ||
      response.resp === "10" ||
      response.resp === "11"
    ) {
      const updatePayment = await axios.post(
        `${url.BASE_URL}enumeration/interswitch/update-payment`,
        response,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (updatePayment.data.status) {
        window.location.replace(
          `/enumeration-receipt/${updatePayment.data.payment_ref}`
        );
      }
    } else {
      // setLoading(false);
      // setLoadingState("Payment Generated");
      // window.location = `/receipt/${paymentRef}`
    }
  };

  const updateRefHandler = async (payload) => {
    setSubmitting(true);

    try {
      if (paymentChannel == "Interswitch Webpay") {
        // setPaymentRef(payload.payment_details.payment_reference)
        let samplePaymentRequest = {
          merchant_code: "MX79048",
          pay_item_id: "Default_Payable_MX79048",
          txn_ref: payload.payment_ref,
          amount: Number(payload.amount) * 100,
          currency: 566, // ISO 4217 numeric code of the currency used
          onComplete: paymentCallback,
          site_redirect_url: "http://localhost:3000/complete",
          mode: "TEST",
        };

        window.webpayCheckout(samplePaymentRequest);
        setSubmitting(false);
      }

      if (paymentChannel === "Wallet") {
        // setLoading(false)
        const body = {
          amount: payload.amount,
          payment_ref: payload.payment_ref,
        };

        const bodyJSON = JSON.stringify(body);
        try {
          setAuthToken();

          const response = await axios.post(
            `${url.BASE_URL}enumeration/wallet-payment`,
            bodyJSON,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setSubmitting(false);
          console.log(response.data.message);
          toast.success(response.data.message);

          window.location = `/enumeration-receipt/${payload.payment_ref}`;
          // hide()
          // setLoading(false);
          // setLoadingState("Payment Generated");
          // setIsLoading(true)
        } catch (error) {
          //   setWalletError(error.response.data.message.amount)
          // toast.error(walletError, {position: toast.POSITION.TOP_CENTER})
        }
      }
      // setLoading(true)
      // const result = await axios.put(
      //   `${url.BASE_URL}user/update-payment-channel`,

      //   {
      //     payment_ref: payload.payment_ref,
      //     channel: paymentChannel
      //   }
      // );

      //   if (result.data.status) {
      //     setLoading(false)
      //     if (paymentChannel == 'Credo') {
      //       let paymentData = {
      //         amount: Number(payload.payment_details.amount) * 100,
      //         currency: "NGN",
      //         reference: payload.payment_details.payment_reference,
      //         callbackUrl: `${url.URL}/payment-complete`,
      //         email: payload.payer_details.taxpayer_email
      //       }
      //       const rst = await axios.post(`${url.CREDO_URL}/transaction/initialize`, paymentData, {
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Authorization': url.CREDO_KEY
      //         }
      //       })

      //       if (rst.data.status == 200) {
      //         window.location.replace(rst.data.data.authorizationUrl)
      //       }
      //     }

      // if (paymentChannel == 'Interswitch Webpay') {
      //   setPaymentRef(payload.payment_details.payment_reference)
      //   let samplePaymentRequest = {
      //     merchant_code: "MX79048",
      //       pay_item_id: 'Default_Payable_MX79048',
      //     txn_ref: paymentRef,
      //     amount: Number(payload.payment_details.amount) * 100,
      //     currency: 566, // ISO 4217 numeric code of the currency used
      //     onComplete: paymentCallback,
      //     site_redirect_url: 'http://localhost:3000/complete',
      //     mode: 'TEST'
      //   };

      //   window.webpayCheckout(samplePaymentRequest);
      // }

      //     if (paymentChannel == 'Bank' || paymentChannel == 'USSD') {
      //       hide()
      //       setLoading(false);
      //       setLoadingState("Payment Generated");
      //       setStatus('Processing')

      //       // window.location = `/pending-payment/${payload.payment_details.payment_reference}`
      //     }

      //     if (paymentChannel === 'Wallet') {
      //       setLoading(false)
      //       const body = {
      //         amount:Number(payload.payment_details.amount),
      //         payment_ref:payload.payment_details.payment_reference
      //       }
      //       try {
      //       const response = await axios.post(`${url.BASE_URL}wallet/make-payment`,body)
      //       window.location = `/receipt/${response.data.payment_ref}`;
      //       hide()
      //       setLoading(false);
      //       setLoadingState("Payment Generated");
      //       setIsLoading(true)

      //       } catch (error) {
      //         setWalletError(error.response.data.message.amount)
      //       toast.error(walletError, {position: toast.POSITION.TOP_CENTER})
      //       }

      //     }

      //   }
    } catch (error) {
      // if (error.response) setUpdateRefErrMessage(error.response.data.message);
      // setTimeout(() => {
      //   setUpdateRefErrMessage("");
      // }, 6000);
      // setUpdateRef(false);
    }
  };

  // const submitBulk = async (idVal) => {
  //   console.log('idval',idVal)
  // }

  return (
    <>
      <div className="flex flex-col space-y-8">
        {state.welcomeModal && (
          <Header
            title="Vehicle Enumeration "
            text="Vehicle enumeration refers to the systematic process of listing and categorizing different modes of transportation available for specific purposes, such as logistics, travel, or cargo movement. This enumeration provides a comprehensive view of available options, facilitating informed decision-making, route planning, and resource allocation to ensure efficient and cost-effective transportation solutions."
            onClick={() =>
              setState((prev) => {
                return {
                  ...prev,
                  welcomeModal: false,
                };
              })
            }
          />
        )}

        <section className="">
          <div className="">
            <SectionTitle
              title="Vehicle Enumeration"
              subtitle="Enumerate your Vehicles"
            />
          </div>

          <div className="block md:hidden mt-8">
            <StatsCard />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col md:space-x-3 md:items-center md:pt-4 md:flex-row">
              {/* <p className="font-bold hidden md:block">Filter by:</p>{" "}
              <div className="mt-3 flex space-x-3 md:mt-0">
                <select
                  id="default"
                  className="bg-gray-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-48 p-2.5"
                >
                  <option defaultValue>Filter by:</option>
                  <option value="US">Vehicle Number</option>
                  <option value="CA">Vehicle Name</option>
                  <option value="FR">Amount</option>
                  <option value="DE">Status</option>
                </select>
              </div> */}
            </div>
            <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              <button className="relative flex justify-between items-center mt-3 space-x-3 bg-teal-600 text-white px-5 py-3 md:px-8 md:py-4 rounded font-bold hover:bg-teal-500">
                <IoMdAdd className="w-4 h-4" />
                <span className="hidden md:flex">Add Vehicles</span>
                <span className="flex md:hidden">Add</span>
              </button>

              {state.isHovering && (
                <>
                  <ul className="hidden md:block absolute w-40 border bg-white cursor-pointer shadow-lg">
                    <li
                      onClick={() => {
                        setState((prev) => {
                          return {
                            ...prev,
                            openAddSingle: true,
                          };
                        });
                      }}
                      className="border p-3 hover:bg-gray-100"
                    >
                      Single Enumeration
                    </li>
                    <li
                      onClick={() => setOpenAddBulk(true)}
                      className="border p-3 hover:bg-gray-100"
                    >
                      Bulk Enumeration
                    </li>
                  </ul>
                  <ul className="md:hidden block absolute w-20 border bg-white cursor-pointer shadow-lg">
                    <li
                      onClick={() => {
                        setState((prev) => {
                          return {
                            ...prev,
                            openAddSingle: true,
                          };
                        });
                      }}
                      className="border p-3 hover:bg-gray-100"
                    >
                      Single
                    </li>
                    <li
                      onClick={() => setOpenAddBulk(true)}
                      className="border p-3 hover:bg-gray-100"
                    >
                      Bulk
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:block mt-8">
            <StatsCard />
          </div>
        </section>

        <TransportEnumerationComponent />
      </div>{" "}
      {openAddBulk && (
        <SideModal
          title="Upload Bulk Vehicles"
          onClick={() => setOpenAddBulk(false)}
        >
          <div className="mt-8 space-y-4 -ml-4 md:ml-0 ">
            <div className="space-y-4">
              <div className="flex items-center bg-yellow-50 text-yellow-500  border-2 border-yellow-50 rounded-lg text-xs w-full space-x-3 p-3">
                <BsInfoCircle className="text-5xl" />
                <p>
                  Ensure the file is a .xls, .xlsx or .csv file and it follows
                  the same pattern as the sample. Download Sample if you are not
                  sure
                </p>
              </div>

              <button
                onClick={() => exportCSV(vehicleData, "bulk-vehicle-data.csv")}
                disabled={!vehicleData}
                type="button"
                className="flex items-center justify-center text-teal-500 border-teal-400 border rounded-lg font-bold text-sm w-full space-x-3 py-3 hover:bg-teal-50"
              >
                <BsDownload className="text-2xl" />
                <p>Download Sample File</p>
              </button>
            </div>
            <form onSubmit={handleSubmit2(submitBulk)}>
              <div className="grid grid-cols-1 gap-4 mb-8">
                <h2 className="text-md pb-2 border-b uppercase my-4 font-bold bg-gray-50">
                  Vehicle details
                </h2>
                <div>
                  <label className="text-gray-700">Vehicle Category</label>
                  <span className="text-emerald-400 align-right">*</span>
                  <select
                    className="bg-gray-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    type="text"
                    name="vehicle_category"
                    ref={register2({ required: true })}
                  >
                    <option defaultvalue></option>

                    {vehicleDetails.map((item) => (
                      <option key={item.productName} value={item.productName}>
                        {item.productName}
                      </option>
                    ))}
                  </select>
                  {errors.indv_title && (
                    <span className="text-emerald-500">
                      Vehicle is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-gray-700">Revenue Year</label>
                  <span className="text-emerald-400 align-right">*</span>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    type="text"
                    name="revenue_year"
                    ref={register2({ required: true })}
                  >
                    <option defaultValue=""></option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-700">LGA</label>
                  <span className="text-emerald-400 align-right">*</span>

                  <select
                    id="lga"
                    name="lga"
                    ref={register2({ required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  >
                    <option selected></option>
                    {lga.map((item) => (
                      <option key={item.lgaID} value={item.lgaID}>
                        {item.lgaName}
                      </option>
                    ))}
                  </select>
                  {errors.firstName && (
                    <span className="text-emerald-500">LGA is required</span>
                  )}
                </div>
                <div>
                  <label className="text-gray-700">Parks</label>
                  <span className="text-emerald-400 align-right">*</span>

                  <select
                    type="Number"
                    id="Parks"
                    name="parks"
                    ref={register2({ required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  >
                    <option value="" disabled selected></option>
                    {parks.map((item) => (
                      <option key={item.id} value={parseInt(item.id, 10)}>
                        {item.park}
                      </option>
                    ))}
                  </select>
                  {errors.firstName && (
                    <span className="text-emerald-500">Park is required</span>
                  )}
                </div>
                <div>
                  <label className="text-gray-700">Unions</label>
                  <span className="text-emerald-400 align-right">*</span>

                  <select
                    type="number"
                    id="Unions"
                    name="unions"
                    ref={register2({ required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    // defaultValue={query.firstname}
                  >
                    <option defaultvalue disabled selected></option>
                    {unions.map((item) => (
                      <option key={item.id} value={Number(item.id)}>
                        {item.unionName}
                      </option>
                    ))}
                  </select>
                  {errors.firstName && (
                    <span className="text-emerald-500">Union is required</span>
                  )}
                </div>
                <div>
                  <label className="text-gray-700">Taxpayer Name</label>
                  <span className="text-emerald-400 align-right">*</span>

                  <input
                    type="text"
                    id="taxpayer_name"
                    name="taxpayer_name"
                    ref={register2({ required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                    // defaultValue={query.firstname}
                  />
                  {errors.firstName && (
                    <span className="text-emerald-500">
                      taxpayer Name is required
                    </span>
                  )}
                </div>

                {/* <div>
                      <label className="text-gray-700">Location</label>
                      <span className="text-emerald-400 align-right">*</span>

                      <input
                        type="text"
                        id="location"
                        name="location"
                        ref={register2({ required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                      />
                      {errors.firstName && (
                        <span className="text-emerald-500">
                          Location is required
                        </span>
                      )}
                    </div> */}
              </div>

              <div className="space-y-4">
                <span className="uppercase font-bold text-xs text-gray-500">
                  Upload file
                </span>
                <div className=" mt-[30px] md:mx-[30px]">
                  <div className="flex flex-col !justify-start !items-start w-full">
                    {state.isUploading ? (
                      <div className="cursor-pointer flex flex-col !justify-center !items-center w-full rounded-[8px] bg-[#fff]  !border-dashed border-[2px] border-[#A1A6B1] px-[24px] py-[16px]">
                        <div className="flex justify-center items-center mb-[12px]">
                          {/* <img src={CSV} alt="" /> */}
                        </div>
                        <p className="flex flex-col justify-center items-center gap-y-[5px]">
                          <span className="text-[#14213D] text-[16px] font-medium text-center">
                            {formik.values?.file &&
                              `${Object(formik.values.file)?.name}`}
                          </span>
                          <span className="text-[#434D64] text-[0.875rem] text-center">
                            {`${fileCount} Vehicle details uploading`}
                          </span>
                        </p>
                        <div className="flex  !justify-center  !items-center gap-x-[10px]">
                          <Line
                            percent={50}
                            strokeWidth={1}
                            strokeColor="#03D858"
                            style={{ width: "50%", height: "5px" }}
                          />
                          <span className="text-[#434D64] text-[0.75rem]">
                            {uploadProgress}
                          </span>
                        </div>
                        <div className="!justify-center !items-center mt-[20px]">
                          <MdOutlineDeleteOutline className="text-[#727A8B] text-[20px]" />
                        </div>
                      </div>
                    ) : (
                      <form
                        className="w-full mt-[24px] space-y-4"
                        // onSubmit={formik.handleSubmit}
                      >
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onDragLeave={handleDragLeave}
                          className=" cursor-pointer "
                        >
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                          >
                            <input
                              type="file"
                              id="csvFile"
                              accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                              ref={fileInputRef}
                              className="hidden "
                              onChange={(e) => {
                                if (e.target.files) {
                                  setState((prevState) => ({
                                    ...prevState,
                                    fileName: e.target.files[0]?.name,
                                  }));
                                  formik.setFieldValue(
                                    "file",
                                    e.target.files[0]
                                  );
                                }
                              }}
                              name="file"
                            />
                            <>
                              <div className="flex justify-center items-center mb-[12px]">
                                <BsCloudUpload className="text-4xl" />
                              </div>

                              {state.dragging ? (
                                <p className="text-[#14213D] text-[16px] font-bold text-center">
                                  Drop your Vehicle data file
                                </p>
                              ) : (
                                <>
                                  <p className="flex flex-col justify-center items-center gap-y-[5px] my-3">
                                    <span className="text-[#14213D] text-[14px] md:text-[16px] font-bold text-center">
                                      Drag and Drop to Upload Vehicle data
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      File type should be either .xls, .xlsx or
                                      .csv
                                    </span>
                                  </p>

                                  <button
                                    onClick={handleClick}
                                    type="button"
                                    className="font-semibold text-teal-500 underline"
                                  >
                                    Or click to browse file
                                  </button>

                                  <span className="text-gray-500 font-bold text-[16px] font-medium text-center">
                                    {state.fileName
                                      ? `Selected File name: ${state.fileName}`
                                      : "No file added"}
                                  </span>
                                  {formik.touched.file && formik.errors.file ? (
                                    <p className="error">
                                      {formik.errors.file}
                                    </p>
                                  ) : null}
                                </>
                              )}
                            </>
                          </label>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end mt-4">
                <div
                  onClick={() => setOpenAddBulk(false)}
                  className="border-2 border-teal-500 text-teal-600 px-2 py-2 rounded mr-2 "
                >
                  Cancel
                </div>
                <SubmitButton>Proceed to checkout</SubmitButton>
              </div>
              {/* <SubmitButton>Start Test</SubmitButton> */}
            </form>
          </div>
        </SideModal>
      )}
      {state.openAddSingle && (
        <SideModal
          title="Upload Single Vehicle"
          onClick={() => {
            setState((prev) => {
              return {
                ...prev,
                openAddSingle: false,
              };
            });
          }}
        >
          <>
            {state.showEnumeration && (
              <form
                onSubmit={handleSubmit(postRetailTransport)}
                className="-ml-4 md:ml-0 p-5 bg-white mt-4 md:mt-10 shadow-xl rounded-xl md:p-4"
              >
                <div className="flex mb-4 items-center">
                  <div className="flex items-center bg-yellow-50 text-yellow-500 border-2 border-yellow-50 rounded-lg text-xs w-full space-x-3 p-3">
                    <BsInfoCircle className="text-2xl" />
                    <p className="text-gray-500 flex flex-col  text-xs md:flex-row">
                      Kindly ensure that all the information provided are
                      accurate
                    </p>
                  </div>
                </div>

                <div className="border rounded-md py-4 px-4">
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    <h2 className="text-md pb-2 border-b uppercase my-4 font-bold">
                      Vehicle details
                    </h2>
                    <div>
                      <label className="text-gray-700">Vehicle Category</label>
                      <span className="text-emerald-400 align-right">*</span>
                      <select
                        className="bg-gray-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                        type="text"
                        name="vehicle_category"
                        ref={register({ required: true })}
                      >
                        <option selected></option>

                        {vehicleDetails.map((item) => (
                          <option
                            key={item.productName}
                            value={item.productName}
                          >
                            {item.productName}
                          </option>
                        ))}
                      </select>
                      {errors.indv_title && (
                        <span className="text-emerald-500">
                          Vehicle is required
                        </span>
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
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-700">LGA</label>
                      <span className="text-emerald-400 align-right">*</span>

                      <select
                        id="lga"
                        name="lga"
                        ref={register({ required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                      >
                        <option selected></option>
                        {lga.map((item) => (
                          <option key={item.lgaID} value={item.lgaID}>
                            {item.lgaName}
                          </option>
                        ))}
                      </select>
                      {errors.firstName && (
                        <span className="text-emerald-500">
                          LGA is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-700">
                        Vehicle Plate Number
                      </label>
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
                      <label className="text-gray-700">Parks</label>
                      <span className="text-emerald-400 align-right">*</span>

                      <select
                        type="Number"
                        id="Parks"
                        name="parks"
                        ref={register({ required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                      >
                        <option value="" disabled selected></option>
                        {parks.map((item) => (
                          <option key={item.id} value={parseInt(item.id, 10)}>
                            {item.park}
                          </option>
                        ))}
                      </select>
                      {errors.firstName && (
                        <span className="text-emerald-500">
                          Park is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="text-gray-700">Unions</label>
                      <span className="text-emerald-400 align-right">*</span>

                      <select
                        type="number"
                        id="Unions"
                        name="unions"
                        ref={register({ required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                        // defaultValue={query.firstname}
                      >
                        <option value="" disabled selected></option>
                        {unions?.map((item) => (
                          <option key={item.id} value={Number(item.id)}>
                            {item.unionName}
                          </option>
                        ))}
                      </select>
                      {errors.firstName && (
                        <span className="text-emerald-500">
                          Union is required
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
                    {/* 
                    <div>
                      <label className="text-gray-700">Location</label>
                      <span className="text-emerald-400 align-right">*</span>

                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                      />
                      {errors.firstName && (
                        <span className="text-emerald-500">
                          Location is required
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      onClick={() => {
                        setState((prev) => {
                          return {
                            ...prev,
                            openAddSingle: false,
                          };
                        });
                      }}
                      className="border-2 border-teal-500 text-teal-600 px-2 py-2 rounded mr-2 "
                    >
                      Cancel
                    </div>
                    <SubmitButton disabled={setSubmitting}>
                      Start Enumeration
                    </SubmitButton>
                  </div>
                </div>
                <ToastContainer></ToastContainer>
              </form>
            )}
            {state.showEnumerationDetails && (
              <section>
                <div className="p-5 bg-white mt-4 shadow-xl rounded-xl  -ml-4 md:ml-0  md:px-4 md:py-8">
                  <div className="flex justify-between items-center mb-6 md:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4 ">
                    <div className="flex space-x-3 items-center">
                      <div>
                        <h6 className="text-md md:text font-bold mb-2">
                          Confirm Enumeration Details
                        </h6>
                        <p className="text-gray-500 flex flex-col text-xs md:flex-row">
                          Kindly ensure that all the information provided are
                          accurate
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-md py-4 px-4 bg-gray-50">
                    <div>
                      <label className="text-gray-700">Payment Reference</label>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-bold text-xl">
                          {state?.payment_ref}{" "}
                        </h3>
                        <LuCopy className="text-xl cursor-pointer" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-8 mb-8">
                      <div>
                        <label className="text-gray-700">
                          Vehicle Category
                        </label>
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
                        <label className="text-gray-700">
                          Vehicle Plate Number
                        </label>
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

                  <div className="w-full flex justify-end mt-4">
                    <div
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
                      className="border-2 border-teal-500 text-teal-600 px-2 py-2 rounded mr-2 "
                    >
                      Back
                    </div>
                    <SubmitButton
                      onClick={() => {
                        // setOpenAddSingle(false);
                        setState((prev) => {
                          return {
                            ...prev,
                            openPaymentModal: true,
                            openAddSingle: false,
                          };
                        });
                      }}
                    >
                      Proceed to checkout
                    </SubmitButton>
                  </div>
                </div>
              </section>
            )}
          </>
        </SideModal>
      )}
      {state.openPaymentModal && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div className="modal show w-full ">
            <div className="rounded-2xl">
              <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-8">
                  <div className="flex items-center justify-between space-x-4">
                    <h1 className="text-xl mb-2 font-bold w-56 md:w-80">
                      Make Payment
                    </h1>
                    <div className="flex justify-between items-center pl-8">
                      <button
                        onClick={() =>
                          setState((prev) => {
                            return {
                              ...prev,
                              openPaymentModal: false,
                              showEnumeration: true,
                              showEnumerationDetails: false,
                            };
                          })
                        }
                      >
                        <MdClose className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4 border-2 rounded-xl w-full mt-16 shadow-md p-6">
                    <div className="block md:flex w-full justify-between ">
                      <p className="text-gray-400">Payment Reference</p>
                      <p className="font-bold text-lg md:text-md">
                        {state?.payment_ref}
                      </p>
                    </div>
                    <div className="flex w-full justify-between ">
                      <p className="text-gray-400">Enumeration Type</p>
                      <p className="font-bold">Transport</p>
                    </div>
                    <div className="flex w-full justify-between ">
                      <p className="text-gray-400">Amount</p>
                      <p className="font-bold">{state.amount}</p>
                    </div>
                    <div className="flex w-full justify-between ">
                      <p className="text-gray-400">Vehicle Plate Number</p>
                      <p className="font-bold">
                        {state?.user?.vehicle_plate_number}
                      </p>
                    </div>
                    <select
                      onChange={(e) => setPaymentChannel(e.target.value)}
                      required
                      ref={register({ required: true })}
                      name="channel"
                      className="block mb-2 text-sm font-medium text-gray-900 bg-gray-50 rounded border border-gray-300 dark:text-white"
                    >
                      <option defaultvalue></option>
                      {channel.map((channel) => (
                        <option value={channel.value} key={channel.key}>
                          {channel.key}
                        </option>
                      ))}
                      {state.amount < 20000 && <option>USSD</option>}
                    </select>
                  </div>

                  {state.fundingLoading ? (
                    <div className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-600 text-white font-bold hover:bg-teal-400">
                      Make Payment
                      <ImSpinner className="w-5 h-5 ml-2 animate-spin" />
                    </div>
                  ) : (
                    <button>
                      <div
                        onClick={() => updateRefHandler(state)}
                        className="flex justify-center w-full cursor-pointer rounded-lg mt-20 p-3 bg-teal-600 text-white font-bold hover:bg-teal-400"
                      >
                        Make Payment
                        <Loader
                          visible={submitting}
                          type="TailSpin"
                          color="pink"
                          height={19}
                          width={19}
                          timeout={0}
                          className="ml-2"
                        />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TransportEnumeration;
