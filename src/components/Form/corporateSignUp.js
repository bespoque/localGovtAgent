import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../config/url";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton/CustomButton";
import { KgtinIcon } from "../Icons";
import Loader from "react-loader-spinner";
import { FormHeader } from "../FormHeader/FormHeader";
import Input from "../FormInput/formInputs";
import { PopupModals } from "../modals/Modal";
import { useRouter } from "next/router";
import CenteredForm from "../../layouts/centered-form";

const CorporateSignUpForm = () => {
  const router = useRouter();

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrormsg] = useState("");
  const [token, settoken] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };

  const validateID = async (id) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${url.BASE_URL}user/verify-abssin`,
        id
      );

      setShowAlert(true);
      settoken(response.data.message);
      setSubmitting(false);
      router.push("nonindividual-signup/auth");
    } catch (error) {
      //   setErrormsg(error.response.data.message.id)
    }
  };

  return (
    <>
      {showAlert && (
        <PopupModals
          title="Token Sent!"
          message={token}
          onClick={handleCloseAlert}
        />
      )}

      <form onSubmit={handleSubmit(validateID)} autoComplete="off">
        <div className="w-full">
          <CenteredForm
            title=" Enter your ILID Number to create your Business account"
            subtitle="Create Business Account"
          >
            {/* <FormHeader text="Get Started" /> */}
            {/* <p className="text-coolGray">
          Enter your ILIDNumber to create your Business account
        </p> */}

            <div>
              <Input
                name={"id"}
                id="id"
                ref={register({
                  minLength: 10,
                  maxLength: 10,
                  pattern: {
                    value: /^[0-9]*[.]?[0-9]*$/,
                    message: "ILID  must be a number",
                  },
                })}
                autoComplete="off"
                required
                placeholder="Enter ILID"
                // disabled={enableInput}
                type="text"
              />
              {errors.id && errors.id.type === "minLength" && (
                <p className="text-emerald-600">
                  ILIDNumber must be 10 digits
                </p>
              )}
              {errors.id && errors.id.type === "maxLength" && (
                <p className="text-emerald-600">
                  ILIDNumber must be 10 digits
                </p>
              )}
              {errors.id && (
                <p className="text-emerald-600 bg-white">{errors.id.message}</p>
              )}
              {errorMsg && (
                <p className="text-emerald-600 bg-white">{errorMsg}</p>
              )}
            </div>

            <div className="mt-4 w-full">
              <CustomButton name="Submit" type="submit" disabled={submitting}>
                Create Business Account
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
          </CenteredForm>
        </div>
      </form>
    </>
  );
};

export default CorporateSignUpForm;
