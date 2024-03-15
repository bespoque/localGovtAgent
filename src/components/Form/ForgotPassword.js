import Link from "next/link";
import { useState } from "react";
import CenteredForm from "../../layouts/centered-form";
import NewFormInput from "../FormInput/formInputs";
import { KgtinIcon } from "../Icons";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton/CustomButton";
import axios from "axios";
import url from "../../config/url";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import { TbCreditCard, TbPhoneCheck } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [verificationMethod, setVerificationMethod] = useState("email");
  const router = useRouter();

  //submit
  const SubmitHandler = async (data) => {
    setSubmitting(true);
    try {
      const res = await axios.post(`${url.BASE_URL}user/forgot-password`, {
        ...data,
        verify_via: verificationMethod,
      });
      setSubmitting(false);
      setSuccessMessage(res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/");
      }, 10000);
    } catch (e) {
      setSubmitting(false);
      if (e.response) setErrorMessage(e.response.data.message);
      toast.error(e.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
    }
  };
  return (
    <div className="w-full border-none md:mx-auto w-full">
      <CenteredForm
        subtitle="Forgot password"
        title="Enter ILIDNumber to recover your password"
      >
        {successMessage !== null && (
          <>
            <p className="p-2 text-green-700">{successMessage}</p>
          </>
        )}
        {errorMessage !== null && (
          <>
            <p className="p-2 text-emerald-700 ">{errorMessage}</p>
          </>
        )}
        <div className="">
          <form
            onSubmit={handleSubmit(SubmitHandler)}
            autoComplete="off"
            className="px-4"
          >
            <div className="">
              <NewFormInput
                name="state_id"
                label={<TbCreditCard />}
                ref={register({
                  minLength: 10,
                  maxLength: 10,
                  pattern: {
                    value: /^[0-9]*[.]?[0-9]*$/,
                    message: "ILIDNumber must be a number",
                  },
                })}
                autoComplete="off"
                type="text"
                required
                placeholder="Enter ILIDNumber"
              />
              {errors.state_id && errors.state_id.type === "minLength" && (
                <p className="text-emerald-600">
                  ILIDNumber must be 10 digits
                </p>
              )}
              {errors.state_id && errors.state_id.type === "maxLength" && (
                <p className="text-emerald-600">
                  ILIDNumber must be 10 digits
                </p>
              )}
              {errors.state_id && errors.state_id.type === "patter" && (
                <p className="text-emerald-600">ILIDNumber must be numbers</p>
              )}
              {errors.state_id && (
                <p className="text-emerald-600 bg-white">
                  {errors.state_id.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select verification method:
              </label>
              <div className="flex items-center">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="email"
                    checked={verificationMethod === "email"}
                    onChange={() => setVerificationMethod("email")}
                  />
                  <span className="ml-2">Email</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="phone"
                    checked={verificationMethod === "phone"}
                    onChange={() => setVerificationMethod("phone")}
                  />
                  <span className="ml-2">Phone</span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <CustomButton disabled={submitting}>
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

            <a
              href="/"
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

            {/* <div className="flex flex-row w-full mt-3 text-sm">
              <span className="mr-1">New user?</span> 
              <span>
                <Link legacyBehavior href="/signup">
                  <a className="text-teal-600 font-bold">Sign up here</a>
                </Link>
              </span>
            </div>
            <div className="flex flex-row w-full">
              <span className="mr-1">Already have an account?</span>
              <span>
                <Link legacyBehavior href="/">
                  <a className="text-teal-600 font-bold">Login here</a>
                </Link>
              </span>
            </div>
            <div className="">
              <p className="">
                I do not have an ILIDNumber
                <Link legacyBehavior href="/">
                  <a className="text-teal-600 font-bold"> Create one instantly</a>
                </Link>
              </p>
            </div> */}
          </form>
        </div>
      </CenteredForm>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ForgotPasswordForm;
