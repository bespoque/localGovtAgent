import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../FormInput/formInputs";
import { FormHeader } from "../FormHeader/FormHeader";
import CustomButton from "../CustomButton/CustomButton";
import { KgtinIcon } from "../Icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { signUp, resetSubmitting } from "../../redux/signup/signup.actions";
import Loader from "react-loader-spinner";
import { useRouter } from "next/router";
import UseFetcher from "../fetcher/useFetcher";
import url from "../../config/url";
import CenteredForm from "../../layouts/centered-form";
import { TbCreditCard, TbLockCheck } from "react-icons/tb";
import { verifyCaptcha } from "../reCAPTCHA/ServerActions";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const recaptchaRef = useRef(null);

  const [isVerified, setIsverified] = useState(false);
  //state
  // const { enableInput, submitting, signUpErrors, isValid } = useSelector(
  const { submitting, signUpErrors, isValid } = useSelector(
    (state) => ({
      // enableInput: state.modal.input,
      submitting: state.signUp.submitting,
      isValid: state.signUp.isValid,
      signUpErrors: state.signUp.errorMessages,
    }),
    shallowEqual
  );
  let { data } = UseFetcher(`${url.BASE_URL}state/lga`);

  data = data?.data?.data;

  useEffect(() => {
    console.log("Received data", data);
    if (isValid) {
      router.push("/signup/auth");
    }
    dispatch(resetSubmitting());
  }, [isValid]);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const SubmitHandler = (taxId) => {
    dispatch(signUp(taxId));
  };

  const arr = [];
  for (let i = 0; i < data?.length; i++) {
    const e = data[i].lgaName;
    // console.log(e);
    arr.push(e);
  }

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    console.log("token", token);
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));

    console.log("isVerified", isVerified);
  }

  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      autoComplete="off"
      className="px-4"
    >
      <div className="w-full">
        <CenteredForm
          title="Enter your KGTIN Number to create your account"
          subtitle="Get Started"
        >
          {signUpErrors !== null && (
            <p className="border-emerald-500 border-l-2 text-emerald-500 p-2">
              {signUpErrors.map((item) => {
                return <span className="">{item}</span>;
              })}
            </p>
          )}

          {errors.id && errors.id.type === "minLength" && (
            <p className="text-red-600">KGTIN must be 10 digits</p>
          )}
          {errors.id && errors.id.type === "maxLength" && (
            <p className="text-red-600">KGTIN must be 10 digits</p>
          )}
          {errors.id && (
            <p className="text-red-600 bg-white">{errors.id.message}</p>
          )}

          <div>
            <Input
              name="id"
              label={<TbCreditCard />}
              ref={register({
                // type: number,
                minLength: 10,
                maxLength: 10,
                pattern: {
                  value: /^[0-9]*[.]?[0-9]*$/,
                  message: "Tax Id must be a number",
                },
              })}
              autoComplete="off"
              type="number"
              required
              placeholder="Enter KGTIN Number"
            />
          </div>

          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6Lcm5DEoAAAAACu3aMDhOCy-exGdoem7QZ7k-FFq"
              ref={recaptchaRef}
              onChange={handleCaptchaSubmission}
            />
          </div>

          <div className=" w-full">
            <CustomButton
              name="Submit"
              type="submit"
              disabled={submitting || !isVerified}
            >
              Create Account
              <Loader
                visible={submitting}
                type="TailSpin"
                color="pink"
                height={18}
                width={18}
                timeout={0}
                className="ml-2"
              />
              {errors.email && errors.email.type === "minLength" && (
                <p className="text-red-600">
                  KGTIN must be 10 digits
                </p>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <p className="text-red-600">
                  KGTIN must be 10 digits
                </p>
              )}
              {errors.email && (
                <p className="text-red-600 bg-white">
                  {errors.email.message}
                </p>
              )}
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
        </CenteredForm>
      </div>
    </form>
  );
};

export default SignUpForm;
