import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
// import Spinner from "../../../components/spiner";
import url from "../../../config/url";
// import UseFetcher from "../../../components/fetcher/useFetcher";
import axios from "axios";
import SectionTitle from "../../../components/section-title";
import { NewFormInput } from "../../../components/FormInput/formInputs";
import { SubmitButton } from "../../../components/CustomButton/CustomButton";
import Widget from "../../../components/widget";
import UseFetcher from "../../../components/fetcher/useFetcher";
import { toast, ToastContainer } from "react-toastify";
import { RiInformationLine } from "react-icons/ri";

const CreateWallet = ({ state, setState }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const SubmitHandler = async (data) => {
    console.log("data", data);

    try {
      const response = await axios.post(`${url.BASE_URL}wallet/create-wallet`, data);
      console.log("response", response?.data?.message)
      toast.success(response?.data?.message)
      setState((prev) => {
        return {
          ...prev,
          openExistingWallet: true
        }
      })

    } catch(error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {/* <CreateWalletForm/> */}
      <SectionTitle title="Wallets" subtitle="Create Wallet" />
      <Widget>
        <form onSubmit={handleSubmit(SubmitHandler)} className="p-3 md:p-12">
          <div>
            <div className="mt-3 mb-8">
              <h1 className="text-xl font-bold flex items-center">
                <RiInformationLine className="mr-2" /> Personal Information
              </h1>
              <p>
                Kindly ensure that all the information provided are accurate and
                true.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
              <div className="w-full lg:w-1/4">
                <NewFormInput
                  label="BVN"
                  required
                  ref={register}
                  name="bvn"
                  placeholder="Enter BVN number"
                  //   value={data?.taxPayerInfo?.state_id ?? ""}
                  //   readOnly={true}
                />
              </div>
              <div className="w-full lg:w-1/4 bg-gray">
                <NewFormInput
                  label="phone"
                  ref={register}
                  required
                  name="phone"
                  placeholder="Enter phone number"
                  //   value={data?.taxPayerInfo?.tp_name ?? ""}
                  //   readOnly={true}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-8 "></div>
          </div>

          {formState.isValid}
          <SubmitButton text="Make Payment" disabled={!formState.isValid}>
            Create Wallet
          </SubmitButton>
        </form>
      </Widget>
      <ToastContainer />
    </div>
  );
};

export default CreateWallet;
