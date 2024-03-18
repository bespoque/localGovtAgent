import React, { useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Input from "../FormInput/formInputs";
import { SubmitButton } from "../CustomButton/CustomButton";
import Loader from "react-loader-spinner";
import { useState } from "react";
import axios from "axios";
import url from "../../config/url";
import { SignUpPopupModals } from "../modals/Modal";
import CenteredForm from "../../layouts/centered-form";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbPhoneCheck } from "react-icons/tb";

const CreateNoIDAccount = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [apimessage, setApiMessage] = useState("");
  const [isFetching, setIsFetching] = useState(() => false);

  const [showAlert, setShowAlert] = useState(false);

  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (value) => {
    try {
      const response = await axios.post(
        `${url.BASE_URL}user/registration-link`,
        value
      );

      if (response?.data?.status === 200) {
        setSuccess(true);
      }
      setIsFetching(false);
      setShowAlert(true);
      setApiMessage(response?.data?.message);

      // const response = await axios.post('/api/upload', formData )}
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
    } catch (error) {}
  };
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="px-4"
      >
        <div className="w-full p-1">
          {/* <FormHeader text="Create your ILIDNumber without an ID" /> */}

          <CenteredForm
            title="Create KGTIN without an ID"
            subtitle="Create IKGTIN "
          >
            <Input
              label={<MdOutlineAlternateEmail />}
              ref={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="text"
              name="email"
              id="email"
              required
              className="peer block w-full border-2 bg-gray-50 py-2 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Enter Email"
            />

            <Input
              label={<TbPhoneCheck />}
              ref={register}
              type="number"
              name="phone"
              id="phone"
              required
              className="peer block w-full border-2 bg-gray-50 py-2 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="080 000 0000 000"
            />
            <div className="mt-2 justify-between ">
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
            <Link
              href="/create-account"
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
            </Link>
          </CenteredForm>
        </div>
      </form>

      {showAlert && (
        <SignUpPopupModals
          title="Proceed KGTIN Signup"
          message={apimessage}
          onClick={handleCloseAlert}
        />
      )}
    </>
  );
};

export default CreateNoIDAccount;
