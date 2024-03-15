import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "../FormInput/formInputs";
import CustomButton from "../CustomButton/CustomButton";
import * as Icons from "../Icons";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import url from "../../config/url";
import axios from "axios";

const NonIndividualAuthForm = () => {
  const router = useRouter();

  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [submitting, setSubmitting] = useState(false);

  const SubmitHandler = async (code) => {
    setSubmitting(true);
    try {
      const response = await axios.post(
        `${url.BASE_URL}user/verify-abssin-otp`,
        code
      );
      setSubmitting(false);
      router.push("/corporate-registration");
    } catch (error) {}
  };

  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
        <div className="w-full p-1">
          {/* {errorMessages !== null && (
                errorMessages.map((errorMessage) => {
                  return <p className="text-emerald-500 shadow-md py-2 px-2 border-l-2 border-emerald-500">
                    {errorMessage}
                  </p>
                })
              )}
              {isSignUpComplete && (
                <p className="text-green-500 shadow-md py-2 px-2 border-l-2 border-green-500">
                  Sign up Complete. You may now login with your tax Id and
                  password
                </p>
              )}
              {tokenMessage && (
                <p className="text-green-500 shadow-md py-2 px-2 border-l-2 border-green-500">
                  {tokenMessage}
                </p>
              )} */}

          {/* <Input
                name={"tp_name"}
                label={<Icons.TaxpayerIcon />}
                autoComplete="off"
                required
                placeholder="Tax payer Name"
                type="text"
                value={`${taxPayerName.substr(0, 18)}...`}
                readOnly
              /> */}

          <Input
            name="code"
            id="code"
            label={<Icons.TokenIcon />}
            autoComplete="off"
            required
            ref={register({
              minLength: 6,
              maxLength: 6,
              pattern: {
                value: /^[0-9]*[.]?[0-9]*$/,
                message: "Token must be a number",
              },
            })}
            placeholder="Enter Token"
            type="text"
          />
          {errors.code && errors.code.type === "minLength" && (
            <p className="text-emerald-600">Token must be 6 digits</p>
          )}
          {errors.code && errors.code.type === "maxLength" && (
            <p className="text-emerald-600">Token must be 6 digits</p>
          )}

          <div className="mt-4 w-24">
            <CustomButton name="Submit" type="submit" disabled={submitting}>
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

          <div className="mt-4">
            {/* <p>
                  Didn't get a token?
                  <button
                    className="text-green-500 ml-1"
                    type="button"
                    onClick={() => dispatch(resendToken({ taxId }))}
                  >
                    {`${resendingToken ? "Resending..." : "Resend"}`}
                  </button>
                </p> */}
          </div>
        </div>
      </form>
    </>
  );
};

export default NonIndividualAuthForm;
