import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import axios from "axios";
import Loader from "react-loader-spinner";
import { SubmitButton } from "../CustomButton/CustomButton";
import url from "../../config/url";
import { useRouter } from "next/router";
import { formatNumber } from "../../functions/numbers";
import Spinner from "../spiner";
import { v4 as uuidv4 } from "uuid";
import { taxStation } from "../../json/taxOffice";
import UseFetcher from "../fetcher/useFetcher";
import { saveAs } from "file-saver";

import { RiInformationLine } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { BiMessageSquareCheck } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdClose } from "react-icons/md";
const CreateWalletForm = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  let { data, isLoading, isError } = UseFetcher(
    `${url.BASE_URL}user/new-payment`
  );

  data = data?.data?.data;

  const [modalData, setModalData] = useState(() => []);

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://newwebpay.interswitchng.com/inline-checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 1000000)
      .toString()
      .slice(-6);
    const timestamp = date.getTime().toString();
    const newRef = parseInt(randomNum) + timestamp;
    setNewGlobalRef(String(newRef).slice(0, -5));
    const parsedTimestamp = parseInt(timestamp).toString().substring(0, 10);
    setGlobalAssId(String(`FA-${parsedTimestamp}`));
    fetchWalletBalnce();
  }, []);

  const handleModalOpen = (url) => {
    setIsModalOpen(true);
    setModalUrl(url);
  };

  const revenueItemRef = useRef();

  const Modal = ({ isOpen, url }) => {
    return (
      <>
        {isOpen && (
          <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <iframe
              src={url}
              className="w-full h-full lg:h-100vw border-0"
            ></iframe>
          </div>
        )}
      </>
    );
  };

  const mySet = new Set();
  for (let i = 0; i < data?.revenueSub.length; i++) {
    const e = data.revenueSub[i];
    mySet.add(e.mda);
  }

  let dataArray;
  if (data) {
    dataArray = data.revenueSub;
  }
  let arr = [...mySet];
  const filterItem = (e) => {
    let da = e.target.value;
    setSelectedItem(da);
    setShowItem(da !== "");
    setSelectedItem("");
    const itemName = data.revenueSub.filter((md) => md.mda === da);
    setItem(() => itemName);

    const filteredChannel = channel.filter(
      (channel) => channel.key !== "Remita"
    );
    if (da !== "INTERNAL REVENUE SERVICE") {
      setChannel(filteredChannel);
    } else {
      setChannel(() => [
        ...filteredChannel,
        { key: "Remita", value: "Remita" },
      ]);
    }
  };

  const fetchWalletBalnce = async () => {
    // setAuthToken()
    try {
      const response = await axios.post(`${url.BASE_URL}wallet/balance`);
      setWalletBalance(response.data.balance);
    } catch (error) {}
  };

  const paymentCallback = async (response) => {
    console.log("interswitch");
    response.src = "interswitch";
    console.log(response);
    if (
      response.resp === "00" ||
      response.resp === "10" ||
      response.resp === "11"
    ) {
      const updatePayment = await axios.put(
        `${url.BASE_URL}user/update-transaction-status/`,
        response,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (updatePayment.data.status) {
        window.location.replace(`/receipt/${updatePayment.data.payment_ref}`);
      }
    } else {
      setLoading(false);
      setLoadingState("Payment Generated");
      window.location = `/pending-payment/${response.txnref}`;
    }
  };

  //get bank print
  const fetchBankPrint = async (newGlobalRef) => {
    try {
      const res = await axios.get(
        `${url.BASE_URL}user/bank-print/${newGlobalRef}`,
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([res.data], { type: "application/pdf" });
      saveAs(pdfBlob, `${newGlobalRef}__bankPrint.pdf`);
      setLoading(false);
      setLoadingState("");
      setPdfMessage(
        "Pdf successfully generated. Tender this at the bank to process payment"
      );
      setTimeout(() => {
        setPdfMessage("");
        router.push("/payment/pending-invoice");
      }, 6000);
    } catch (err) {
      alert("Unable to generate pdf. Please try again");
      setLoading(false);
      setLoadingState("");
    }
  };

  //submit handler
  const SubmitHandler = (data) => {
    console.log("data", data);
    setLoading(false);
    setLoadingState("");

    const agency = data?.revenueItem?.split("/")[0];
    data.agency = agency;
    data.itemName = dataArray?.filter(
      (mda) => mda.rev_code === data.revenueItem
    )[0]?.item;
    let myArr = [];
    myArr.push(data);
    setModalData(() => myArr);
    show();
  };

  const submit = async (data) => {
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: url.CREDO_KEY,
      };
    } catch (e) {
      setLoading(false);
      setLoadingState("");
      console.log(e);
      if (e.response) {
        console.log(e.response);
      }
    }
  };

  return (
    <>
      {credoMsg && (
        <PopupModals
          title="Credo Initialaiization"
          message={credoMsg}
          onClick={handleCloseAlert}
        />
      )}

      <Modal isOpen={isModalOpen} url={modalUrl} />
      {isLoading && <Spinner />}
      <SectionTitle title="Wallets" subtitle="Create Wallet" />

      <Widget title="">
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
                  label="ILIDNumber ID"
                  readOnly={true}
                  required
                  ref={register}
                  name="KGTIN"
                  value={data?.taxPayerInfo?.state_id ?? ""}
                />
              </div>
              <div className="w-full lg:w-1/4 bg-gray">
                <NewFormInput
                  label="Name"
                  ref={register}
                  required
                  name="name"
                  value={data?.taxPayerInfo?.tp_name ?? ""}
                  readOnly={true}
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

      {open && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div className="modal show w-full">
            <div className="rounded-2xl">
              <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-8">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center">
                      <div className=" w-16">
                        <span className="h-12 w-12 bg-teal-100 text-white flex items-center justify-center rounded-full text-xl font-display font-bold">
                          <BiMessageSquareCheck className="text-3xl text-teal-500" />
                        </span>
                      </div>
                      <h1 className="text-lg mb-2 font-bold w-40 md:w-72">
                        {loadingState !== "Payment Generated" ? (
                          <span>Payment Confirmation</span>
                        ) : (
                          <span>Payment Generated</span>
                        )}
                      </h1>
                    </div>
                    <div className="flex justify-between items-center pl-8">
                      <button onClick={() => setOpen(false)}>
                        <MdClose className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  {pdfMessage && (
                    <div className="px-4">
                      <p className="border-l-2  border-green-500 p-1 text-green-500">
                        {pdfMessage}
                      </p>
                    </div>
                  )}
                </div>
                {loadingState !== "Payment Generated" ? (
                  <div className=" mx-5">
                    {modalData?.length > 0 &&
                      modalData.map((dat) => {
                        return (
                          <div key={uuidv4()}>
                            <div className="p-2 text-sm">
                              <section className="flex flex-col space-y-2 border-2 rounded-xl w-full shadow-md p-6 md:space-y-4 ">
                                <div className="flex justify-between">
                                  <p className="text-gray-500">ILIDNumber</p>
                                  <p className="font-bold">{dat.KGTIN}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Phone Number</p>
                                  <p className="font-bold">{dat.phoneNumber}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">email</p>
                                  <p className="font-bold">{dat.email}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Agency</p>
                                  <p className="font-bold">{dat.mda}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Revenue Item</p>
                                  <p className="font-bold">
                                    {dat.itemName || "-"}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Amount</p>
                                  <p className="font-bold">
                                    ₦{formatNumber(dat.amount)}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">Description</p>
                                  <p className="font-bold">{dat.description}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="text-gray-500">
                                    Payment Channel
                                  </p>
                                  <p className="font-bold">{dat.channel}</p>
                                </div>
                              </section>
                            </div>
                          </div>
                        );
                      })}
                    {walletError && (
                      <span className="text-emerald">{walletError}</span>
                    )}
                  </div>
                ) : (
                  <div>
                    <div key={uuidv4()}>
                      <div className="p-2 text-sm text-center">
                        Payment generated successfully
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-end px-8 py-8 dark:border-gray-700 border-solid rounded-b space-x-2">
                  {loadingState !== "Payment Generated" ? (
                    <SubmitButton
                      onClick={() => submit(modalData[0])}
                      disabled={loading}
                    >
                      {loadingState !== "" ? loadingState : "Confirm Payment"}
                      <Loader
                        visible={loading}
                        type="TailSpin"
                        color="white"
                        height={19}
                        width={19}
                        timeout={0}
                        className="ml-2"
                      />
                    </SubmitButton>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};
export default CreateWalletForm;
