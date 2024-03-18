import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";
import { PasswordIcon } from "../Icons";
import { NewFormInput } from "../FormInput/formInputs";
import CustomButton from "../CustomButton/CustomButton";
import { PasswordIcon2 } from "../Icons";
import Loader from "react-loader-spinner";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import { PopupModals } from "../modals/Modal";
import { useEffect } from "react";
import Base64Image from "../base64Image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Webcam from "react-webcam";

const UserDetails = () => {
  const webcamRef = React.useRef(null);
  const password = useRef({});
  const router = useRouter();
  const { query } = router;

  const { register, handleSubmit, errors, watch } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    watch: watch2,
    formState: formState2,
  } = useForm();
  const [validationInfo, setValidationInfo] = useState([]);
  const [errormsg, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(() => false);
  const [secondForm, setSecondForm] = useState(() => false);
  const [submitting, setSubmitting] = useState(false);
  const [taxstation, setTaxStation] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [stateLga, setStateLga] = useState([]);
  const [category, setcategory] = useState([]);
  const [sector, setsector] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [showWebcam, setShowWebcam] = useState(false);
  const [convertedDate, setConvertedDate] = useState();
  const [showButton, setShowButton] = useState(true);
  const [inputErrors, setinputErrors] = useState({
    lga: "",
    email: "",
    phone_number: "",
    bvn: "",
    nin: "",
  });
  const [nin, setNin] = useState(null);
  const [bvn, setBvn] = useState(null);
  const [value, setValue] = useState(null);

  if (query?.length) {
    const originalDate = query?.birthdate;
    const parts = originalDate?.split("-");
    data = `${parts[2]}-${parts[1]}-${parts[0]}`;
    setConvertedDate(data);
  }
  const base64Image = query?.photo;
  const dataUrl = `data:image/png;base64,${base64Image}`;
  password.current = watch("password", "");

  useEffect(() => {
    fetchStation(), fetchState(), fetchLga(), fetchCategory(), getSector();
  }, []);

  useEffect(() => {
    if (query && query.birthdate) {
      const parts = query.birthdate.split("-");
      if (parts.length === 3) {
        const data = `${parts[2]}-${parts[1]}-${parts[0]}`;
        setConvertedDate(data);
      } else {
        console.error("Invalid date format");
      }
    } else {
      console.error("Query or birthdate is undefined");
    }

    if (query.src === "NIN") {
      const data = query.identity_id;
      setNin(data);
    } else if (query.src === "BVN") {
      const data = query.identity_id;
      setBVN(data);
    }
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setShowWebcam(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setShowButton(false);

    if (file) {
      const fileSize = file.size / 1024;
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64Data = e.target.result.split(",")[1]; // Get the base64 data part
        setBaseImage(base64Data);
        setShowWebcam(false);
      };

      reader.readAsDataURL(file);

      if (fileSize > 400) {
        setError("Image size exceeds 400KB. Please choose a smaller image.");
      } else {
        setSelectedImage(file);
        setError("");
      }
    }
  };

  const handleCheckbocClick = (event) => {
    setValue(event.target.checked ? 1 : 0);
  };

  const fetchState = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}state`);
      let states = response.data.data.map((item) => item.state);
      setStateList(states);
    } catch (error) {}
  };

  const fetchLga = async () => {
    try {
      const response = await axios.post(`${url.BASE_URL}state/lga`);
      let lgaName = response.data.data.map((item) => item);
      setStateLga(lgaName);
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
      let data = response.data.data.map((item) => item);
      setcategory(data);
    } catch (error) {}
  };

  const getSector = async () => {
    try {
      const response = await axios.get(`${url.BASE_URL}user/sector`);
      let sector = response.data.data.map((item) => item);
      setsector(sector);
    } catch (error) {}
  };

  // const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC"

  const onSubmitTpData = async (tpVal) => {
    // tpVal.platform = "paytax"
    // tpVal.tp_type = "Individual"

    setAuthToken();
    setIsFetching(true);
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${url.BASE_URL}user/create-individual`,
        { id: query.id, ...tpVal, createWallet: 1, image: baseImage }
      );
      setSubmitting(false);

      setIsFetching(false);
      setError(null);
      router.push("/");
      console.log(response);
      // toast.success(response?.data?.message)
      toast.success(
        response?.data?.message ||
          "Your account has been created successfully, proceed to login"
      );

      setSecondForm(true);
    } catch (error) {
      setSubmitting(false);
      setinputErrors(error?.response?.data?.message);
      setIsFetching(false);
      // console.log(error?.response?.status == 400 ? "You have entered an invalid character" : "An error occured");
      toast.error(
        error?.response?.status == 400
          ? "You have entered an incorrect input"
          : "An error occured"
      );
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-xl lg:text-3xl font-bold mx-2 text-center">
        New KGTIN Creation
      </h1>
      <div className="flex justify-center mt-4 border p-3 w-full shadow-xl mb-40 bg-white rounded-xl">
        <form
          className="mt-8 w-full mx-4"
          onSubmit={handleSubmit2(onSubmitTpData)}
        >
          <p className="font-bold mb-3 ">Taxpayer INFORMATION</p>

          <div className="flex flex-col items-center space-y-4">
            {base64Image ? (
              <Base64Image src={dataUrl} alt="Base64 Image" />
            ) : (
              ""
            )}

            {/* {!base64Image && (
              <div className="flex flex-col items-center space-y-4">
                 {showButton && (
                   <label className="cursor-pointer bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                     <input
                       type="file"
                       className="hidden"
                       accept="image/*"
                       onChange={handleImageUpload}
                     />
                     Upload Image
                   </label>
                 )}
                 <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                   {selectedImage && <img src={selectedImage} alt="Uploaded" />}
                 </div> */}
            {/*             
                <button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => setShowWebcam(true)}
                >
                  Take a Picture
                </button> */}
            {/*       
                {showWebcam && (
                  <div className="w-full max-w-md">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="rounded-lg shadow-lg"
                      mirrored={true} 
                    />
                    <button onClick={capture} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">Capture</button>
                  </div>
                )}
                  {imageSrc && <img src={imageSrc} alt="Captured Image" />}  */}
            {/* </div>
             )} */}
          </div>

          {/* {!base64Image ? (
            <Base64Image src={base64Image} alt="Base64 Image" />
            ): 
            <label>
            <input type="file" hidden accept="image/*"
            onChange={handleImageUpload}/>
            <span>Take a Picture</span>
            
            <button disabled={uploading} style={{opacity: uploading? '.5' :'1'}} className="bg-teal-600 p-3 w-32 text-center rounded text-white m-5">Take a selfie</button>
                {base64Image && (
            <div>


            
              <h2>Base64 Image Preview:</h2>
              <img src={selectedImage} alt="Uploaded" />
            </div>
          )}
                </label>
                
                } */}
          <div>
            {/* <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
          />
      <button onClick={capture}>Capture</button>
      {imageSrc && <img src={imageSrc} alt="Captured Image" />} */}

            {/* <div className="max-w-4xl mx-auto p-20 space-y-6">
        <label>
          <input type="file" hidden />
          <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
            {imageSrc? (
            <Base64Image src={base64Image} alt="Base64 Image" />

            ): (
              <span>Select Image</span>
            ) }
          </div>
        </label>
        <button disabled={uploading} style={{opacity: uploading? '.5' :'1'}} className="bg-emerald-600 p-3 w-32 text-center rounded text-white">  

        </button>
      </div> */}
            {/* <input type="file" accept="image/*" onChange={handleFileUpload} /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div>
              <label className="text-gray-700">Title</label>
              <span className="">*</span>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                type="text"
                name="indv_title"
                ref={register2({ required: true })}
              >
                <option selected></option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Mrss">Miss</option>
              </select>
              {errors2.indv_title && (
                <span className="text-emerald-500">Title is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query.firstname}
              />
              {errors2.firstName && (
                <span className="text-emerald-500">First Name is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Last Name</label>
              <input
                type="text"
                id="surname"
                name="surname"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query.lastname}
              />
              {errors2.lastName && (
                <span className="text-emerald-500">Last Name is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Middle Name</label>
              <input
                type="text"
                id="middle_name"
                name="middle_name"
                ref={register2}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query?.middlename}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query?.gender}
              >
                <option value={query?.gender}>{query?.gender}</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors2.gender && (
                <span className="text-emerald-500">Gender is required</span>
              )}
            </div>
            <div>
              <label htmlFor="birth_date" className="text-gray-700">
                Date of Birth
              </label>

              {convertedDate && (
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  ref={register2({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  value={convertedDate}
                />
              )}
              {!convertedDate && (
                <input
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  ref={register2({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                />
              )}
              {errormsg?.birth_date && (
                <span className="text-emerald-500">{errormsg.birth_date}</span>
              )}

              {errors2.dob && (
                <span className="text-emerald-500">
                  Date of Birth is required
                </span>
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
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query?.email}
              />
              {inputErrors.email && (
                <p className="text-emerald-500">{inputErrors.email}</p>
              )}

              {errors2?.email && (
                <span className="text-emerald-500">Email is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">occupation</label>
              <input
                id="occupation"
                name="occupation"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />

              {errors2?.occupation && (
                <span className="text-emerald-500">Occupation is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">Marital Status</label>
              <select
                id="marital_status"
                name="marital_status"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option value={query?.marital_status}>
                  {query?.marital_status}
                </option>
                <option value="married">Married</option>
                <option value="single">Single</option>
                <option value="divorced">Divorced</option>
              </select>
              {errors2.marital_status && (
                <span className="text-emerald-500">
                  Marital status is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">BVN</label>
              <input
                name="bvn"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                value={bvn}
              />
              {errors2.bvn && (
                <span className="text-emerald-500">BVN is required</span>
              )}
              {inputErrors?.bvn && (
                <span className="text-emerald-500">{inputErrors.bvn}</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Phone number</label>
              <input
                id="phone_number"
                name="phone_number"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query?.phone}
              />
              {errors2?.phone && (
                <span className="text-emerald-500">Phone is required</span>
              )}
              {inputErrors?.phone_number && (
                <span className="text-emerald-500">
                  {inputErrors.phone_number}
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">NIN</label>
              <input
                id="nin"
                name="nin"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                value={nin}
              />
              {inputErrors?.nin && (
                <span className="text-emerald-500">{inputErrors.nin}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">Birth place</label>
              <input
                id="birth_place"
                name="birth_place"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.phone && (
                <span className="text-emerald-500">
                  Brith place is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Mobile number</label>
              <input
                id="mobile_number"
                name="mobile_number"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.mobile_number && (
                <span className="text-emerald-500">Mobile name</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Mother's Maiden name</label>
              <input
                id="mother_maiden_name"
                name="mother_maiden_name"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.mother_maiden_name && (
                <span className="text-emerald-500">Mother's Maiden name</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Tax Office</label>
              <select
                id="tax_office"
                name="tax_office"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option value="selected">Select Tax Station</option>
                {taxstation.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {/* <select
                  id="tax_office"
                  name="tax_office"
                  ref={register2({ required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                >
                  <option value="">Select office</option>
                  <option value="single">Head office</option>
                  <option value="married">Married</option>
                </select> */}
              {errors2?.tax_office && (
                <span className="text-emerald-500">Tax office is required</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">Employer name</label>
              <input
                id="employer_name"
                name="employer_name"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />

              {errors2?.employer_name && (
                <span className="text-emerald-500">
                  Employer Name is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Category</label>

              <select
                id="category"
                name="category"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option selected>Select Category</option>
                {category.map((item) => (
                  <option key={item.id} value={item.category_name}>
                    {item.category_name}
                  </option>
                ))}
              </select>
              {errors2?.category && (
                <span className="text-emerald-500">Category is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Sector</label>
              <select
                id="sector"
                name="sector"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              >
                <option selected>Select an option</option>
                {sector.map((sec) => (
                  <option key={sec.id} value={sec.sector_name}>
                    {sec.sector_name}
                  </option>
                ))}
              </select>
              {errors2?.sector && (
                <span className="text-emerald-500">Sector is required</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Income Source</label>
              <input
                id="income_source"
                name="income_source"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />

              {errors2?.income_source && (
                <span className="text-emerald-500">
                  Income source is required
                </span>
              )}
            </div>
            <div>
              <label className="text-gray-700">Employer Tin</label>
              <input
                id="employer_tin"
                name="employer_tin"
                ref={register2()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
            </div>
          </div>
          <hr />
          <p className="font-bold my-3">Origin Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">Nationality</label>
              <input
                id="nationality"
                name="nationality"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                value="Nigerian"
              />
              {errors2?.nationality && (
                <span className="text-emerald-500">Nationality</span>
              )}
            </div>
            <div>
              <label className="text-gray-700">State of Origin</label>
              <select
                id="state_of_origin"
                name="state_of_origin"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option selected>Select an option</option>
                {stateList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors2?.state_of_origin && (
                <span className="text-emerald-500">State of is required</span>
              )}
            </div>

            <div>
              <label className="text-gray-700">LGA</label>
              <select
                id="lga"
                name="lga"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option selected>Select an option</option>
                {stateLga.map((item) => (
                  <option key={item.lgaID} value={item.lgaID}>
                    {item.lgaName}
                  </option>
                ))}
              </select>
              {errors2?.lga && (
                <span className="text-emerald-500">Employment is required</span>
              )}
            </div>
          </div>
          <hr />
          <p className="font-bold my-3">Residential Address</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label className="text-gray-700">State of residence</label>
              <select
                id="state_of_residence"
                name="state_of_residence"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                defaultValue={query?.state_of_residence}
              >
                <option selected>Select an option</option>
                {stateList.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors2?.state && (
                <span className="text-emerald-500">Employment is required</span>
              )}
            </div>

            <div>
              <label className="text-gray-700">LGA</label>
              <select
                id="lga"
                name="lga"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              >
                <option selected>Select an option</option>
                {stateLga.map((item) => (
                  <option key={item.lgaID} value={item.lgaID}>
                    {item.lgaName}
                  </option>
                ))}
              </select>
              {errors2.lga && (
                <span className="text-emerald-500">Employment is required</span>
              )}
            </div>
            <div>
              <label htmlFor="numberOfChildren" className="text-gray-700">
                Ward
              </label>
              <input
                id="ward"
                name="ward"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.ward && (
                <span className="text-emerald-500">Ward is required</span>
              )}
            </div>
            <div>
              <label htmlFor="numberOfChildren" className="text-gray-700">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.numberOfChildren && (
                <span className="text-emerald-500">Street is required</span>
              )}
            </div>
            <div>
              <label htmlFor="numberOfChildren" className="text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.city && (
                <span className="text-emerald-500">City is required</span>
              )}
            </div>
            <div>
              <label htmlFor="numberOfChildren" className="text-gray-700">
                House No
              </label>
              <input
                type="number"
                id="house_no"
                name="house_no"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.numberOfChildren && (
                <span className="text-emerald-500">
                  House number is required
                </span>
              )}
            </div>
          </div>
          <hr />
          {/* <p className="font-bold my-3">Create Password</p> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3">
            <div>
              <label htmlFor="password" className="text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={register2({ required: true })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {errors2?.password && (
                <span className="text-emerald-500">password is required</span>
              )}
            </div>

            <div>
              <label htmlFor="createWallet" className="text-gray-700 mr-3">
                Create Wallet
              </label>
              <input
                id="createWallet"
                name="createWallet"
                type="checkbox"
                ref={register2()}
                onChange={handleCheckbocClick}
                checked={value === 1}
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
              />
              {/* {errors2?.password && (
                <span className="text-emerald-500">password is required</span>
              )} */}
            </div>

            {/* <div className="">
              <NewFormInput
                name={"password"}
                label={<PasswordIcon />}
                autoComplete="off"
                required
                placeholder="Enter Password"
                usePasswordIcon
                ref={register2({
                  required: "Please enter a Password",
                  minLength: {
                    value: 8,
                    message: "Must be 8 characters or more",
                  },
                  validate: (value) => {
                    return (
                      [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                        (pattern) => pattern.test(value)
                      ) ||
                      "Must include lower, upper, number, and special characters"
                    );
                  },
                })}
              />
              {errors.password && (
                <p className="text-emerald-500">{errors.password.message}</p>
              )}

              <NewFormInput
                name={"confPassword"}
                label={<PasswordIcon2 />}
                autoComplete="off"
                required
                placeholder="Enter Password again"
                usePasswordIcon
                ref={register2({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.confPassword && (
                <p className="text-emerald-500">{errors.confPassword.message}</p>
              )}
            </div> */}
            {/* <div className="mt-10 flex justify-between items-center">
              <div className="">
                <CustomButton disable={submitting}>
                  Submit
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
              <div className="">
                <span>
                  <Link legacyBehavior href="/">
                    <a className="link">Back to Login</a>
                  </Link>
                </span>
              </div>
            </div> */}
          </div>
          {errormsg && (
            <div
              className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded w-50"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">{errormsg}</span>
            </div>
          )}
          <CustomButton disable={submitting}>
            Submit
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
        </form>
        <ToastContainer />
      </div>

      {/* {errormsg && (<PopupModals title={'Abssin Registration'} message={errormsg.email}/>)} */}
      {/* {errormsg && (<PopupModals title={'Abssin Registration'} message={errormsg.email}/>)} */}
    </>
  );
};

export default UserDetails;
