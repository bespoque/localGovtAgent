import React, { useState, useRef } from "react";
import { FormHeader } from "../FormHeader/FormHeader";
import CustomButton from "../CustomButton/CustomButton";
import Link from "next/link";
import setAuthToken from "../../functions/setAuthToken";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "../../config/url";
import UserDetails from "./userDetails";
import { useRouter } from "next/router";
import CenteredForm from "../../layouts/centered-form";
import { toast, ToastContainer } from "react-toastify";

const AbssinRegistration = () => {
  const { register, handleSubmit, error, watch } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const numInputs = 6;
  const [verificationCodes, setVerificationCodes] = useState(
    Array(numInputs).fill("")
  );
  const [code, setCode] = useState();
  const [userDetails, setUserDetails] = useState();
  const [userId, setUserId] = useState();
  const [codeError, setCodeError] = useState(null);
  const [state, setState] = useState({
    email: "",
    phone: "",
    id: 0,
  });

  const inputRefs = useRef([]);
  const router = useRouter();

  const handleCodeChange = (index, value) => {
    console.log("value", value);

    const newCodes = [...verificationCodes];
    newCodes[index] = value;
    const result = newCodes.join("");
    setCode(result);
    setVerificationCodes(result);

    if (value.length === 1 && index < numInputs - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleDelete = (index) => {
    const updatedCodes = [...verificationCodes];
    updatedCodes[index] = "";
    setVerificationCodes(updatedCodes);
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleKeyPress = (index, e) => {
    console.log("key", index);
    if (e.key === "Backspace" && index > 0 && verificationCodes[index] === "") {
      if (index > 0) {
        handleDelete(index - 1);
      }
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = async () => {
    setAuthToken();
    try {
      const response = await axios.post(`${url.BASE_URL}agent/verify-token`, {
        code: code,
      });
      let userData = response.data.data;
      setUserDetails(userData);
      let data = response.data.data.id;

      setUserId(data);
      router.push({
        pathname: "/agent-signup",
        query: userData,
      });
    } catch (error) {
      setCodeError(error?.response?.data?.message?.code);
      setCode("");
    }
  };

  const resendOTP = async () => {
    try {
      console.log("data");
      await axios.post(`${url.BASE_URL}user/registration-link`, {
        email: state.email,
        phone: state.phone,
        id: state.id,
      });
    } catch (error) {
      console.log(error, "error");
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER,
      });
      // toast.error(error || "An error occurred");
    }
  };

  return (
    <div className="w-full">
      <CenteredForm
        subtitle="Email Verification"
        title="Enter the code sent to your number"
      >
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-6 mx-2">
            <div className="flex flex-col space-y-16">
              <div className="grid grid-cols-6 w-full mt-8 ">
                {Array.from({ length: numInputs }, (_, index) => (
                  <div className="w-14 h-14 border-white border-2" key={index}>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="w-full h-full flex items-center justify-center text-center px-4 outline-none rounded-lg border-2 border-gray-300 text-lg bg-white focus:bg-gray-50 focus:border-emerald-500 ring-emerald-400"
                      type="text"
                      name="code"
                      maxLength={1}
                      value={verificationCodes[index] ? "•" : ""}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyPress(index, e)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {codeError && <p className="text-emerald-600">{codeError}</p>}
            <div className="">
              {/* <Link legacyBehavior href='/userDetails'> */}
              <CustomButton>Verify BVN</CustomButton>
              {/* </Link> */}
            </div>
          </div>
        </form>
        {/* 
      {userDetails && (
        <UserDetails userId={id}/>
        )
      } */}

        {/* <button
          onClick={resendOTP}
          className="flex justify-center text-center text-sm font-medium space-x-1 text-gray-500 my-4"
        >
          <p>Didn't receive the code?</p>{" "}
          <button className="flex flex-row items-center text-emerald-600 font-bold">
            Resend
          </button>
        </button> */}
      </CenteredForm>
    </div>
  );
};

export default AbssinRegistration;
