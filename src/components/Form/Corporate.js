import { useState, useEffect } from "react";
import axios from "axios";
import url from "../../config/url";
import Input from "../FormInput/formInputs";
import { FormHeader } from "../FormHeader/FormHeader";
import CustomButton from "../CustomButton/CustomButton";
import { KgtinIcon } from "../Icons";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Corporate = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isValidated, setisValidated] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const [iderrormsg, setIdErrormsg] = useState(null);
  const [loading, setLoading] = useState();
  const [stateList, setStateList] = useState();
  const [stateLga, setStateLga] = useState([]);
  const [taxStation, setTaxStation] = useState([]);
  const [sector, setSector] = useState([]);
  const [category, setCategory] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [validationInfo, setValidationInfo] = useState(null);

  useEffect(() => {
    fetchStation(),
      fetchState(),
      fetchLga(),
      fetchSector(),
      fetchCategory(),
      fetchBusinessType();
  }, []);

  const fetchState = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}state`);

      let states = response.data.data.map((item) => item.state);
      setStateList(states);
      console.log(stateList);
    } catch (error) {}
  };

  const fetchLga = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}state/lga`);

      let lga = response.data.data.map((item) => item);
      setStateLga(lga);
    } catch (error) {}
  };

  const fetchSector = async () => {
    try {
      const response = await axios.get(`${url.BASE_URL}user/sector`);
      let sector = response.data.data.map((item) => item);
      setSector(sector);
    } catch (error) {}
  };

  const fetchStation = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}user/station`);
      let station = response.data.data.map((item) => item.name);

      setTaxStation(station);
    } catch (error) {}
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}cdn/category`);
      let category = response.data.data.map((item) => item);

      setCategory(category);
    } catch (error) {}
  };

  const fetchBusinessType = async () => {
    try {
      const response = await axios.get(`${url.BASE_URL}user/business-type`);
      let businessType = response.data.data.map((item) => item);

      setBusinessType(businessType);
    } catch (error) {}
  };

  const validateID = async (id) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${url.BASE_URL}user/verify-abssin`,
        id
      );
      setSubmitting(false);
      setisValidated(true);
    } catch (error) {
      // setIdErrormsg(error.response.data.message.id)
    }
  };

  const submitData = async (data) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${url.BASE_URL}user/create-non-individual`,
        data
      );
      setSubmitting(false);
    } catch (error) {
      const keys = Object.keys(error.response.data.message);

      if (keys.includes("coy_name")) {
        setValidationInfo(error.response.data.message.coy_name);
      } else if (keys.includes("regist_name")) {
        setValidationInfo(error.response.data.message.regist_name);
      } else if (keys.includes("password")) {
        setValidationInfo(error.response.data.message.password);
      } else if (keys.includes("category")) {
        setValidationInfo(error.response.data.message.category);
      } else if (keys.includes("e_mail")) {
        setValidationInfo(error.response.data.message.e_mail);
      } else if (keys.includes("email")) {
        setValidationInfo(error.response.data.message.email);
      } else if (keys.includes("type_of_organisation")) {
        setValidationInfo(error.response.data.message.type_of_organisation);
      } else if (keys.includes("line_of_business")) {
        setValidationInfo(error.response.data.message.line_of_business);
      } else if (keys.includes("date_of_incorporation")) {
        setValidationInfo(error.response.data.message.date_of_incorporation);
      } else if (keys.includes("phone_no")) {
        setValidationInfo(error.response.data.message.sector);
      } else if (keys.includes("house_no")) {
        setValidationInfo(error.response.data.message.house_no);
      } else if (keys.includes("street")) {
        setValidationInfo(error.response.data.message.street);
      } else if (keys.includes("lga")) {
        setValidationInfo(error.response.data.message.lga);
      } else if (keys.includes("state")) {
        setValidationInfo(error.response.data.message.state);
      } else if (keys.includes("date_of_commencement")) {
        setValidationInfo(error.response.data.message.date_of_commencement);
      } else if (keys.includes("tax_office")) {
        setValidationInfo(error.response.data.message.tax_office);
      } else if (keys.includes("cdn_category_id")) {
        setValidationInfo(error.response.data.message.cdn_category_id);
      } else if (keys.includes("cdn_category_id")) {
        setValidationInfo(error.response.data.message.cdn_category_id);
      } else {
        // Handle other error cases
      }
    }
    toast.error(validationInfo);
  };

  return (
    <>
      {/* {!isValidated && (
         <form onSubmit={handleSubmit(validateID)} autoComplete="off" className="w-full md:w-2/3 lg:w-1/2 mx-auto">
         <div className="w-full">
           <FormHeader text="Register as a Business" />
           <p className="text-coolGray">Enter your ILIDNumber to get started</p>
           <Input
             name="id"
             id='id'
             ref={register({
               minLength: 10,
               maxLength: 10,
               pattern: {
                 value: /^[0-9]*[.]?[0-9]*$/,
                 message: "ILIDNumber must be a number",
               },
             })}
             label={<KgtinIcon />}
             autoComplete="off"
             required
             placeholder="Enter ILIDNumber"
             type="Number"
           />
           {errors.id && errors.id.type === "minLength" && (
             <p className="text-emerald-600">ILIDNumber must be 10 digits</p>
           )}
           {errors.id && errors.id.type === "maxLength" && (
             <p className="text-emerald-600">ILIDNumber must be 10 digits</p>
           )}
           {iderrormsg && (
             <p className="text-emerald-600 bg-white">{iderrormsg}</p>
           )}
 
           <div className="mt-8 w-full">
             <CustomButton name="Submit" type="submit">
               Continue
               <Loader
                 visible={submitting}
                 type="TailSpin"
                 color="pink"
                 height={18}
                 width={18}
                 timeout={0}
                 className="ml-2"
               />
             </CustomButton>
           </div>
           <a
             href="/login"
             className="w-full flex items-center justify-center my-4  text-teal-600 space-x-2 cursor-pointer"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               stroke="currentColor"
               className="w-6 h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
               />
             </svg>
 
             <span className="font-bold">Go back</span>
           </a>
         </div>
       </form>
      )} */}

      <div className="">
        <form className=" " onSubmit={handleSubmit2(submitData)}>
          <FormHeader text="Register as a Business" />

          <p className="font-bold mb-3">Business Information</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-gray-700">Company Name</label>
              <input
                type="text"
                id="coy_name"
                name="coy_name"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.coy_name && (
                <span className="text-emerald-500">
                  Company Name is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Registered Name</label>
              <input
                type="text"
                id="regist_name"
                name="regist_name"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.regist_name && (
                <span className="text-emerald-500">
                  Registered Name is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="text-gray-700">Company Tin</label>
              <input
                type="text"
                id="companytin"
                name="companytin"
                ref={register2}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-gray-700">RC No</label>
              <input
                type="number"
                id="rcno"
                name="rcno"
                ref={register2}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.rcno && (
                <span className="text-emerald-500">RC No is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label htmlFor="birth_date" className="text-gray-700">
                Enterprise Reg Number
              </label>
              <input
                type="number"
                id="enterprise_reg_no"
                name="enterprise_reg_no"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.enterprise_reg_no && (
                <span className="text-emerald-500">
                  Enterprise Reg Number is required
                </span>
              )}
            </div>
            <div>
              <label htmlFor="line_of_business" className="text-gray-700">
                Line Of Business
              </label>

              <select
                id="line_of_business"
                name="line_of_business"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select an option</option>
                {businessType.map((item) => (
                  <option key={item.id} value={item.business_type}>
                    {item.business_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="type_of_organisation" className="text-gray-700">
                Type Of Organisation
              </label>
              <input
                type="text"
                id="type_of_organisation"
                name="type_of_organisation"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="date_of_incorporation" className="text-gray-700">
                Date of Incorporation
              </label>
              <input
                type="date"
                id="date_of_incorporation"
                name="date_of_incorporation"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="line_of_business" className="text-gray-700">
                Date of Commencement
              </label>
              <input
                type="date"
                id="date_of_commencement"
                name="date_of_commencement"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-gray-700">Category</label>
              <select
                id="cdn_category_id"
                name="cdn_category_id"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select an option</option>
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.category_name}
                  </option>
                ))}
              </select>
              {errors2.category && (
                <span className="text-emerald-500">Employment is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Category</label>
              <select
                id="category"
                name="category"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select an option</option>
                {category.map((item) => (
                  <option key={item.id} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))}
              </select>
              {errors2.category && (
                <span className="text-emerald-500">Employment is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Sector</label>
              <select
                id="sector"
                name="sector"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select an option</option>
                {sector.map((sec) => (
                  <option key={sec.id} value={sec.sector_name}>
                    {sec.sector_name}
                  </option>
                ))}
              </select>
              {errors2.sector && (
                <span className="text-emerald-500">Sector is required</span>
              )}
            </div>
            <div>
              <label htmlFor="e_mail" className="text-gray-700">
                Email
              </label>
              <input
                type="e_mail"
                id="e_mail"
                name="e_mail"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.e_mail && (
                <span className="text-emerald-500">Email is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Phone number</label>
              <input
                type="number"
                id="phone_no"
                name="phone_no"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
              {errors2.phone_no && (
                <span className="text-emerald-500">Phone is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">House number</label>
              <input
                type="number"
                id="house_no"
                name="house_no"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-gray-700">Street</label>
              <input
                text="text"
                id="street"
                name="street"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-gray-700">City</label>
              <input
                text="text"
                id="city"
                name="city"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-gray-700">LGA</label>
              <select
                id="lga"
                name="lga"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select an option</option>
                {stateLga?.map((item) => (
                  <option key={item.lgaID} value={item.lgaID}>
                    {item.lgaName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-700">Ward</label>
              <input
                text="text"
                id="ward"
                name="ward"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="text-gray-700">State</label>

              <select
                id="state"
                name="state"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select State Of Origin</option>
                {stateList?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-700">Tax Office</label>
              <select
                id="tax_office"
                name="tax_office"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option value="selected">Select Tax Station</option>
                {taxStation?.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="text-gray-700">Password</label>
              <input
                placeholder="Enter Password"
                text="password"
                id="password"
                name="password"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
          </div>

          <CustomButton>Submit</CustomButton>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Corporate;
