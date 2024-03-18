import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Input from "../FormInput/formInputs";
import CustomButton from "../CustomButton/CustomButton";
import { useForm } from "react-hook-form";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  login,
  disableSubmitting,
} from "../../redux/authentication/auth.actions";
import { clearSignUp } from "../../redux/signup/signup.actions";
import { clearSignUpAuth } from "../../redux/signup-auth/signup-auth.actions";
import Loader from "react-loader-spinner";
import CenteredForm from "../../layouts/centered-form";
import { TbCreditCard, TbLockCheck } from "react-icons/tb";


const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //state
  const { submitting, auth, loginErrors, isValid, isSignUpComplete } =
    useSelector(
      (state) => ({
        submitting: state.authentication.submitting,
        auth: state.authentication.auth,
        loginErrors: state.authentication.loginErrors,
        isValid: state.signUp.isValid,
        isSignUpComplete: state.signUpAuth.isSignUpComplete,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(disableSubmitting());
    if (isValid) {
      dispatch(clearSignUp());
    }
    if (isSignUpComplete) {
      dispatch(clearSignUpAuth());
    }
    if (auth) {
      router.push("/dashboard");
    }
  }, [auth]);

  //hook form
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const SubmitHandler = (data) => {
      dispatch(login(data));
  };


  return (
    <form
      onSubmit={handleSubmit(SubmitHandler)}
      autoComplete="off"
      className="md:px-4"
    >
      <div className="w-full p-1">
        <CenteredForm title="Welcome back to KGTIN Portal" subtitle="Login">
          {loginErrors !== null && (
            <p className="text-red-500 shadow-md py-2 px-2 border-l-2 border-red-500">
              {loginErrors}
            </p>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <p className="text-red-600">KGTIN must be 10 digits</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-red-600">KGTIN must be numbers</p>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <p className="text-red-600">KGTIN must be 10 digits</p>
          )}
          {errors.email && (
            <p className="text-red-600 bg-white">{errors.email.message}</p>
          )}
          <Input
            name="email"
            label={<TbCreditCard />}
            ref={register({
              minLength: 10,
              maxLength: 10,
              pattern: {
                value: /^[0-9]*[.]?[0-9]*$/,
                message: "KGTIN must be a number",
              },
            })}
            autoComplete="off"
            type="number"
            required
            placeholder="Enter KGTIN"
          />

          <Input
            name="password"
            label={<TbLockCheck />}
            type="password"
            ref={register()}
            autoComplete="off"
            required
            placeholder="Password"
            usePasswordIcon
          />

          <div className="mt-2 justify-between">
            <CustomButton
              name="Login"
              type="Submit"
              disabled={submitting}
            >
              Login
              <Loader
                visible={submitting}
                type="TailSpin"
                color="pink"
                height={19}
                width={19}
                timeout={0}
                className="ml-2"
              />
            </CustomButton>
          </div>

          <div className="flex flex-col items-center justify-between mt-6">
            <div className="">
              <p>
                <Link legacyBehavior href="/reset-password">
                  <a className="text-emerald-600 font-bold underline">
                    Forgot password?
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </CenteredForm>
      </div>
    </form>
  );
};

export default LoginForm;
