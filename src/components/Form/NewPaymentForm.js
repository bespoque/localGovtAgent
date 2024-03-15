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
const NewPaymentForm = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  let { data, isLoading, isError } = UseFetcher(
    `${url.BASE_URL}user/new-payment`
  );

  data = data?.data?.data;

  const [modalData, setModalData] = useState(() => []);
  const [channel, setChannel] = useState([
    // { key: "Credo", value: "Credo" },
    { key: "Bank", value: "Bank" },
    { key: "Interswitch Webpay", value: "Interswitch Webpay" },
    { key: "Wallet", value: "Wallet" },
    // { key: "USSD", value: "USSD" }
  ]);
  const [ussdAmount, setUssdAmount] = useState("");

  const [loadingState, setLoadingState] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfMessage, setPdfMessage] = useState("");
  const [item, setItem] = useState(() => []);
  const [showItem, setShowItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [open, setOpen] = useState(false);
  const [globalAssId, setGlobalAssId] = useState(() => "");
  const [newGlobalRef, setNewGlobalRef] = useState(() => "");
  const [modalUrl, setModalUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [credoMsg, setCredoMsg] = useState("");
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [walletBalance, setWalletBalance] = useState();
  const [walletError, setWalletError] = useState(null);

  const handleCloseAlert = () => {
    setShowAlert(!showAlert);
  };

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  const urlNew = "https://bespoque.dev/quickpay-live/";

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
    // fetchWalletBalnce();
  }, []);

  useEffect(() => {
    if (parseFloat(ussdAmount) < 20000) {
      setChannel((prevChannel) => [
        ...prevChannel,
        { key: "USSD", value: "USSD" },
      ]);
    } else {
      setChannel((prevChannel) =>
        prevChannel.filter((channel) => channel.key !== "USSD")
      );
    }
  }, [ussdAmount]);

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
    if (parseFloat(data?.amount) < 100) {
      toast.error("Amount must be at least 100", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setLoading(false);
    setLoadingState("");
    setLoadingState("Submitting...");
    setLoading(true);
    let rev = data?.revenueItem?.split("-");
    let formData = {};
    formData.fullName = data?.name;
    formData.emailAddress = data?.email;
    formData.phoneNumber = data?.phoneNumber;
    formData.station = data?.taxOffice;
    formData.amount = data?.amount;
    formData.channel = data?.channel;
    formData.ILIDNumber = data?.KGTIN;
    formData.revenue_item = data?.revenueItem;
    formData.ministry_agency = rev[0];
    formData.year = new Date().getFullYear();
    formData.description = data?.description;
    // formData.paymentRef = newGlobalRef;
    // formData.assessment_id = globalAssId
    formData.paymentgateway = data?.channel;
    formData.paygatewayclient = data?.channel;

    // console.log(formData)

    const queryParams = new URLSearchParams(formData).toString();
    try {
      let headers = {
        "Content-Type": "application/json",
        Authorization: url.CREDO_KEY,
      };

      if (paymentRef == "") {
        const res = await axios.post(
          `${url.BASE_URL}payment/new-payment`,
          formData,
          headers
        );
        if (res.status) {
          let paymentData = {
            amount: Number(data.amount) * 100,
            currency: "NGN",
            reference: res.data.payment_ref,
            callbackUrl: `${url.URL}/payment-complete`,
            email: data.email,
          };

          if (data.channel == "Credo") {
            const rst = await axios.post(
              `${url.CREDO_URL}/transaction/initialize`,
              paymentData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: url.CREDO_KEY,
                },
              }
            );

            if (rst.data.status == 200) {
              window.location.replace(rst.data.data.authorizationUrl);
              // window.location = `/pending-payment/${res.data.payment_ref}`
              setLoading(false);
              setLoadingState("Payment Generated");
            }

            if (rst.data.status !== 200) {
              setShowAlert(true);
              setCredoMsg(rst.data.error.amount);
            }
          }

          if (data.channel === "Interswitch Webpay") {
            setLoading(false);
            setLoadingState("Confirm Payment");
            setPaymentRef(res.data.payment_ref);
            var samplePaymentRequest = {
              merchant_code: "MX79048",
              pay_item_id: "Default_Payable_MX79048",
              txn_ref: res.data.payment_ref,
              amount: Number(data.amount) * 100,
              currency: 566, // ISO 4217 numeric code of the currency used
              onComplete: paymentCallback,
              site_redirect_url: "http://localhost:3000/complete",
              mode: "TEST",
            };

            window.webpayCheckout(samplePaymentRequest);
          }

          if (data.channel == "Bank" || data.channel == "USSD") {
            setLoading(false);
            setLoadingState("Payment Generated");
            window.location = `/pending-payment/${res.data.payment_ref}`;
          }

          if (data.channel === "Wallet") {
            setLoading(false);
            setLoadingState("Confirm Payment");

            const body = {
              amount: Number(data.amount),
              payment_ref: res.data.payment_ref,
            };
            try {
              const response = await axios.post(
                `${url.BASE_URL}wallet/make-payment`,
                body
              );
              console.log(response.data);
              if (response.status == 200) {
                // toast.success(response.data.message, { position: toast.POSITION.TOP_CENTER })
                setLoadingState(response.data.message);
                window.location = `/receipt/${res.data.payment_ref}`;
              }
            } catch (error) {
              setWalletError(error.response.data.message.amount);
              toast.error(walletError, { position: toast.POSITION.TOP_CENTER });
            }
          }
        }
      } else {
        if (data.channel == "Interswitch Webpay") {
          setLoading(false);
          setLoadingState("Comfirm Payment");
          let samplePaymentRequest = {
            merchant_code: "MX79048",
            pay_item_id: "9405967",
            txn_ref: paymentRef,
            amount: Number(data.amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3000/complete",
            mode: "TEST",
          };

          window.webpayCheckout(samplePaymentRequest);
        }
      }
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
      <SectionTitle title="Make Payment" subtitle="New Payment" />

      <Widget
        title=""
        // description={
        //   <span>
        //     Note that all fields with asterisk (
        //     <span className="text-emerald-500">*</span>) must be completed
        //   </span>
        // }
      >
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
              <div className=" bg-gray w-full lg:w-1/4">
                <NewFormInput
                  label="Phone Number"
                  ref={register({
                    minLength: 10,
                    maxLength: 11,
                  })}
                  required
                  name="phoneNumber"
                  value={data?.taxPayerInfo?.phone_number ?? ""}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
              <div className="w-full lg:w-1/4">
                <NewFormInput
                  label="Taxpayer Type"
                  required
                  ref={register}
                  value={data?.taxPayerInfo?.tp_type ?? ""}
                  name="taxPayerType"
                  readOnly={true}
                />
              </div>

              <div className="w-full lg:w-1/4">
                <NewFormInput
                  label="Email Address"
                  required
                  ref={register}
                  value={data?.taxPayerInfo?.email?.trim() ?? ""}
                  name="email"
                  readOnly={true}
                />
                {errors.email && (
                  <p className="text-emerald-600">{errors.email.message}</p>
                )}
              </div>
              <div className="w-full lg:w-1/4">
                <NewFormInput
                  label="Residential Address"
                  required
                  ref={register}
                  value={`${
                    data?.taxPayerInfo?.address?.substr(0, 44) ?? ""
                  }...`}
                  name="address"
                  readOnly={true}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-8 "></div>
          </div>
          <div className="mt-10">
            <h1 className="text-base mt-2 mb-4 font-semibold">
              Payment Information
            </h1>
            <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
              <div className="w-full lg:w-1/4 mt-5 md:mt-0">
                <label
                  htmlFor="mda"
                  className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                >
                  MDA
                </label>
                <select
                  onChange={filterItem}
                  required
                  ref={register({ required: true })}
                  name="mda"
                  className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                >
                  <option defaultValue>Select MDA</option>
                  {arr.map((md, i) => (
                    <option value={md} key={i}>
                      {md}
                    </option>
                  ))}
                </select>
              </div>
              {showItem && (
                <div className="w-full lg:w-1/4 mt-5 md:-mt-2">
                  <label
                    htmlFor="revenueItem"
                    className="block mb-2 mt-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Revenue Item
                  </label>
                  <select
                    ref={(e) => {
                      // Register the field as required when it's rendered
                      register(e, { required: true });
                      revenueItemRef.current = e;
                    }}
                    required
                    // ref={register({ required: true })}
                    name="revenueItem"
                    className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  >
                    <option value="Select Item">Select Item</option>
                    {item.map((item, i) => (
                      <option value={item.rev_code} key={item.serial}>
                        {item.item}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="w-full lg:w-1/4 mt-5 md:mt-0">
                <NewFormInput
                  label="Tax Office"
                  ref={register}
                  name="taxOffice"
                  value={data?.taxPayerInfo?.tax_office ?? ""}
                  readOnly={true}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
            <div className="w-full lg:w-1/4">
              <NewFormInput
                label="Amount"
                required
                ref={register({
                  // minLength: 4,
                  pattern: {
                    value: /^[0-9]*[.]?[0-9]*$/,
                    message: "Amount must be a number",
                  },
                  pattern: {
                    value: /^(100|[1-9]\d{2,})$/, // Amount must be 100 or greater
                    message: "Amount must be at least 100",
                  },
                })}
                name="amount"
                placeholder="Enter Amount"
                onChange={(e) => setUssdAmount(e.target.value)}
              />
              {/* {errors.amount && errors.amount.type === "minLength" && (
                <p className="text-emerald-600">
                  Amount cannot be less than {formatNumber(1000)}
                </p>
              )} */}
              {errors.amount && (
                <p className="text-emerald-600 bg-white">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <div className="w-full lg:w-1/4">
              <NewFormInput
                label="Description"
                required
                ref={register()}
                name="description"
                placeholder="Enter Description"
              />
            </div>

            <div className="w-full lg:w-1/4 mb-5 md:mb-0">
              <label
                hmtlfor="revenueItem"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Payment Channel
              </label>
              <select
                required
                ref={register({ required: true })}
                name="channel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              >
                <option value="">Select Payment Channel</option>
                {channel.map((channel) => (
                  <option value={channel.value} key={channel.key}>
                    {channel.key}
                  </option>
                ))}
                {/* <option value={'USSD'} key={'USSD'}>USSD</option> */}
              </select>
            </div>
          </div>
          {formState.isValid}
          <SubmitButton text="Make Payment" disabled={!formState.isValid}>
            Make Payment
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

                  {/* {loadingState !== "Payment Generated" ? (
                    <button
                      className="disabled:cursor-not-allowed btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                      type="button"
                      onClick={hide}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="disabled:cursor-not-allowed btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                      type="button"
                      onClick={hide}
                    >
                      Close
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <button
        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleModalOpen}
      >
        Open Modal
      </button> */}
      <ToastContainer />
    </>
  );
};
export default NewPaymentForm;
