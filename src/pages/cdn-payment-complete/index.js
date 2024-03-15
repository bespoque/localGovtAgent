import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import setAuthToken from "../../functions/setAuthToken";
import url from "../../config/url";
import axios from "axios";
import { KgirsLogo } from "../../components/Images/Images";
import { SubmitButton } from "../../components/CustomButton/CustomButton";
import Loader from "react-loader-spinner";
import { FiSend } from "react-icons/fi";
import { NewFormInput } from "../../components/FormInput/formInputs";
import { useForm } from "react-hook-form";
import { taxStation } from "../../json/taxOffice";
import UseFetcher from "../../components/fetcher/useFetcher";
import { saveAs } from "file-saver";
import UseFetcherNoAuth from "../../components/fetcher/useFetcherNoAuth";

const Index = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [deleting, setDeleting] = useState(false);
  const [validating, setValidating] = useState(false);
  const [loadingState, setLoadingState] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfMessage, setPdfMessage] = useState("");
  const [updatRef, setUpdateRef] = useState(false);
  const [updateRefErrMessage, setUpdateRefErrMessage] = useState("");
  const [updateSuccMsg, setUpdateSuccMsg] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalAssId, setGlobalAssId] = useState(() => "");
  const [newGlobalRef, setNewGlobalRef] = useState(() => "");
  const [channel, setChannel] = useState([
    { key: "Monnify", value: "Monnify" },
    { key: "Credo", value: "Credo" },
    { key: "Bank", value: "Bank" },
    { key: "Moniepoint POS", value: "Offline" },
  ]);
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
  }, []);

  const [openBank, setOpenBank] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  console.log(router.query);
  let { transRef, reference } = router.query;

  useEffect(() => {
    const fetData = async (transRef, reference) => {
      setAuthToken();
      try {
        console.log(transRef);
        const response = await axios.get(
          `${url.CREDO_URL}/transaction/${transRef}/verify`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: url.CREDO_SECRET_KEY,
            },
          }
        );
        setIsLoading(false);
        const paymentData = response.data;
        paymentData.data.src = "credo";
        console.log(paymentData.data);

        if (paymentData.data.status === 0) {
          const updatePayment = await axios.put(
            `${url.BASE_URL}user/update-transaction-status/`,
            paymentData.data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (updatePayment.data.status) {
            window.location.replace(
              `/receipt/${updatePayment.data.payment_ref}`
            );
          }
        } else {
          const response = await axios.get(`${url.BASE_URL}user/receipt/`, {
            params: { id: reference },
          });
          setIsLoading(false);
          const paymentData = response.data;
          let dataArr = [paymentData.body];
          setData(dataArr);
          console.log("data Arr", dataArr);
          //let dataArr = [paymentData.body]
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetData(transRef, reference);
  }, [transRef, reference]);

  // const { data, isLoading, error } = UseFetcher(
  //   `${url.BASE_URL}user/invoice-details/${ref}`
  // );
  // console.log("data", data);

  const handleModalOpen = (url) => {
    setIsModalOpen(true);
    setModalUrl(url);
  };
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

  const show = (data) => {
    console.log("show", data);
    // if (data.mdaName !== "INTERNAL REVENUE SERVICE") {
    //   const psp = channel.filter((channel) => channel.key !== "Remita");
    //   setChannel(psp);
    // }
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  if (data) {
    data.forEach((rec) => {
      rec.formattedAmount = formatNumber(rec?.payment_details.amount);
    });
  }

  const PaymentHandler = async (paymentData) => {
    let formData = {};
    formData.name = data[0].taxPayerName;
    formData.email = paymentData.email;
    formData.phoneNumber = paymentData.phoneNumber;
    formData.station = paymentData.station;
    formData.amount = paymentData.amount;
    formData.channel = paymentData.channel;
    formData.KGTIN = data[0].t_payer;
    formData.revenueSub = data[0].rev_sub;
    formData.agency = data[0].agency;
    formData.assessment_id = data[0].assessment_id;
    formData.description = data[0].itemName;
    formData.paymentRef = newGlobalRef;
    formData.paymentgateway = paymentData.channel;
    formData.paygatewayclient = "etax";
    setLoadingState("Submitting...");
    setLoading(true);
    const queryParams = new URLSearchParams(formData).toString();

    try {
      const response = await fetch(`${urlNew}recordpayment.php?${queryParams}`);
      if (paymentData.channel === "Bank") {
        setLoadingState("Generating Pdf...");
        await fetchBankPrint(newGlobalRef);
      } else {
        handleModalOpen(
          `${urlNew}processpayment.php?paymentref=${newGlobalRef}`
        );
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

  //update bank ref
  const updateRefHandler = async (payload) => {
    payload.ref = data[0].ref;
    setUpdateRef(true);
    try {
      const result = await axios.put(
        `${url.BASE_URL}payment/update-bank-payment`,
        payload
      );
      setUpdateRef(false);
      setUpdateSuccMsg(result.data.message);
      setTimeout(() => {
        setUpdateSuccMsg("");
        router.push("/payment/payment-history");
      }, 6000);
    } catch (error) {
      if (error.response) setUpdateRefErrMessage(error.response.data.message);
      setTimeout(() => {
        setUpdateRefErrMessage("");
      }, 6000);
      setUpdateRef(false);
    }
  };

  //delete pending assessment
  const deleteHandler = async (assessmentId) => {
    setDeleting(true);
    try {
      setAuthToken();
      let res = await axios.delete(
        `${url.BASE_URL}payment/delete-pending-invoice/${assessmentId}`
      );

      setDeleting(false);
      alert(res.data.message);
      router.push("/payment/pending-invoice");
    } catch (e) {
      setDeleting(false);
      if (e.response) {
        alert(e.response.message);
      }
    }
  };

  const deletePrompt = (assessmentId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteHandler(assessmentId);
    }
  };

  const RevalidateTransactions = async (data) => {
    setValidating(true);
    let { pmt_meth, ref, amount, assessment_id, t_payer } = data;
    let payload = {};
    payload.channelId = pmt_meth;
    payload.assessmentId = assessment_id;

    if (pmt_meth === "WebPay") {
      amount = amount * 1;
      amount = amount * 100;
      router.push(
        `${url.PAY_URL}interswitch/response.php?details=${assessment_id}&amount=${amount}&ref=${ref}&taxId=${t_payer}`
      );
    }
  };

  return (
    <>
      {/* {isLoading && (
        <div className="flex justify-center item">
          <Loader
            visible={true}
            type="BallTriangle"
            color="pink"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )} */}

      <Modal isOpen={isModalOpen} url={modalUrl} />
      {data?.length > 0 &&
        data.map((da) => (
          <div key={da.idpymt}>
            <SectionTitle subtitle="Due Demand Notice" />
            <Widget>
              <div className="py-10  w-full">
                <div className="flex flex-row items-center justify-between mb-4">
                  <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start whitespace-nowrap">
                    {/* <KgirsLogo /> */}
                  </div>
                  <span className="text-center text-lg text-emerald-500">
                    Status: {da.status}
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
                    <div className="lg:w-4/5 w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Taxpayer detailsn
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
                  </div>
                  <div className="w-full">
                    <div className="uppercase lg:w-4/5 w-full px-2">
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

                        <button
                          className=" text-black font-semibold px-25 bg-white  w-full border-green-500 p-2 border text-center"
                          onClick={() => show(da)}
                        >
                          Pay Now
                        </button>
                      </div>
                      <button
                        className="py-2 mt-4 hover:text-green-600 text-black w-full text-left"
                        onClick={() => setOpenBank(true)}
                      >
                        Paid at bank?
                        <span className="text-green-600"> Click</span> to submit
                        payment reference.
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-96 justify-between">
                  {da[0].createby === "WEB" ||
                  da[0].pmt_meth === "WebPay" ||
                  da[0].createby === "PORTAL" ? (
                    <button
                      onClick={() => deletePrompt(da[0].assessment_id)}
                      className="text-emerald-500 text-base mt-4 mr-4"
                    >
                      {`${deleting ? "Deleting..." : "Delete Invoice"}`}
                    </button>
                  ) : (
                    ""
                  )}

                  {da[0].pmt_meth === "WebPay" && (
                    <button
                      onClick={() => RevalidateTransactions(da[0])}
                      className="text-green-500 text-base mt-4"
                    >
                      {`${validating ? "Re-validating..." : "Re-validate"}`}
                    </button>
                  )}
                </div>
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
                        {pdfMessage && (
                          <div className="px-4">
                            <p className="border-l-2  border-green-500 p-1 text-green-500">
                              {pdfMessage}
                            </p>
                          </div>
                        )}
                      </div>
                      <form onSubmit={handleSubmit(PaymentHandler)}>
                        <div className="w-full px-8">
                          <NewFormInput
                            label="Payment ID"
                            value={newGlobalRef}
                            required
                            ref={register}
                            name="paymentRef"
                          />
                          <NewFormInput
                            label="Agency"
                            value={da[0].agency}
                            required
                            ref={register}
                            name=""
                          />

                          <NewFormInput
                            label="Revenue Item"
                            value={da.revenue_item}
                            required
                            ref={register}
                            name="revItem"
                          />

                          <NewFormInput
                            label="Amount"
                            value={da.formattedAmount}
                            required
                            ref={register({
                              pattern: {
                                value: /^[0-9]*[.]?[0-9]*$/,
                                message: "Amount must be a number",
                              },
                            })}
                            name="amount"
                          />

                          {errors.amount && (
                            <p className="text-emerald-600 bg-white">
                              {errors.amount.message}
                            </p>
                          )}
                          {/* 
                          <NewFormInput
                            label="Assessment Id"
                            required
                            value={data[0].assessment_id}
                            ref={register}
                            name="assessment_id"
                          /> */}
                          {/* <NewFormInput
                            label="email"
                            required
                            ref={register({
                              required: true,
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",
                              },
                            })}
                            name="email"
                          />
                          {errors.email && (
                            <p className="text-emerald-600">
                              {errors.email.message}
                            </p>
                          )}
                          <NewFormInput
                            label="Phone Number"
                            required
                            ref={register({
                              minLength: 10,
                              maxLength: 11,
                              pattern: {
                                value: /^[0-9]*[.]?[0-9]*$/,
                                message: "Phone Number must be a number",
                              },
                            })}
                            name="phoneNumber"
                          />
                          {errors.phoneNumber &&
                            errors.phoneNumber.type === "minLength" && (
                              <p className="text-emerald-600">
                                Phone Number must be at least 10 digits
                              </p>
                            )}
                          {errors.phoneNumber &&
                            errors.phoneNumber.type === "maxLength" && (
                              <p className="text-emerald-600">
                                Phone Number must be not be more than 11 digits
                              </p>
                            )}

                          {errors.phoneNumber && (
                            <p className="text-emerald-600 bg-white">
                              {errors.phoneNumber.message}
                            </p>
                          )} */}

                          <select
                            required
                            ref={register({ required: true })}
                            name="station"
                            className="w-full pl-0 focus:outline-none focus:ring-0 focus:ring-offset-0  border-transparent bg-transparent text-gray-600 text-md border-none"
                          >
                            <option value="">Select Tax Station</option>
                            <option selected value={da.station}>
                              {da.station}
                            </option>
                            {taxStation
                              .filter((station) => da.station !== station.value)
                              .map((office) => (
                                <option value={office.value} key={office.name}>
                                  {office.name}
                                </option>
                              ))}
                          </select>

                          <NewFormInput
                            label="Selected Payment Channel"
                            value={da.payment_channel}
                            required
                            ref={register}
                            name="channel"
                          />
                          <select
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
                              onClick={() => updateRefHandler(data[0])}
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

            {/* bank modal */}
            {openBank && (
              <>
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
                              <span>Bank Payment Reconciliation</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-4">
                          {updateRefErrMessage !== "" && (
                            <p className="p-2 text-emerald-500 border-l-2 border-emerald-500">
                              {updateRefErrMessage}
                            </p>
                          )}
                          {updateSuccMsg !== "" && (
                            <p className="p-2 text-green-500 border-l-2 border-green-500">
                              {updateSuccMsg}
                            </p>
                          )}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(updateRefHandler)}>
                        <div className="w-full px-8">
                          <h6 className="text-sm text-">
                            multiple references should be separated with a
                            comma. eg. 1234567, 13456789
                          </h6>
                          <NewFormInput
                            label="Payment Reference"
                            required
                            ref={register}
                            name="bankRef"
                          />
                        </div>

                        <div className="flex justify-between items-center px-8 mt-4">
                          <div className="">
                            <SubmitButton disabled={updatRef}>
                              {updatRef ? "Submitting..." : "Submit"}
                              <Loader
                                visible={updatRef}
                                type="TailSpin"
                                color="white"
                                height={19}
                                width={19}
                                timeout={0}
                                className="ml-2"
                              />
                            </SubmitButton>
                          </div>

                          <div className="flex items-center justify-end p-4  dark:border-gray-700 border-solid rounded-b space-x-2">
                            <button
                              disabled={updatRef}
                              className=" disabled:cursor-not-allowed btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                              type="button"
                              onClick={() => setOpenBank(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
    </>
  );
};

export default Index;
