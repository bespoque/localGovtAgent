import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../FormInput/formInputs";
import CustomButton from "../CustomButton/CustomButton";
import Loader from "react-loader-spinner";
import UseFetcher from "../fetcher/useFetcher";
import { useRouter } from "next/router";
import url from "../../config/url";
import CenteredForm from "../../layouts/centered-form";
import axios from "axios";
import { PopupModals } from "../modals/Modal";
import { verifyCaptcha } from "../reCAPTCHA/ServerActions";
import { TbCreditCard } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { HiArrowLeft } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DownloadReceipt = () => {
  const [email, setEmail] = useState("");
  const [bvn, setBvn] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [popup, setPopup] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const SubmitHandler = async (data) => {
    console.log(data, "DATA ENTERING THE ENDPOINT");
    try {
      setSubmitting(true);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBvnChange = (e) => {
    setBvn(e.target.value);
  };

  console.log("INFO");
  return (
    <>
      {showAlert && (
        <PopupModals
          title="Agent Registration"
          message={popup}
          onClick={handleCloseAlert}
        />
      )}

      <form onSubmit={handleSubmit(SubmitHandler)} autoComplete="off">
        {/* <form autoComplete="on"> */}
        <div className="w-full bg-white p-8 rounded-lg">
          <CenteredForm
            subtitle="Download Registration Slip"
            title="Enter BVN and email to download registration slip"
          >
            <div className="mt-3">
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
                  onChange={handleEmailChange}
                  label={<MdOutlineAlternateEmail />}
                  autoComplete="off"
                  required
                  placeholder="Enter email address"
                  type="email"
                />
              </div>

              <div className="mt-4">
                <Input
                  name={"bvn"}
                  ref={register({
                    minLength: 11,
                    maxLength: 11,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "BVN must be a number",
                    },
                  })}
                  onChange={handleBvnChange}
                  label={<TbCreditCard />}
                  autoComplete="off"
                  required
                  placeholder="Enter BVN"
                  type="text"
                />
              </div>
            </div>

            <a
              className="text-black font-semibold text-white bg-emerald-500 rounded p-3 md:py-3 md:px-12  border text-center"
              href={`${url.BASE_URL}agent?bvn=${encodeURIComponent(
                bvn
              )}&email=${encodeURIComponent(email)}&source=pdf`}
              target="_blank"
              disabled={submitting}
            >
              <div className="flex justify-center">
                <p>{`${
                  submitting ? "Downloading Slip..." : "Download Slip"
                }`}</p>
                <Loader
                  visible={submitting}
                  type="TailSpin"
                  color="pink"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                />
              </div>
            </a>
            <a
              href="/"
              className="w-full flex items-center justify-center my-4  text-emerald-600 space-x-2 cursor-pointer"
            >
              <HiArrowLeft className="text-xl" />

              <span className="font-bold">Go back</span>
            </a>
          </CenteredForm>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default DownloadReceipt;
