import React, { useState, useEffect, useRef } from "react";
import url from "../../config/url";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "../FormInput/formInputs";
import Loader from "react-loader-spinner";
import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { SubmitButton } from "../CustomButton/CustomButton";
import { FiSend } from "react-icons/fi";
import { formatNumber } from "accounting";
import { TbCreditCard } from "react-icons/tb";
import CustomButton from "../CustomButton/CustomButton";
import { VscReferences, VscCreditCard, VscGoToFile } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
// import AbiaLogo from "./../../pages/receipt/AbiaLogo.jpeg";
import dateformat from "dateformat";
import Image from "next/image";
import { Link } from "heroicons-react";
// import CenteredForm

const InstantPaymentForm = () => {
  // const navigate = useNavigate()
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  let ref = router.query;

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://newwebpay.interswitchng.com/inline-checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [state, setState] = useState({
    errormsg: null,
    viewMethods: true,
    method: "",
    paymentRefDetails: {
      payment_ref: "",
      phone_number: "",
      taxpayer_name: "",
      taxpayer_phone: "",
      taxpayer_type: "",
      revenue_item: "",
      amount: "",
      receipt_id: "",
      creation_date: "",
      agency: "",
      payment_channel: "",
      status: "",
    },
  });

  const [errormsg, setErrormsg] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [selectedItem, setSelectedItem] = useState("");
  const [showItem, setShowItem] = useState(false);
  const [item, setItem] = useState(() => []);
  const [modalData, setModalData] = useState(() => []);
  const [loadingState, setLoadingState] = useState("");
  const [pdfMessage, setPdfMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [receiptId, setReceiptID] = useState(null);

  const [channel, setChannel] = useState([
    // { key: "Credo", value: "Credo" },
    // { key: "Bank", value: "Bank" },
    { key: "Interswitch Webpay", value: "Interswitch Webpay" },
  ]);

  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handleAmountChange = (e) => {
    setSelectedAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://newwebpay.interswitchng.com/inline-checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchUser = async (id) => {
    setLoading(true);

    if (state.method == "ILID") {
      try {
        const response = await axios.post(
          `${url.BASE_URL}payment/user-payment`,
          {
            state_id: id.id,
          }
        );
        console.log("response", response);
        setUserDetails(response.data.data);
        setLoading(false);
        setLoggedIn(true);
      } catch (error) {
        if (error?.response?.data?.message?.state_id == "state_id is invalid") {
          setErrormsg("Incorrect ILID, Kindly enter a valid ILID");
        }
      }
    } else if (state?.method == "Payment Reference") {
      try {
        let response = await axios.post(`${url.BASE_URL}payment/payment-ref`, {
          payment_ref: id.id,
        });

        console.log("PAYMENT-REF RESPONSE", response.data?.response_message);

        response = response.data;
        if (response?.response_message === "Payment reference not found") {
          setState((prev) => {
            return {
              ...prev,
              errormsg: response?.response_message,
            };
          });
        } else {
          setState((prev) => {
            return {
              ...prev,
              paymentRefDetails: {
                payment_ref: id.id,
                taxpayer_name: response?.taxpayer_name,
                taxpayer_phone: response?.taxpayer_phone,
                revenue_item: response?.revenue_item,
                amount: response?.amount,
              },
            };
          });
          setLoggedIn(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (
          error?.response?.data?.message?.payment_ref ==
          "payment_ref is invalid"
        ) {
          setErrormsg("Incorrect ILID, Kindly enter a valid ILID");
        }
      }
    } else if (state?.method == "Download") {
      try {
        let response = await axios.get(
          `${url.BASE_URL}user/user-receipt-reference?id=${id.id}`
        );
        response = response.data?.body;
        console.log(response, "DOWNLOAD RESPONSE");
        setState((prev) => {
          return {
            ...prev,
            paymentRefDetails: {
              payment_ref: id.id,
              taxpayer_name: response?.payer_details?.taxpayer_name,
              taxpayer_phone: response?.payer_details?.taxpayer_phone,
              revenue_item: response?.payer_details?.revenue_item,
              amount: response?.payment_details?.amount,
              receipt_id: response?.payment_details?.receipt_id,
              creation_date: response?.payment_details?.creation_date,
              agency: response?.payment_details?.agency,
              payment_channel: response?.payment_details?.payment_channel,
              status: response?.payment_details?.status,
            },
          };
        });
        setLoading(false);
        setLoggedIn(true);
      } catch (error) {
        setLoading(false);
        if (
          error?.response?.data?.message?.payment_ref ==
          "payment_ref is invalid"
        ) {
          setErrormsg("Incorrect ILID, Kindly enter a valid ILID");
        }
      }
    }
  };

  const mySet = new Set();
  for (let i = 0; i < userDetails?.revenueSub.length; i++) {
    const e = userDetails.revenueSub[i];
    mySet.add(e.mda, e.id);
  }

  let dataArray;
  if (userDetails) {
    dataArray = userDetails.revenueSub;
  }
  let arr = [...mySet];

  const filterItem = (e) => {
    let da = e.target.value;
    setSelectedItem(da);
    setShowItem(da !== "");
    setSelectedItem("");
    const itemName = userDetails.revenueSub.filter((md) => md.mda === da);
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

  const checkAmount = () => {};

  const SubmitHandler = (data) => {
    console.log("data", data);
    if (state?.mode == "Payment Reference") {
      setLoading(false);
      setLoadingState("");
      const agency = data.revenue_item.split("/")[0];
      data.agency = agency;
      data.itemName = dataArray?.filter(
        (mda) => mda.rev_code === data.revenue_item
      )[0].item;
      let myArr = [];
      myArr.push(data);
      setModalData(() => myArr);
      show();
    }
  };

  const submit = async (data) => {
    console.log("data", data);
    setLoading(false);

    setLoadingState("");
    let rev = data.revenue_item.split("-");

    let formData = {
      // state_id: data.ILID,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      emailAddress: data.emailAddress,
      ministry_agency: rev[0],
      revenue_item: data.revenue_item,
      amount: data.amount,
      year: "2023",
      channel: data.channel,
      state_id: state?.paymentRefDetails?.payment_ref,
    };

    try {
      const res = await axios.get(
        `${url.BASE_URL}user/user-receipt-reference`,
        { params: { id: state?.paymentRefDetails?.payment_ref } }
      );

      // router.push(
      //   `https://rhmx.paytax.ng/index?recView=recView&mod=Collections&entity=showCollection&recId=${res.data.body.payment_details.receipt_id}`
      // );

      if (res.status) {
        console.log("res", res);
        let receiptData = [res.data.payment_ref, data.ILID];

        let paymentData = {
          amount: Number(data.amount) * 100,
          currency: "NGN",
          reference: res.data.payment_ref,
          callbackUrl: `${url.BASE_URL}/instant-payment-status/${receiptData}`,
          email: res.data.email,
        };

        //
        if (data.channel == "Interswitch Webpay") {
          console.log(
            "Interswitch got here",
            state?.paymentRefDetails?.payment_ref
          );
          setState((prev) => {
            return {
              ...prev,
              paymentRefDetails: {
                payment_ref: state?.paymentRefDetails?.payment_ref,
              },
            };
          });
          console.log("amount", data.amount);
          // setLoading(false);
          // setLoadingState("Comfirm Payment........");
          // setPaymentRef(res.data.payment_ref);
          let samplePaymentRequest = {
            merchant_code: url.INTERSWITCH_MERCHANT_CODE,
            pay_item_id: url.INTERSWITCH_PAY_ITEM_ID,
            txn_ref: state?.paymentRefDetails?.payment_ref,
            amount: Number(data.amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3100/complete",
            mode: "TEST",
            receipt_id: res.data.body.payment_details.receipt_id,
          };
          console.log("samplePaymentRequest", samplePaymentRequest);
          console.log(
            "RECEIPT ID-- THIS IS IT: ",
            res.data.body.payment_details.receipt_id
          );
          setState((prev) => {
            return {
              ...prev,
              paymentRefDetails: {
                receipt_id: res.data.body.payment_details.receipt_id,
              },
            };
          });
          setReceiptID(res.data.body.payment_details.receipt_id);
          window.webpayCheckout(samplePaymentRequest);
        }

        if (data.channel == "Interswitch Webpay") {
          console.log("Interswitch");
          setLoading(false);
          setLoadingState("Comfirm Payment........");
          setPaymentRef(res.data.payment_ref);
          let samplePaymentRequest = {
            merchant_code: url.INTERSWITCH_MERCHANT_CODE,
            pay_item_id: url.INTERSWITCH_PAY_ITEM_ID,
            txn_ref: res.data.payment_ref,
            amount: Number(data.amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3100/complete",
            mode: "TEST",
          };

          window.webpayCheckout(samplePaymentRequest);
        }

        if (data.channel == "Bank" || data.channel == "USSD") {
          setLoading(false);
          setLoadingState("Payment Generated");
          window.location = `/instant-payment-status/${receiptData}`;
        }
      } else {
        if (data.channel == "Interswitch Webpay") {
          setLoading(false);
          setLoadingState("Comfirm Payment");
          let samplePaymentRequest = {
            merchant_code: url.INTERSWITCH_MERCHANT_CODE,
            pay_item_id: url.INTERSWITCH_PAY_ITEM_ID,
            txn_ref: paymentRef,
            amount: Number(data.amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3100/complete",
            mode: "TEST",
          };

          window.webpayCheckout(samplePaymentRequest);
        }
      }
    } catch (e) {
      setLoading(false);
      setLoadingState("");
      if (e.response) {
      }
    }
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
      // const updatePayment = await axios.put(
      //   `${url.BASE_URL}user/update-transaction-status/`,
      //   response,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log("receiptID", state?.paymentRefDetails.receipt_id);
      // router.push(
      //   `https://rhmx.paytax.ng/index?recView=recView&mod=Collections&entity=showCollection&recId=${state?.paymentRefDetails.receipt_id}`
      // );
      // if (updatePayment.data.status) {
      //   window.location.replace(`${url.BASE_URL}/instant-payment-status/${receiptData}`);
      // }

      setLoggedIn(true);
      setState((prev) => {
        return {
          ...prev,
          method: "Download",
        };
      });

      try {
        let response = await axios.get(
          `${url.BASE_URL}user/user-receipt-reference?id=${state?.paymentRefDetails.payment_ref}`
        );
        response = response.data?.body;
        console.log(response, "DOWNLOAD RESPONSE");
        setState((prev) => {
          return {
            ...prev,
            paymentRefDetails: {
              payment_ref: state?.paymentRefDetails.payment_ref,
              taxpayer_name: response?.payer_details?.taxpayer_name,
              taxpayer_phone: response?.payer_details?.taxpayer_phone,
              revenue_item: response?.payer_details?.revenue_item,
              amount: response?.payment_details?.amount,
              receipt_id: response?.payment_details?.receipt_id,
              creation_date: response?.payment_details?.creation_date,
              agency: response?.payment_details?.agency,
              payment_channel: response?.payment_details?.payment_channel,
              status: response?.payment_details?.status,
            },
          };
        });
        setLoading(false);
        setLoggedIn(true);
      } catch (error) {
        setLoading(false);
        if (
          error?.response?.data?.message?.payment_ref ==
          "payment_ref is invalid"
        ) {
          setErrormsg("Incorrect ILID, Kindly enter a valid ILID");
        }
      }
    } else {
      setState((prev) => {
        return {
          ...prev,
          errormsg: response.desc,
        };
      });
      setLoading(false);
      setLoadingState("Payment Generated");

      console.log("STUCK HERE");
      // window.location = `/instant-payment`;
    }
  };

  return (
    <section className="">
      {!loggedIn && (
        <form
          onSubmit={handleSubmit2(fetchUser)}
          autoComplete="off"
          className=""
        >
          <div className="px-1 bg-white rounded-xl">
            {/* <CenteredForm 
              title="Enter your ILID to get started
            "
              subtitle="Make Instant Payment"
            > */}

            {state.viewMethods ? (
              <section className="grid grid-cols-1 md:grid-cols-2">
                {" "}
                <section className="space-y-3 px-8 md:border-r-2 border-gray-200">
                  {state.viewMethods && (
                    <div className="pt-4">
                      <SectionTitle
                        title="Choose Preferred "
                        subtitle="Instant Payment Method"
                      />
                      {errormsg && (
                        <p className="border-red-500 border-l-2 text-red-500 p-2">
                          <span className="">{errormsg}</span>
                        </p>
                      )}{" "}
                    </div>
                  )}
                  <div
                    onClick={() =>
                      setState((prev) => {
                        return {
                          ...prev,
                          method: "ILID",
                          viewMethods: false,
                        };
                      })
                    }
                    className="w-full cursor-pointer border-2 rounded-lg shadow-xl border-green-500 text-green-700 hover:bg-green-200 text-md font-bold px-3 py-4 flex items-center justify-between"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <VscCreditCard className="text-xl" />
                    </div>

                    <span className="w-4/5">I have my ILID</span>
                  </div>
                  <div
                    onClick={() =>
                      setState((prev) => {
                        return {
                          ...prev,
                          method: "Payment Reference",
                          viewMethods: false,
                        };
                      })
                    }
                    className="w-full cursor-pointer border-2 rounded-lg shadow-xl border-green-500 text-green-700 hover:bg-green-200 text-md font-bold px-3 py-4 flex items-center justify-between"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <VscReferences className="text-xl" />
                    </div>

                    <span className="w-4/5">I have my Payment Reference</span>
                  </div>
                </section>
                <section className="space-y-3 px-8">
                  {state.viewMethods && (
                    <div className="pt-4">
                      <SectionTitle
                        title="receipt "
                        subtitle="Download Receipt"
                      />
                      {errormsg && (
                        <p className="border-red-500 border-l-2 text-red-500 p-2">
                          <span className="">{errormsg}</span>
                        </p>
                      )}{" "}
                    </div>
                  )}{" "}
                  <div
                    onClick={() =>
                      setState((prev) => {
                        return {
                          ...prev,
                          method: "Download",
                          viewMethods: false,
                        };
                      })
                    }
                    className="w-full cursor-pointer border-2 rounded-lg shadow-xl border-green-500 text-green-700 hover:bg-green-200 text-md font-bold px-3 py-4 flex items-center justify-between"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <VscGoToFile className="text-xl" />
                    </div>

                    <span className="w-4/5">I want to download my Receipt</span>
                  </div>
                </section>
              </section>
            ) : state.method === "ILID" ? (
              <section className="w-80 p-4">
                <>
                  <SectionTitle
                    title="Make Instant Payment"
                    subtitle="Enter ILID Number"
                  />
                  {errormsg && (
                    <p className="border-red-500 border-l-2 text-red-500 p-2">
                      <span className="">{errormsg}</span>
                    </p>
                  )}{" "}
                </>
                <Input
                  name="id"
                  ref={register2({
                    minLength: 10,
                    maxLength: 10,
                    pattern: {
                      value: /^[0-9]*[.]?[0-9]*$/,
                      message: "ILID must be a number",
                    },
                  })}
                  label={<TbCreditCard />}
                  autoComplete="off"
                  required
                  placeholder="Enter Ibeju Lekki ID"
                  //  disabled={enableInput}
                  type="Number"
                />
                {errors2.id && errors2.id.type === "minLength" && (
                  <p className="text-red-600">ILID must be 10 digits</p>
                )}
                {errors2.id && errors2.id.type === "maxLength" && (
                  <p className="text-red-600">ILID must be 10 digits</p>
                )}
                {errors2.id && (
                  <p className="text-red-600 bg-white">{errors2.id.message}</p>
                )}
                <div className="mt-2 w-full">
                  <CustomButton name="Submit" type="submit">
                    Continue
                    <Loader
                      visible={loading}
                      type="TailSpin"
                      color="#00FA9A"
                      height={18}
                      width={18}
                      timeout={0}
                      className="ml-2"
                    />
                  </CustomButton>
                </div>
                <div
                  onClick={() => {
                    setLoading(false);
                    setState((prev) => {
                      return {
                        ...prev,
                        viewMethods: true,
                      };
                    });
                  }}
                  className="mt-3 w-full flex items-center justify-center mt-4  text-green-600 space-x-2 cursor-pointer"
                >
                  <IoMdArrowRoundBack className="text-2xl" />

                  <span className="font-bold">Go back</span>
                </div>
              </section>
            ) : state.method === "Payment Reference" ? (
              <section className="w-80 p-4">
                <>
                  <SectionTitle
                    title="Make Instant Payment"
                    subtitle="Enter Payment Reference"
                  />
                  {state?.errormsg && (
                    <p className="border-red-500 border-l-2 text-red-500 p-2">
                      <span className="">{state?.errormsg}</span>
                    </p>
                  )}{" "}
                </>{" "}
                <Input
                  name="id"
                  ref={register2({
                    minLength: 5,
                    maxLength: 15,
                    pattern: {
                      value: /^[0-9]*[.]?[0-9]*$/,
                      message: "Payment Reference must be a number",
                    },
                  })}
                  label={<TbCreditCard />}
                  autoComplete="off"
                  required
                  placeholder="Enter Payment Reference ID"
                  //  disabled={enableInput}
                  type="Number"
                />
                {errors2.id && errors2.id.type === "minLength" && (
                  <p className="text-red-600">
                    Payment Reference must be 10 digits
                  </p>
                )}
                {errors2.id && errors2.id.type === "maxLength" && (
                  <p className="text-red-600">
                    Payment Reference must be 10 digits
                  </p>
                )}
                {errors2.id && (
                  <p className="text-red-600 bg-white">{errors2.id.message}</p>
                )}
                <div className="mt-2 w-full">
                  <CustomButton name="Submit" type="submit">
                    Continue
                    <Loader
                      visible={loading}
                      type="TailSpin"
                      color="#00FA9A"
                      height={18}
                      width={18}
                      timeout={0}
                      className="ml-2"
                    />
                  </CustomButton>
                </div>{" "}
                <div
                  onClick={() => {
                    setLoading(false);
                    setState((prev) => {
                      return {
                        ...prev,
                        viewMethods: true,
                      };
                    });
                  }}
                  className="mt-3 w-full flex items-center justify-center mt-4  text-green-600 space-x-2 cursor-pointer"
                >
                  <IoMdArrowRoundBack className="text-2xl" />

                  <span className="font-bold">Go back</span>
                </div>
              </section>
            ) : state.method === "Download" ? (
              <section className="w-80 p-4">
                <>
                  <SectionTitle
                    title="download payment receipt"
                    subtitle="Enter Payment Reference"
                  />
                  {errormsg && (
                    <p className="border-red-500 border-l-2 text-red-500 p-2">
                      <span className="">{errormsg}</span>
                    </p>
                  )}{" "}
                </>{" "}
                <Input
                  name="id"
                  ref={register2({
                    minLength: 5,
                    maxLength: 15,
                    pattern: {
                      value: /^[0-9]*[.]?[0-9]*$/,
                      message: "Payment Reference must be a number",
                    },
                  })}
                  label={<TbCreditCard />}
                  autoComplete="off"
                  required
                  placeholder="Enter Payment Reference"
                  //  disabled={enableInput}
                  type="Number"
                />
                {errors2.id && errors2.id.type === "minLength" && (
                  <p className="text-red-600">
                    Payment Reference must be 10 digits
                  </p>
                )}
                {errors2.id && errors2.id.type === "maxLength" && (
                  <p className="text-red-600">
                    Payment Reference must be 10 digits
                  </p>
                )}
                {errors2.id && (
                  <p className="text-red-600 bg-white">{errors2.id.message}</p>
                )}
                <div className="mt-2 w-full">
                  <CustomButton name="Submit" type="submit">
                    Continue
                    <Loader
                      visible={loading}
                      type="TailSpin"
                      color="#00FA9A"
                      height={18}
                      width={18}
                      timeout={0}
                      className="ml-2"
                    />
                  </CustomButton>
                </div>{" "}
                <div
                  onClick={() => {
                    setLoading(false);
                    setState((prev) => {
                      return {
                        ...prev,
                        viewMethods: true,
                      };
                    });
                  }}
                  className="mt-3 w-full flex items-center justify-center mt-4  text-green-600 space-x-2 cursor-pointer"
                >
                  <IoMdArrowRoundBack className="text-2xl" />

                  <span className="font-bold">Go back</span>
                </div>
              </section>
            ) : null}
            {state.viewMethods === true && (
              <a
                href="/login"
                className="mt-3 w-full flex items-center justify-center mt-4  text-green-600 space-x-2 cursor-pointer"
              >
                <IoMdArrowRoundBack className="text-2xl" />

                <span className="font-bold">Go back</span>
              </a>
            )}
          </div>
        </form>
      )}

      {loggedIn && state.method == "ILID" && (
        <>
          <SectionTitle title="Make Payment" subtitle="Instant Payment" />

          <Widget
            title="Kindly ensure that all the information provided are accurate and true."
            description={
              <span>
                Note that all fields with asterisk (
                <span className="text-red-500">*</span>) must be completed
              </span>
            }
          >
            <form
              onSubmit={handleSubmit(SubmitHandler)}
              className="w-full p-4 "
            >
              <div className="">
                <h1 className="text-base font-semibold mb-8 text-green-500">
                  Personal Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 w-full ">
                  <div className="w-full ">
                    <NewFormInput
                      label="Ibeju Lekki ID"
                      required
                      ref={register}
                      name="ILID"
                      value={userDetails?.taxPayerInfo?.state_id ?? ""}
                    />
                  </div>
                  <div className="w-full bg-gray">
                    <NewFormInput
                      label="Name"
                      ref={register}
                      required
                      name="fullName"
                      value={userDetails?.taxPayerInfo?.tp_name ?? ""}
                      readOnly={true}
                    />
                  </div>
                  <div className="bg-gray w-full ">
                    <NewFormInput
                      label="Phone Number"
                      ref={register({
                        minLength: 10,
                        maxLength: 11,
                      })}
                      required
                      name="phoneNumber"
                      value={userDetails?.taxPayerInfo?.phone_number ?? ""}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:w-full ">
                  <div className="w-full ">
                    <NewFormInput
                      label="Taxpayer Type"
                      required
                      ref={register}
                      value={userDetails?.taxPayerInfo?.tp_type ?? ""}
                      name="taxPayerType"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:w-full ">
                  <div className="w-full ">
                    <NewFormInput
                      label="Taxpayer Type"
                      required
                      ref={register}
                      value={userDetails?.taxPayerInfo?.tp_type ?? ""}
                      name="taxPayerType"
                      readOnly={true}
                    />
                  </div>

                  <div className="w-full ">
                    <NewFormInput
                      label="Email Address"
                      required
                      ref={register}
                      value={userDetails?.taxPayerInfo?.email?.trim() ?? ""}
                      name="emailAddress"
                      readOnly={true}
                    />
                    {errors.email && (
                      <p className="text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="w-full ">
                    <NewFormInput
                      label="Residential Address"
                      required
                      ref={register}
                      value={`${
                        userDetails?.taxPayerInfo?.address?.substr(0, 44) ?? ""
                      }...`}
                      name="address"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-8 "></div>
              </div>
              <div className="mt-4 md:mt-10">
                <h1 className="text-base font-semibold mb-8 text-green-500">
                  Payment Information
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
                  <div className="w-full  md:mt-0">
                    <label
                      htmlFor="mda"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      MDA
                    </label>
                    <select
                      onChange={filterItem}
                      required
                      ref={register({ required: true })}
                      name="ministry_agency"
                      className="bg-gray-50 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    >
                      <option value="">Select MDA</option>
                      {arr.map((md, item) => (
                        <option value={md} key={item}>
                          {md}
                        </option>
                      ))}
                    </select>
                  </div>
                  {showItem && (
                    <div className="w-full ">
                      <select
                        required
                        ref={register({ required: true })}
                        name="revenue_item"
                        className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0  border-transparent bg-transparent text-gray-600 text-md border-none"
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
                  <div className="w-full ">
                    <NewFormInput
                      label="Tax Office"
                      ref={register}
                      name="taxOffice"
                      value={userDetails?.taxPayerInfo?.tax_office ?? ""}
                      readOnly={true}
                      placeholder="Enter Tax Office"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
                <div className="w-full ">
                  <NewFormInput
                    label="Amount"
                    required
                    ref={register({
                      // minLength: 4,
                      pattern: {
                        value: /^[0-9]*[.]?[0-9]*$/,
                        message: "Amount must be a number",
                      },
                    })}
                    name="amount"
                    placeholder="Enter Amount"
                    value={selectedAmount}
                    onChange={handleAmountChange}
                  />
                  {/* {errors.amount && errors.amount.type === "minLength" && (
          <p className="text-red-600">
            Amount cannot be less than {formatNumber(1000)}
          </p>
        )} */}
                  {errors.amount && (
                    <p className="text-red-600 bg-white">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
                <div className="w-full ">
                  <NewFormInput
                    label="Description"
                    required
                    ref={register()}
                    name="description"
                    placeholder="Enter Description"
                  />
                </div>

                <div className="w-full  mb-5 md:mb-0">
                  <label
                    hmtlfor="revenueItem"
                    className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
                  >
                    Payment Channel
                  </label>
                  <select
                    required
                    ref={register({ required: true })}
                    name="channel"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  >
                    <option value="">Select Payment Channel</option>
                    {channel.map((channel) => (
                      <option value={channel.value} key={channel.key}>
                        {channel.key}
                      </option>
                    ))}
                    {/* {selectedAmount < 20000 && <option>USSD</option>} */}
                  </select>
                </div>
              </div>
              <SubmitButton text="Make Payment">Make Payment</SubmitButton>
            </form>
          </Widget>

          {open && (
            <>
              <div className="modal-backdrop fade-in"></div>
              <div className="modal show">
                <div className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm">
                  <div className="bg-white text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                    <div className="relative p-4 flex-auto">
                      <div className="flex items-start justify-start p-2 space-x-4">
                        <div className="flex-shrink-0 w-12">
                          <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                            <FiSend
                              size={18}
                              className="stroke-current text-green-500"
                            />
                          </span>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="text-lg mb-2 font-bold">
                            {loadingState !== "Payment Generated" ? (
                              <span>Payment Confirmation</span>
                            ) : (
                              <span>Payment Generated</span>
                            )}
                          </div>
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
                      <div>
                        {modalData?.length > 0 &&
                          modalData.map((dat) => {
                            return (
                              <div>
                                <div className="p-2 text-sm">
                                  <table className="table-fixed w-full">
                                    <tbody className="divide-y">
                                      {/* <tr>
                                  <td>Payment ID</td>
                                  <td>{newGlobalRef}</td>
                                </tr>
                                <tr>
                                  <td>Assessment ID</td>
                                  <td>{globalAssId}</td>
                                </tr> */}
                                      <tr>
                                        <td>ILID</td>
                                        <td>{dat.ILID}</td>
                                      </tr>
                                      <tr className="">
                                        <td>Phone Number</td>
                                        <td>{dat.phoneNumber}</td>
                                      </tr>
                                      <tr>
                                        <td>email</td>
                                        <td>{dat.emailAddress}</td>
                                      </tr>
                                      <tr>
                                        <td>Agency</td>
                                        <td>{dat.ministry_agency}</td>
                                      </tr>
                                      <tr>
                                        <td>Revenue Item</td>
                                        <td value={dat.rev_head}>
                                          {dat.itemName}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Amount</td>
                                        <td>{formatNumber(dat.amount)}</td>
                                      </tr>
                                      <tr>
                                        <td>Description</td>
                                        <td>{dat.description}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <div>
                        <div>
                          <div className="p-2 text-sm text-center">
                            Payment generated successfully
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-end p-4  dark:border-gray-700 border-solid rounded-b space-x-2">
                      {loadingState !== "Payment Generated" ? (
                        <SubmitButton
                          onClick={() => submit(modalData[0])}
                          disabled={loading}
                        >
                          {loadingState !== ""
                            ? loadingState
                            : "Confirm Payment"}
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

                      {loadingState !== "Payment Generated" ? (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {loggedIn && state.method == "Payment Reference" && (
        <section className="p-8" style={{ width: "25rem" }}>
          <SectionTitle
            title="Confirm Details"
            subtitle="Complete Instant Payment "
          />
          {/* <div className="mb-10">
            <div className="max-w-4xl flex justify-between py-3 border-b-2 ">
              <span>Taxpayer Name</span>
              <p>{state?.paymentRefDetails?.taxpayer_name}</p>
            </div>
            <div className="max-w-4xl flex justify-between py-3 border-b-2 ">
              <span>Taxpayer Phone</span>
              <p>{state?.paymentRefDetails?.taxpayer_phone}</p>
            </div>
            <div className="max-w-4xl flex justify-between py-3 border-b-2 ">
              <span>Revenue Item</span>
              <p>{state?.paymentRefDetails?.revenue_item}</p>
            </div>
            <div className="max-w-4xl flex justify-between py-3 border-b-2 ">
              <span>Taxpayer Name</span>
              <p>{state?.paymentRefDetails?.amount}</p>STUCK HERE
            </div>
          </div> */}
          {state?.errormsg && (
            <p className="border-red-500 border-l-2 text-red-500 p-2">
              <span className="">{state?.errormsg}</span>
            </p>
          )}{" "}
          <form onSubmit={handleSubmit(submit)} className="w-full">
            <div className="">
              <div className="grid grid-cols-1 w-full ">
                <div className="w-full ">
                  <NewFormInput
                    label="Taxpayer Name"
                    required
                    ref={register}
                    name="fullName"
                    value={state?.paymentRefDetails?.taxpayer_name ?? ""}
                  />
                </div>
                <div className="w-full bg-gray">
                  <NewFormInput
                    label="Taxpayer Phone Number"
                    ref={register}
                    required
                    name="phone"
                    value={state?.paymentRefDetails?.taxpayer_phone ?? ""}
                    readOnly={true}
                  />
                </div>
                <div className="w-full bg-gray">
                  <NewFormInput
                    label="Revenue Item"
                    ref={register}
                    required
                    name="revenue_item"
                    value={state?.paymentRefDetails?.revenue_item ?? ""}
                    readOnly={true}
                  />
                </div>
                <div className="w-full bg-gray">
                  <NewFormInput
                    label="Amount"
                    ref={register}
                    required
                    name="amount"
                    value={state?.paymentRefDetails?.amount ?? ""}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 w-full ">
              <div className="w-full md:mb-0">
                <label
                  hmtlfor="revenueItem"
                  className="block mb-2 text-sm font-bold text-gray-600 dark:text-white"
                >
                  Payment Channel
                </label>
                <select
                  required
                  ref={register({ required: true })}
                  name="channel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                >
                  <option value="">Select Payment Channel</option>
                  {channel.map((channel) => (
                    <option value={channel.value} key={channel.key}>
                      {channel.key}
                    </option>
                  ))}
                  {/* {selectedAmount < 20000 && <option>USSD</option>} */}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3 mt-5">
              <div
                onClick={() => {
                  setState((prev) => {
                    return {
                      ...prev,
                      viewMethods: true,
                    };
                  });
                  setLoggedIn(false);
                }}
                className="cursor-pointer border-2 border-green-500 px-3 py-2 rounded text-green-500"
              >
                Cancel
              </div>{" "}
              <SubmitButton text="Make Payment">Make Payment</SubmitButton>
            </div>
          </form>
        </section>
      )}

      {loggedIn && state.method == "Download" && (
        <div className="flex flex-col space-y-5 items-center justify-center">
          <div id="body">
            <section id="pdf-content">
              <div className="segment">
                <header>
                  {/* <Image
                    src={AbiaLogo}
                    alt="Ibeju Lekki Logo"
                    className="ibeju-logo"
                    width={200}
                    height={100}
                  /> */}
                  <div className="header-text">
                    <h1>GOVERNMENT OF ABIA STATE INTERNAL REVENUE SERVICES</h1>
                    <h4>
                      Plot 100 Government Station Layout Opposite State <br />
                      Secretariat Ndume Otuka By Pass, Umuahia, Abia State.{" "}
                      <br />
                      Email: <strong>info@abiairs.gov.ng</strong> Phone:
                      <strong>08184222428, 09071111834</strong>
                    </h4>
                  </div>
                  {/* <Image
                    src={QrCode}
                    alt="Ibeju Lekki Logo"
                    className="ibeju-logo"
                    width={200}
                    height={100}
                  /> */}
                </header>
                <h2>PAYMENT RECEIPT</h2>
                <div className="space-x-1">
                  <span className="text-sm text-gray-400 font-bold">
                    Status:
                  </span>
                  {state.paymentRefDetails?.status === "Completed" ? (
                    <span className="w-full text-xs px-1 bg-green-100 border border-green-400 rounded text-center text-green-500 font-bold mr-8">
                      {state.paymentRefDetails?.status}
                    </span>
                  ) : (
                    <span className="w-full text-xs px-1 bg-yellow-100 border border-yellow-400 rounded text-center text-yellow-500 font-bold mr-8">
                      {state.paymentRefDetails?.status}
                    </span>
                  )}
                </div>
                <table id="customers">
                  <tr>
                    <td>ILID/Payment Reference:</td>
                    <td>{state?.paymentRefDetails?.payment_ref}</td>
                  </tr>

                  <tr>
                    <td>Taxpayer Name:</td>
                    <td>{state?.paymentRefDetails?.taxpayer_name}</td>
                  </tr>

                  <tr>
                    <td>Taxpayer Type:</td>
                    <td>{state?.paymentRefDetails?.taxpayer_type}</td>
                  </tr>

                  <tr>
                    <td>Payment Date:</td>
                    <td>
                      {dateformat(
                        state?.paymentRefDetails?.creation_date,
                        "ddd, dS mmm, yyyy"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Payment Channel:</td>
                    <td>{state?.paymentRefDetails?.payment_channel || "-"}</td>
                  </tr>
                  <tr>
                    <td>Reference Number:</td>
                    <td>{state?.paymentRefDetails?.payment_ref || "-"}</td>
                  </tr>
                  <tr>
                    <td>Agency: </td>
                    <td>{state?.paymentRefDetails?.agency}</td>
                  </tr>
                  <tr>
                    <td>Revenue Name: </td>
                    <td>{state?.paymentRefDetails?.revenue_item}</td>
                  </tr>

                  <tr>
                    <td>Amount Paid</td>
                    <td> ₦{formatNumber(state?.paymentRefDetails?.amount)}</td>
                  </tr>
                </table>
                <footer>
                  <div>
                    <h4 className="font-bold text-3xl">How to Validate</h4>
                    <div>
                      <span>
                        <strong> Portal (Step 1):</strong>
                        Portal (Step 1): Goto Instant Payment on AbiaPay Portal
                        and click on{" "}
                        <span
                          className="underline text-blue-600 cursor-pointer"
                          onClick={() => {
                            setLoggedIn(false);
                            setState((prev) => {
                              return {
                                ...prev,
                                viewMethods: true,
                                method: "",
                              };
                            });
                          }}
                        >
                          "I want to download my receipt".{" "}
                        </span>{" "}
                        <br />
                        <strong>Portal (Step 2):</strong> Enter your Payment
                        Reference and click on "Continue".
                        <br />
                      </span>
                    </div>
                  </div>
                </footer>
              </div>
            </section>
          </div>
          {state.paymentRefDetails?.status == "Completed" && (
            <a
              href={`https://rhmx.paytax.ng/index?recView=recView&mod=Collections&entity=showCollection&recId=${state.paymentRefDetails.receipt_id}`}
              target="_blank"
              className="text-black font-semibold text-white bg-green-600 border-2 border-green-500 rounded py-3 px-8 text-center"
            >
              <div className="flex justify-center">
                <p>{` Download Receipt`}</p>
                {/* <Loader
                  // visible={submitting}
                  type="TailSpin"
                  color="#00FA9A"
                  height={19}
                  width={19}
                  timeout={0}
                  className="ml-2"
                /> */}
              </div>
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default InstantPaymentForm;
