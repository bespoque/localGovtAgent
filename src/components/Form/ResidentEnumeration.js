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
const ResidentEnumerationForm = ({ onClose }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  let { data, isLoading, isError } = UseFetcher(`${url.BASE_URL}state/lga`);

  data = data?.data?.data;

  const arr = data?.map((lga) => lga.lgaName);

  const [propertyCategory, setPropertyCategory] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchProperty({ category: "Residential" });
        const category = await getPropertyCategories();
        setPropertyCategory(category.residential);
        console.log("result", result);
        console.log("propertyCategory", getPropertyCategory.residential);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  const [propertyType, setPropertyType] = useState(""); // State variable to track selected property type
  const [numberOfBQ, setNumberOfBQ] = useState(0); // State variable to track selected property type

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleBQChange = (event) => {
    setNumberOfBQ(event.target.value);
  };

  const handleBoysQuartersChange = (event) => {
    setBoysQuarters(event.target.value);
  };

  const SubmitHandler = async (data) => {
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
      console.log("response", res.data.message);
      onClose();
    } catch (error) {
      setSubmitting(false);
      const errormsg = error.response.data.error.message;
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
                  {/* <option value="">Select LGA </option> */}
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

                {(propertyType === "RS-BUNGALOW" ||
                  propertyType === "RS-DUPLEX" ||
                  propertyType === "RS-BLOCKFLAT") && (
                  <>
                    <div className="w-full -my-2">
                      <NewFormInput
                        required
                        ref={register()}
                        name="rooms"
                        type="number"
                        placeholder="Enter Number of Rooms"
                      />
                    </div>
                    <div className="w-full -my-2">
                      <NewFormInput
                        required
                        ref={register()}
                        name="bq"
                        type="number"
                        placeholder="Enter Number of Boysquatters"
                      />
                    </div>
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
          <SubmitButton text="Make Payment" disabled={submitting}>
            Add
            <Loader
              visible={submitting}
              type="TailSpin"
              color="pink"
              height={18}
              width={18}
              timeout={0}
              className="ml-2"
            />
          </SubmitButton>
        </form>
      </Widget>

      <ToastContainer />
    </>
  );
};
export default ResidentEnumerationForm;
