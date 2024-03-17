import Input from "../FormInput/formInputs";
import CustomButton from "../CustomButton/CustomButton";
import { useRef, useEffect, useState } from "react";
import * as Icons from "../Icons";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  signUpAuth,
  resendToken,
} from "../../redux/signup-auth/signup-auth.actions";
import Loader from "react-loader-spinner";
import UseFetcher from "../fetcher/useFetcher";
import { verifyCaptcha } from "../../components/reCAPTCHA/ServerActions";
import { fetchLga } from "../../services/general";
import { TbCreditCard, TbLockCheck, TbWorldCheck } from "react-icons/tb";
import { MdPassword } from "react-icons/md";
import CenteredForm from "../../layouts/centered-form";

import { TbPhoneCheck } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  //redux state
  const dispatch = useDispatch();
  const {
    taxId,
    taxPayerName,
    submitting,
    errorMessages,
    isSignUpComplete,
    resendingToken,
    tokenMessage,
    isValid,
  } = useSelector(
    (state) => ({
      taxId: state.signUp.taxId,
      taxPayerName: state.signUp.taxPayerName,
      submitting: state.signUpAuth.submitting,
      errorMessages: state.signUpAuth.errorMessages,
      isSignUpComplete: state.signUpAuth.isSignUpComplete,
      resendingToken: state.signUpAuth.resendingToken,
      tokenMessage: state.signUpAuth.tokenMessage,
      isValid: state.signUp.isValid,
    }),
    shallowEqual
  );
  const router = useRouter();
  const recaptchaRef = useRef(null);
  const [isVerified, setIsverified] = useState(false);
  let { data } = UseFetcher(`${url.BASE_URL}state/lga`);

  data = data?.data?.data;

  const [lga, setLga] = useState([]);
  const [walletValue, setWalletValue] = useState(1);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const lga = await fetchLga();

        setLga(lga);
      } catch (error) {}
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (errorMessages) {
      {
        errorMessages !== null &&
          errorMessages.map((errorMessage) => {
            toast.error(errorMessage);
          });
      }
    }
    {
      isSignUpComplete &&
        (toast.success(
          " Sign up Complete. You may now login with your tax Id and password"
        ),
        submitting === true,
        setTimeout(() => {
          router.push("/");
        }, 20000));
    }
    {
      tokenMessage && toast.success(tokenMessage);
    }
  }, [errorMessages, isSignUpComplete, tokenMessage]);

  //react-hook-form
  const { register, handleSubmit, errors, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const password = useRef({});
  password.current = watch("password", "");

  //submit form
  const SubmitHandler = (data) => {
    let payload = {
      state_id: data.kgtin,
      otp: data.tp_token,
      password: data.password,
      lga: data.lga,
      email: data.email,
      phone: data.phone,
      bvn: data.bvn,
      createWallet: walletValue,
    };
    dispatch(signUpAuth(payload));
  };

  // useEffect(() => {
  //   if (isSignUpComplete) {
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 3000);
  //   }
  //   else if (!isValid) {
  //     router.push("/signup");
  //   }
  //  }, [isSignUpComplete]);

  const arr = [];
  for (let i = 0; i < data?.length; i++) {
    const e = data[i].lgaName;
    // console.log(e);
    arr.push(e);
  }

  const handleCheckbocClick = (event) => {
    setWalletValue(event.target.checked ? 1 : 0);
  };

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }
  return (
    <>
      <>
        <form
          onSubmit={handleSubmit(SubmitHandler)}
          autoComplete="off"
          className="px-4"
        >
          <div className="w-full p-1">
            <CenteredForm
              title="Enter your details to proceed signup"
              subtitle="Proceed Sign up"
            >
              <Input
                name={"kgtin"}
                ref={register({ minLength: 10, maxLength: 10 })}
                label={<TbCreditCard />}
                autoComplete="off"
                required
                placeholder="Tax Id"
                value={taxId}
                type="text"
                readOnly
              />
              {errors.kgtin && errors.kgtin.type === "minLength" && (
                <p className="text-emerald-600">
                  ILIDNumber or TIN must be 10 digits
                </p>
              )}
              {errors.kgtin && errors.kgtin.type === "maxLength" && (
                <p className="text-emerald-600">
                  ILIDNumber or TIN must be 10 digits
                </p>
              )}

              <Input
                name={"tp_name"}
                label={<TbCreditCard />}
                autoComplete="off"
                required
                placeholder="Tax payer Name"
                type="text"
                value={`${taxPayerName}`}
                readOnly
              />

              <div>
                <Input
                  name={"bvn"}
                  ref={register({
                    minLength: 11,
                    maxLength: 11,
                    pattern: {
                      value: /^[0-9]*[.]?[0-9]*$/,
                      message: "BVN must be a number",
                    },
                  })}
                  label={<TbCreditCard />}
                  autoComplete="off"
                  required
                  placeholder="Enter BVN"
                  type="Number"
                />
                {errors.bvn && errors.bvn.type === "minLength" && (
                  <p className="text-emerald-600">BVN must be 11 digits</p>
                )}
                {errors.bvn && errors.bvn.type === "maxLength" && (
                  <p className="text-emerald-600">BVN must be 11 digits</p>
                )}
                {errors.bvn && (
                  <p className="text-emerald-600 bg-white">
                    {errors.bvn.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  name={"phone"}
                  ref={register({
                    minLength: 11,
                    maxLength: 11,
                    pattern: {
                      value: /^[0-9]*[.]?[0-9]*$/,
                      message: "Phone Number must be a number",
                    },
                  })}
                  label={<TbPhoneCheck />}
                  autoComplete="off"
                  required
                  placeholder="Enter Phone Number"
                  // disabled={enableInput}
                  type="Number"
                />
                {errors.phone && errors.phone.type === "minLength" && (
                  <p className="text-emerald-600">
                    Phone Number must be 11 digits
                  </p>
                )}
                {errors.phone && errors.phone.type === "maxLength" && (
                  <p className="text-emerald-600">
                    Phone Number must be 11 digits
                  </p>
                )}
                {errors.phone && (
                  <p className="text-emerald-600 bg-white">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  name={"email"}
                  ref={register({
                    pattern: {
                      value:
                        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
                      message: "Enter a valid email",
                    },
                  })}
                  label={<MdOutlineAlternateEmail />}
                  autoComplete="off"
                  required
                  placeholder="Enter email address"
                  // type="email"
                />

                {/* {errors.email && errors.email.type === "minLength" && (
                    <p className="text-emerald-600">email must be 3 digits</p>
                  )}
                  {errors.email && errors.email.type === "maxLength" && (
                    <p className="text-emerald-600">email must be less 30 digits</p>
                  )}
                  {errors.email && (
                    <p className="text-emerald-600 bg-white">
                      {errors.email.message}
                    </p>
                  )} */}
              </div>

              <Input
                name={"tp_token"}
                label={<MdPassword />}
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
              {errors.tp_token && errors.tp_token.type === "minLength" && (
                <p className="text-emerald-600">Token must be 6 digits</p>
              )}
              {errors.tp_token && errors.tp_token.type === "maxLength" && (
                <p className="text-emerald-600">Token must be 6 digits</p>
              )}
              {errors.tp_token && (
                <p className="text-emerald-600 bg-white">
                  {errors.tp_token.message}
                </p>
              )}
              <div className="w-full mb-4">
                <TbWorldCheck className="absolute mt-2 borde z-1 text-2xl text-gray-500 mx-3" />
                <select
                  // onChange={filterItem}
                  required
                  ref={register({ required: true })}
                  name="lga"
                  className="relative pl-12 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option value="">Select LGA </option>
                  {lga.map((item) => (
                    <option key={item.lgaID} value={item.lgaID}>
                      {item.lgaName}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                name={"password"}
                type="password"
                label={<TbLockCheck />}
                autoComplete="off"
                required
                placeholder="Enter Password"
                usePasswordIcon
                ref={register({
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
              <Input
                name={"confPassword"}
                type="password"
                label={<TbLockCheck />}
                autoComplete="off"
                required
                placeholder="Enter Password again"
                usePasswordIcon
                ref={register({
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.confPassword && (
                <p className="text-emerald-500">
                  {errors.confPassword.message}
                </p>
              )}

              {/* <div className="">
                <ReCAPTCHA
                  sitekey="6Lcm5DEoAAAAACu3aMDhOCy-exGdoem7QZ7k-FFq"
                  ref={recaptchaRef}
                  onChange={handleCaptchaSubmission}
                />
              </div> */}

              <div>
                <input
                  id="createWallet"
                  name="createWallet"
                  type="checkbox"
                  ref={register()}
                  onChange={handleCheckbocClick}
                  checked={walletValue === 1}
                  // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                />
                <label htmlFor="createWallet" className="text-gray-700">
                  Create Wallet for me
                </label>
                {/* {errors2?.password && (
                <span className="text-emerald-500">password is required</span>
              )} */}
              </div>

              <div className="mt-4 ">
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

              {/* <div className="mt-4">
              <p>
                Didn't get a token?
                <button
                  className="text-green-500 ml-1"
                  type="button"
                  onClick={() => dispatch(resendToken({ taxId }))}
                >
                  {`${resendingToken ? "Resending..." : "Resend"}`}
                </button>
              </p>
            </div> */}
            </CenteredForm>
          </div>
        </form>
      </>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default AuthForm;
