import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FormHeader } from "../FormHeader/FormHeader";
import { KgDate } from "../Icons";
import Input from "../FormInput/formInputs";
import { SubmitButton } from "../CustomButton/CustomButton";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import PopupAlert from "../popup-alert";
import { PopupModals } from "../modals/Modal";
import Loader from "react-loader-spinner";
import CenteredForm from "../../layouts/centered-form";
import { TbCreditCard } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const AgentSignUp = () => {
  const { register, handleSubmit, error, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors,
    watch: watch2,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [validationInfo, setValidationInfo] = useState([]);
  const [errormsg, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(() => false);
  const [secondForm, setSecondForm] = useState(() => false);
  const [showAlert, setShowAlert] = useState(false);
  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };

  const noId = watch2("src");

  const idArr = ["BVN", "DRIVER-LICENSE", "PASSPORT", "NIN"];

  const onSubmit = async (idVal) => {
    setIsFetching(true);
    setAuthToken();
    try {
      const response = await axios.post(
        `${url.BASE_URL}agent/validate-bvn`,
        idVal
      );

      const keys = Object.keys(response.data);
      setIsFetching(false);
      setError(null);
      if (response?.data?.phone == "") {
        setError("This ID is not associated with any number");
      }
      if (response.data?.status?.status === "id_mismatch") {
        setError("BVN Name and number does not match");
      } else {
        if (keys.includes("drivers_license")) {
          setValidationInfo(response.data.drivers_license);
        } else if (keys.includes("bvn")) {
          setValidationInfo(response.data.bvn);
        } else {
          setValidationInfo(response.data.body);
        }
        setSecondForm(true);
      }
      toast.success(response?.data?.message);
      setTimeout(() => {
        router.push("/agent-registration");
      }, 10000);
    } catch (error) {
      console.log("", error.response?.data);
      console.log("error", error.response?.data?.message);
      setError(
        error.response?.data?.status == 402
          ? "An error occurred"
          : error.response?.data?.message
      );
      toast.error(
        error.response?.data?.status == 402
          ? "An error occurred"
          : error.response?.data?.message,
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      setIsFetching(false);
    }
  };


  return (
    <>
     <ToastContainer />
      {showAlert && (
        <PopupModals
          title="ID VERIFICATION"
          message={errormsg}
          onClick={handleCloseAlert}
        />
      )}

      <form autoComplete="off" onSubmit={handleSubmit2(onSubmit)}>
        <div className="w-full p-1">
          <CenteredForm
            title="Select a means of identification to start your Agent registration"
            subtitle="Welcome back"
          >
            <div className="w-full lg:w-1/8 mt-6">
              <label
                for="src"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an ID type
              </label>
              <TbCreditCard className="absolute mt-2 z-1 text-2xl text-gray-500 mx-3" />
              <select
                required
                id="src"
                name="src"
                ref={register2({ required: true })}
                className="relative pl-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              >
                <option selected>Select Preferred ID Type</option>
                <option value="BVN" className="m-2 p-8">
                  BVN
                </option>
              </select>
              {errors.src && (
                <span className="text-red-500">Select an Id</span>
              )}
            </div>

            {idArr.includes(noId) && (
              <div className="mt-5 ">
                <div className="mb-5">
                  <Input
                    name="id"
                    label={<TbCreditCard />}
                    ref={register2({
                      minLength: 5,
                      maxLength: 20,
                    })}
                    autoComplete="off"
                    type="text"
                    required
                    placeholder="Enter ID Number"
                  />
                  <span className="text-red-500">{errormsg}</span>
                  {errors.id && (
                    <span className="text-red-500">Id is required</span>
                  )}
                </div>

                <div className="mb-3">
                  <Input
                    name="email"
                    label={<MdOutlineAlternateEmail />}
                    ref={register2({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    autoComplete="off"
                    type="text"
                    required
                    placeholder="Enter Email"
                  />
                  {errors.email && (
                    <span className="text-red-500 ">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {noId === "PASSPORT" && (
                  <div>
                    <div>
                      <Input
                        name="firstname"
                        label={<KgDate />}
                        ref={register2({
                          required: true,
                        })}
                        autoComplete="off"
                        type="text"
                        required
                        placeholder="Enter First Name"
                      />
                      {errors.firstName && (
                        <span className="text-red-500">
                          FirstName is required
                        </span>
                      )}
                    </div>
                    <div>
                      <Input
                        name="lastname"
                        label={<KgDate />}
                        ref={register2({
                          required: true,
                        })}
                        autoComplete="off"
                        type="text"
                        required
                        placeholder="Enter Last Name"
                      />
                      {errors.lastName && (
                        <span className="text-red-500">
                          Last Name is required
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-8 w-full">
                  <SubmitButton name="Submit" type="submit">
                    Submit
                    <Loader
                      visible={isFetching}
                      type="TailSpin"
                      color="pink"
                      height={19}
                      width={19}
                      timeout={0}
                      className="ml-2"
                    />
                  </SubmitButton>
                </div>
              </div>
            )}
          </CenteredForm>
        </div>
      </form>
     
    </>
  );
};

export default AgentSignUp;
