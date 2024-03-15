import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";
import { useRouter } from "next/router";
import { formatNumber } from "../../functions/numbers";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import dateFormat from "dateformat";
import { FiSend } from "react-icons/fi";
import { NewFormInput } from "../../components/FormInput/formInputs";
import Loader from "react-loader-spinner";
import { SubmitButton } from "../../components/CustomButton/CustomButton";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../components/spiner";

const Index = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState({});
  const [noticeItem, setNoticeItem] = useState({});
  const [open, setOpen] = useState(false);
  const [openSingle, setOpensingle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("");
  const [paymentChannel, setPaymentChannel] = useState("");
  const [channel, setChannel] = useState([
    // { key: "Credo", value: "Credo" },
    // { key:'WebPay', value:'WebPay'},
    { key: "Interswitch Webpay", value: "Interswitch Webpay" },
    { key: "Bank", value: "Bank" },
    { key: "Wallet", value: "Wallet" },
  ]);
  const [paid, setPaid] = useState(null);
  const [balance, setBalance] = useState(null);
  const [walletBalance, setWalletBalance] = useState();
  const [openWallet, setOpenWallet] = useState(false);
  const [walletError, setWalletError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [status, setStatus] = useState("Unpaid");

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
    fetchWalletBalnce();
  }, []);

  useEffect(() => {
    const fetData = async () => {
      setAuthToken();
      setLoading(true);
      console.log("notice number", ref);
      try {
        const response = await axios.post(`${url.BASE_URL}cdn/notice`, {
          notice_number: `${ref.ref}`,
        });
        setLoading(false);
        setIsLoading(false);
        const data = response.data.data;
        setNotice(data);
        console.log("data", data);
        setBalance(response.data.data[0].total_amount_pending);
        setPaid(data[0].total_paid);
        setNoticeItem(response.data.data[0].items);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetData();
  }, [ref]);

  const show = () => {
    setOpen(true);
  };

  const showSingle = (item) => {
    setSelectedItem(item);
    setOpensingle(true);
  };
  const hide = () => {
    setOpen(false);
  };

  const hideSingle = () => {
    setOpensingle(false);
  };

  const fetchWalletBalnce = async () => {
    // setAuthToken()

    try {
      const response = await axios.post(`${url.BASE_URL}wallet/balance`);
      setWalletBalance(response.data.balance);
    } catch (error) {}
  };

  const PaymentHandler = async (paymentData) => {
    try {
      const response = await axios.post(`${url.BASE_URL}cdn/payment`, {
        notice_number: paymentData.notice_number,
        amount: paymentData.amount,
        payment_method: paymentChannel,
      });
      // updateRefHandler(response.paymentData)
    } catch (e) {
      setLoading(false);
      setLoadingState("");
      if (e.response) {
      }
    }
  };

  const updateRefHandler = async (payload) => {
    try {
      setLoading(true);
      const response = await axios.post(`${url.BASE_URL}cdn/payment`, {
        notice_number: payload.notice_number,
        amount: payload.total_amount,
        payment_method: paymentChannel,
      });

      if (response.status == 200) {
        setLoading(false);
        if (paymentChannel == "Credo") {
          let paymentData = {
            amount: Number(payload.total_amount) * 100,
            currency: "NGN",
            reference: response.data.payment_ref,
            callbackUrl: `${url.URL}/cdn-payment-complete`,
            email: response.data.email,
          };
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
          }
        }

        if (paymentChannel == "Interswitch Webpay") {
          console.log(response.data);
          setPaymentRef(res.data.payment_ref);
          let samplePaymentRequest = {
            merchant_code: "MX103374",
            pay_item_id: "Default_Payable_MX103374",
            txn_ref: response.data.payment_ref,
            amount: Number(payload.total_amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3000/complete",
            mode: "TEST",
          };

          window.webpayCheckout(samplePaymentRequest);
        }

        if (paymentChannel === "Wallet") {
          setLoading(false);
          const body = {
            amount: Number(payload.total_amount) * 100,
            payment_ref: res.data.payment_ref,
          };
          try {
            const response = await axios.post(
              `${url.BASE_URL}wallet/make-payment`,
              body
            );
          } catch (error) {
            console.log("error", error.response.data.message.amount);
            setWalletError(error.response.data.message.amount);
            toast.error(walletError, { position: toast.POSITION.TOP_CENTER });
          }
        }

        if (data.channel == "Bank" || data.channel == "USSD") {
          console.log("Bank");
          setLoading(false);
          setLoadingState("Payment Generated");
          window.location = `/pending-payment/${res.data.payment_ref}`;
        }
      }
    } catch (e) {
      setLoading(false);
      setLoadingState("");
      if (e.response) {
      }
    }
  };

  const updateSingleRefHandler = async (payload) => {
    console.log("payload", payload);
    try {
      setLoading(true);
      const response = await axios.post(`${url.BASE_URL}cdn/single-payment`, {
        id: payload.id,
        payment_method: paymentChannel,
      });

      console.log("response", response);
      if (response.status == 200) {
        setLoading(false);
        if (paymentChannel == "Credo") {
          let paymentData = {
            amount: Number(payload.total_amount) * 100,
            currency: "NGN",
            reference: response.data.payment_ref,
            callbackUrl: `${url.URL}/cdn-payment-complete`,
            email: response.data.email,
          };
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
          }
        }

        if (paymentChannel == "Interswitch Webpay") {
          setPaymentRef(res.data.payment_ref);
          let samplePaymentRequest = {
            merchant_code: "MX79048",
            pay_item_id: "Default_Payable_MX79048",
            txn_ref: response.data.payment_ref,
            amount: Number(payload.total_amount) * 100,
            currency: 566, // ISO 4217 numeric code of the currency used
            onComplete: paymentCallback,
            site_redirect_url: "http://localhost:3000/complete",
            mode: "TEST",
          };

          window.webpayCheckout(samplePaymentRequest);
        }

        if (paymentChannel === "Wallet") {
          setLoading(false);
          const body = {
            amount: Number(payload.total_amount) * 100,
            payment_ref: res.data.payment_ref,
          };
          try {
            const response = await axios.post(
              `${url.BASE_URL}wallet/make-payment`,
              body
            );
          } catch (error) {
            console.log("error", error.response.data.message.amount);
            setWalletError(error.response.data.message.amount);
            toast.error(walletError, { position: toast.POSITION.TOP_CENTER });
          }
        }

        if (paymentChannel == "Bank" || paymentChannel == "USSD") {
          console.log("Bank");
          setLoading(false);
          setLoadingState("Payment Generated ");
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
    console.log("payment call back");
    response.src = "interswitch";
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

  const paymentStatus = async (ref) => {
    setOpenBank(true);
    // try {
    //   const response = await axios.post(`${url.BASE_URL}user/user-check-payment-status`,{ payment_ref: ref })
    //   let status = response?.data?.payment_status

    //   if (status === 'Processing'){
    //   setPendingStatus(status)
    //   }
    //   else if (status === 'Completed'){
    //     setCompletedStatus(status)
    //   }
    // } catch (error) {

    // }
  };

  return (
    <>
      {isLoading && <Spinner />}

      {notice?.length > 0 &&
        notice.map((da) => (
          <div key={da.idpymt}>
            <SectionTitle subtitle="Demand Notice" />
            <Widget>
              <div className="py-10 px-4 w-full">
                <div className="flex flex-row items-center justify-between mb-4">
                  <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start whitespace-nowrap">
                    {/* <KgirsLogo /> */}
                  </div>
                  <span className="text-center text-lg text-emerald-500">
                    Status: {status}
                  </span>
                </div>
                <div className="lg:flex justify-between w-full">
                  <div className="w-full">
                    <div className="lg:w-4/5 w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Category details
                      </h6>
                      <div className="space-y-2 uppercase">
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm">Category name</h1>
                          <span className="text-black font-semibold">
                            {da.category_name}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">CDN Category </h1>
                          <span className="text-black font-semibold">
                            {da.cdn_category}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm">Created By</h1>
                          <span className="text-black font-semibold">
                            {da.createby}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Fiscal Year</h1>
                          <span className="text-black font-semibold">
                            {da.fiscal_year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="lg:w-4/5 w-full px-2 pt-6 md:py-0">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Taxpayer details
                      </h6>
                      <div className="space-y-2 uppercase">
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Taxpayer Name</h1>
                          <span className="text-black font-semibold">
                            {da.taxpayer_name}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm">TaxPayer ID</h1>
                          <span className="text-black font-semibold">
                            {da.taxpayer_id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-4/5 w-full px-2 mt-6 md:py-0">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Description
                      </h6>
                      <div className="space-y-2 uppercase">
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Taxpayer Description</h1>
                          <span className="text-black font-semibold">
                            {da.taxpayer_desc || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="lg:w-4/5 w-full px-2 pt-6 md:py-0">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Payment details
                      </h6>
                      <div className="shadow-lg w-full">
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">creation date</h1>
                          <span className="text-black font-semibold">
                            {dateFormat(da.creation_date, "ddd, dS mmm, yyyy")}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Total Amount</h1>
                          <span className="text-green-600 text-xl font-semibold">
                            &#8358;{formatNumber(da?.total_amount)}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Paid Amount</h1>
                          <span className="text-green-600 text-xl font-semibold">
                            &#8358;{paid}
                          </span>
                        </div>
                        <div className="bg-gray-100  w-full p-2">
                          <h1 className="text-sm ">Balance</h1>
                          <span className="text-green-600 text-xl font-semibold">
                            &#8358;{balance}
                          </span>
                        </div>

                        <button
                          className=" text-black font-semibold px-25 bg-white  w-full border-green-500 p-2 border text-center"
                          onClick={() => show(da)}
                        >
                          Pay Now
                        </button>
                      </div>
                      {(da.payment_channel === "Bank" ||
                        da.payment_channel === "USSD") && (
                        <button
                          className=" text-black font-semibold px-25 bg-white  w-full border-green-500 p-2 border text-center"
                          onClick={() => paymentStatus(da.payment_reference)}
                        >
                          Check Payment Status
                        </button>
                      )}
                      {/* <button
                        className="py-2 mt-4 hover:text-green-600 text-black w-full text-left"
                        onClick={() => setOpenBank(true)}
                      >
                        Paid at bank?
                        <span className="text-green-600"> Click</span> to submit
                        payment reference.
                      </button> */}
                    </div>
                  </div>
                </div>

                <>
                  <div className="w-full mt-8" key={da.id}>
                    <div className="w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Demand Notice details
                      </h6>
                      <div className=" w-full">
                        <table className="min-w-full divide-y divide-gray-300 ">
                          <thead className="w-full border rounded-tl-xl">
                            <tr className="text-left w-full py-3 text-left text-sm font-semibold text-gray-900 bg-gray-200">
                              <th scope="col" className="py-3.5 pl-3">
                                MDA
                              </th>
                              <th scope="col" className="py-3.5">
                                Rev Item
                              </th>
                              <th scope="col" className="py-3.5">
                                Amount
                              </th>
                              <th scope="col" className="py-3.5">
                                Status
                              </th>
                              {/* <th scope="col" className="py-3.5">
                              Rerence ID
                            </th> */}
                              <th scope="col" className="py-3.5">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="p-3">
                            {noticeItem.length > 0 &&
                              noticeItem.map((da) => (
                                <tr className="text-sm font-medium text-gray-900">
                                  <td className="whitespace-nowrap py-4 pl-3">
                                    {da.mda}
                                  </td>
                                  <td className="whitespace-nowrap py-4">
                                    {da.rev_item}
                                  </td>

                                  <td className="whitespace-nowrap py-4">
                                    &#8358;
                                    {formatNumber(da.amount)}
                                  </td>
                                  <td className="whitespace-nowrap py-4">
                                    {da.status}
                                  </td>
                                  {/* <td className="whitespace-nowrap py-4">
                                   RSE102930440992
                                 </td> */}
                                  <td className="whitespace-nowrap py-4 cursor-pointer">
                                    <span
                                      className="border px-4 py-2 bg-teal-500 text-white rounded-"
                                      onClick={() => showSingle(da)}
                                    >
                                      Pay Single Item
                                    </span>
                                  </td>
                                </tr>
                              ))}

                            <div className="bg-gray-100  w-full p-2 ml-50">
                              <h1 className="text-sm ">Total Amount</h1>
                              <span className="text-green-600 text-xl font-semibold">
                                &#8358;{formatNumber(da?.total_amount)}
                              </span>
                            </div>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </Widget>

            {open && (
              <div>
                <div className="modal-backdrop fade-in"></div>
                <div className="modal show">
                  <div className="relative w-auto lg:my-4 mx-auto lg:w-1/2 max-w-sm">
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
                              <span>Payment Confirmation</span>
                            </div>
                          </div>
                        </div>
                        {/* {pdfMessage && (
                          <div className="px-4">
                            <p className="border-l-2  border-green-500 p-1 text-green-500">
                              {pdfMessage}
                            </p>
                          </div>
                        )} */}
                      </div>
                      <form onSubmit={handleSubmit(PaymentHandler)}>
                        <div className="w-full px-8">
                          <NewFormInput
                            label="Notice Number"
                            value={da.notice_number}
                            required
                            ref={register}
                            name="notice_number"
                          />

                          <NewFormInput
                            label="Amount"
                            value={formatNumber(da?.total_amount)}
                            required
                            ref={register({
                              pattern: {
                                value: /^[0-9]*[.]?[0-9]*$/,
                                message: "Amount must be a number",
                              },
                            })}
                            name="total_amount"
                          />

                          <select
                            onChange={(e) => setPaymentChannel(e.target.value)}
                            required
                            ref={register({ required: true })}
                            name="channel"
                            className="w-full pl-0  focus:outline-none focus:ring-0 focus:ring-offset-0  border-transparent bg-transparent text-gray-600 text-md border-none"
                          >
                            <option value="">Select Payment Channel</option>
                            {channel.map((channel) => (
                              <option value={channel.value} key={channel.key}>
                                {channel.key}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-between items-center px-8 mt-4">
                          <div className="">
                            <SubmitButton
                              text="Make Payment"
                              disabled={loading}
                              onClick={() => updateRefHandler(da)}
                            >
                              {loadingState !== ""
                                ? loadingState
                                : "Confirm Payment"}

                              {loading && (
                                <Loader
                                  visible={loading}
                                  type="TailSpin"
                                  color="white"
                                  height={19}
                                  width={19}
                                  timeout={0}
                                  className="ml-2"
                                />
                              )}
                            </SubmitButton>
                          </div>

                          <div className="flex items-center justify-end p-4  dark:border-gray-700 border-solid rounded-b space-x-2">
                            <button
                              className="disabled:cursor-not-allowed btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                              type="button"
                              onClick={hide}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {openSingle && selectedItem && (
              <div>
                <div className="modal-backdrop fade-in"></div>
                <div className="modal show">
                  <div className="relative w-auto lg:my-4 mx-auto lg:w-1/2 max-w-sm">
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
                              <span>Payment Confirmation</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit(PaymentHandler)}>
                        {loadingState !== "Payment Generated" ? (
                          <div className="w-full px-8">
                            <NewFormInput
                              label="Notice Number"
                              value={selectedItem.notice_number}
                              required
                              ref={register}
                              name="notice_number"
                            />

                            <NewFormInput
                              label="Amount"
                              value={formatNumber(selectedItem?.amount)}
                              required
                              ref={register({
                                pattern: {
                                  value: /^[0-9]*[.]?[0-9]*$/,
                                  message: "Amount must be a number",
                                },
                              })}
                              name="total_amount"
                            />

                            <select
                              onChange={(e) =>
                                setPaymentChannel(e.target.value)
                              }
                              required
                              ref={register({ required: true })}
                              name="channel"
                              className="w-full pl-0  focus:outline-none focus:ring-0 focus:ring-offset-0  border-transparent bg-transparent text-gray-600 text-md border-none"
                            >
                              <option value="">Select Payment Channel</option>
                              {channel.map((channel) => (
                                <option value={channel.value} key={channel.key}>
                                  {channel.key}
                                </option>
                              ))}
                            </select>
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
                        <div className="flex justify-between items-center px-8 mt-4">
                          <div className="">
                            {loadingState !== "Payment Generated" ? (
                              <SubmitButton
                                text="Make Payment"
                                disabled={loading}
                                onClick={() =>
                                  updateSingleRefHandler(selectedItem)
                                }
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
                          </div>

                          <div className="flex items-center justify-end p-4  dark:border-gray-700 border-solid rounded-b space-x-2">
                            <button
                              className="disabled:cursor-not-allowed btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                              type="button"
                              onClick={hideSingle}
                              disabled={loading}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
    </>
  );
};
export default Index;
