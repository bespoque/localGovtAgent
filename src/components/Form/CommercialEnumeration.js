import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import axios from "axios";
import Loader from "react-loader-spinner";
import { SubmitButton } from "../CustomButton/CustomButton";
import url from "../../config/url";
import { useRouter } from "next/router";
import { formatNumber } from "../../functions/numbers";
import Spinner from "../spiner";
import { v4 as uuidv4 } from "uuid";
import { taxStation } from "../../json/taxOffice";
import UseFetcher from "../fetcher/useFetcher";
import { saveAs } from "file-saver";

import { RiInformationLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiMessageSquareCheck } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
import { fetchProperty, getPropertyCategories } from "../../services/general";
const CommercialEnumerationForm = ({ onClose }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [propertyType, setPropertyType] = useState(""); // State variable to track selected property type
  const [extras, setExtras] = useState({
    swimmingPool: "",
    outdoorLounge: "",
    hall: "",
    outsideBar: "",
  });

  const [propertyCategory, setPropertyCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchProperty({ category: "Commercial" });
        const category = await getPropertyCategories();
        setPropertyCategory(category.commercial);
        console.log("category", category);
        console.log("propertyCategory", getPropertyCategory.commercial);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleSwimmingPool = (event) => {
    setExtras((prev) => {
      return {
        ...prev,
        swimmingPool: event.target.value,
      };
    });
  };

  const handleOutdoorLounge = (event) => {
    setExtras((prev) => {
      return {
        ...prev,
        outdoorLounge: event.target.value,
      };
    });
  };

  const handleHall = (event) => {
    setExtras((prev) => {
      return {
        ...prev,
        hall: event.target.value,
      };
    });
  };

  const handleOutsideBar = (event) => {
    setExtras((prev) => {
      return {
        ...prev,
        outsideBar: event.target.value,
      };
    });
  };

  const SubmitHandler = async (data) => {
    console.log(data);
    const payload = {
      productTag: data.productTag,
      location: data.location,
      others: [],
    };

    // Iterate over keys in data
    for (const key in data) {
      if (key !== "productTag" && key !== "location") {
        payload.others.push({
          item: key,
          quantity: parseInt(data[key]),
        });
      }
    }

    console.log(payload);
    setSubmitting(true);

    try {
      const res = await axios.post(
        `${url.BASE_URL}enumeration/property/create`,
        payload
      );
      setSubmitting(false);
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      setSubmitting(false);
      const errormsg = error?.response?.data?.error?.message;
      toast.error(errormsg);
    }
  };

  return (
    <>
      <Widget title="">
        <form className="p-5" onSubmit={handleSubmit(SubmitHandler)}>
          <div className="mt-1">
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full ">
              <div className="w-full  mt-5 md:mt-0">
                <h6 className="my-3 text-xs uppercase font-bold text-gray-400">
                  Property Details
                </h6>
                <select
                  // onChange={filterItem}
                  onChange={handlePropertyTypeChange}
                  value={propertyType}
                  required
                  ref={register({ required: true })}
                  name="productTag"
                  className="bg-gray-50 mb-4 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                >
                  <option defaultValue>Select Property Type</option>
                  {propertyCategory.map((item) => (
                    <option key={item.id} value={item.productTag}>
                      {item.productName}
                    </option>
                  ))}
                </select>

                <div className="w-full">
                  <NewFormInput
                    required
                    ref={register()}
                    name="location"
                    placeholder="Enter Address"
                  />
                </div>

                {propertyType === "CM-HOTEL" && (
                  <>
                    <div className="w-full -mt-2">
                      <NewFormInput
                        required
                        ref={register()}
                        name="swimmingpool"
                        type="number"
                        placeholder="Enter Number of Rooms"
                      />
                    </div>

                    <select
                      // onChange={filterItem}
                      onChange={handleSwimmingPool}
                      value={extras.swimmingPool}
                      required
                      ref={register({ required: true })}
                      name="swimmingpool"
                      className="bg-gray-50 mb-4 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    >
                      <option defaultValue>Swimming Pool</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((md, i) => (
                        <option value={md} key={i}>
                          {md}
                        </option>
                      ))}
                    </select>

                    <select
                      // onChange={filterItem}
                      onChange={handleOutdoorLounge}
                      value={extras.outsideBar}
                      required
                      ref={register({ required: true })}
                      name="hall"
                      className="bg-gray-50 mb-4 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    >
                      <option defaultValue>Outside Bar</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((md, i) => (
                        <option value={md} key={i}>
                          {md}
                        </option>
                      ))}
                    </select>

                    <select
                      // onChange={filterItem}
                      onChange={handleHall}
                      value={extras.hall}
                      required
                      ref={register({ required: true })}
                      name="hall"
                      className="bg-gray-50 mb-4 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    >
                      <option defaultValue>Hall</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((md, i) => (
                        <option value={md} key={i}>
                          {md}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {(propertyType === "Hotel" || propertyType == "Nite Club") && (
                  <>
                    <select
                      // onChange={filterItem}
                      onChange={handleOutsideBar}
                      value={extras.outdoorLounge}
                      required
                      ref={register({ required: true })}
                      name="outsideBar"
                      className="bg-gray-50 mb-4 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                    >
                      <option defaultValue>Outdoor Lounge</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((md, i) => (
                        <option value={md} key={i}>
                          {md}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col lg:flex-row lg:flex-wrap w-full ">
            <h6 className="my-3 text-xs uppercase font-bold text-gray-400">
              Owner Details
            </h6>
            <div className="w-full -my-1">
              <NewFormInput
                required
                ref={register()}
                name="name"
                placeholder="Enter Name"
              />
            </div>
            <div className="w-full -my-1">
              <NewFormInput
                required
                ref={register()}
                name="phone_number"
                placeholder="Phone Number"
              />
            </div>
            <div className="w-full -my-1">
              <NewFormInput
                required
                ref={register()}
                name="email"
                placeholder="Enter Email"
              />
            </div>
            <div className="w-full -my-1">
              <NewFormInput
                required
                ref={register()}
                name="abssin"
                placeholder="Enter ILIDNumber"
              />
            </div>
          </div> */}
          {formState.isValid}
          <SubmitButton text="Make Payment" disabled={!formState.isValid}>
            Add
          </SubmitButton>
        </form>
      </Widget>

      <ToastContainer />
    </>
  );
};
export default CommercialEnumerationForm;
