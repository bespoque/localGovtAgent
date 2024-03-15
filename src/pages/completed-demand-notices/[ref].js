import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import url from "../../config/url";
import { useRouter } from "next/router";
import { formatNumber } from "../../functions/numbers";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import { FiSend } from "react-icons/fi";
import { NewFormInput } from "../../components/FormInput/formInputs";
import Loader from "react-loader-spinner";
import { SubmitButton } from "../../components/CustomButton/CustomButton";
import Image from "next/image";
import dateFormat from "dateformat";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import Spinner from "../../components/spiner";

const Index = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [notice, setNotice] = useState({});
  const [noticeItem, setNoticeItem] = useState({});
  const [submitting, setSubmitting] = useState(() => false);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("");
  const [paymentChannel, setPaymentChannel] = useState("");
  const [channel, setChannel] = useState([
    { key: "Credo", value: "Credo" },
    { key: "Bank", value: "Bank" },
    { key: "USSD", value: "USSD" },
  ]);

  const router = useRouter();
  let ref = router.query;

  useEffect(() => {
    const fetData = async () => {
      setAuthToken();
      try {
        const response = await axios.post(`${url.BASE_URL}cdn/notice`, {
          notice_number: `${ref.ref}`,
        });
        setIsLoading(false);
        const data = response.data.data;
        setNotice(data);
        setNoticeItem(response.data.data[0].items);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetData();
  }, [ref]);

  const downloadPDF = () => {
    // router.push(`https://rhmx.paytax.ng/demand-notice?number=${ref.ref}`)
    // const element = document.getElementById("pdf-content");
    // setIsLoading(true);
    // const pdf = new jsPDF("p", "mm", "a4");
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();
    // html2canvas(element).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   pdf.addImage(
    //     imgData,
    //     "PNG",
    //     0,
    //     0,
    //     pdfWidth,
    //     (canvas.height * pdfWidth) / canvas.width
    //   );
    //   setIsLoading(false);
    //   pdf.save(`receipt.pdf`);
    // });
  };

  return (
    <>
      {isLoading && <Spinner />}
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

      {notice?.length > 0 &&
        notice.map((da) => (
          <div>
            <SectionTitle subtitle="Demand Notice Receipt" />

            <section className="mx-auto md:3/5 md:mx-auto">
              <div className="pb-5 mx-auto w:3/5 md:mx-auto px-4 md:px-40 lg:px-52">
                <div
                  className="justify-between border-2 px-8 py-20 rounded-xl"
                  id="pdf-content"
                >
                  <div className="flex flex-row items-center justify-between mb-8">
                    {/* <img src={Logo} /> */}
                    <Image
                      src="/images/abiapayLogo.svg"
                      alt="My Image"
                      width={200}
                      height={100}
                    />
                    <span className="text-center text-lg text-green-500 font-bold mr-3">
                      Status: {da.status}
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500 mb-4">
                        Category details
                      </h6>
                      <div className="w-auto border rounded-xl">
                        <div className="flex justify-between w-full border-b">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100 rounded-tl-xl">
                            Category Name
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.category_name}
                          </span>
                        </div>
                        <div className="flex justify-between w-full border-b">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100 ">
                            CDN Category
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.cdn_category}
                          </span>
                        </div>
                        <div className="flex justify-between w-full border-b">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100">
                            {" "}
                            Created By
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.createby}
                          </span>
                        </div>
                        <div className="flex justify-between w-full">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100 rounded-bl-xl">
                            Fiscal Year
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.fiscal_year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-8">
                    <div className="w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500  mb-4">
                        Taxpayer Details
                      </h6>

                      <div className="w-auto border rounded-xl">
                        <div className="flex justify-between w-full border-b">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100 rounded-tl-xl">
                            Taxpayer Name
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.taxpayer_name}
                          </span>
                        </div>
                        <div className="flex justify-between w-full">
                          <h1 className="text-sm w-1/4 p-3 bg-gray-100 ">
                            Taxpayer ID
                          </h1>
                          <span className="text-black font-semibold p-3">
                            {da.taxpayer_id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-8">
                    <div className="w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Payment details
                      </h6>
                      <div className=" w-full relative overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 ">
                          <thead className="w-full border rounded-tl-xl">
                            <tr className="text-left w-full py-3 text-left text-sm font-semibold text-gray-900 bg-gray-200">
                              <th scope="col" className="py-3.5 pl-3">
                                Payment Channel
                              </th>
                              <th scope="col" className="py-3.5">
                                Payment Reference
                              </th>
                              {/* <th scope="col" className="py-3.5">
                                        Creation Date
                                      </th> */}
                              {/* <th scope="col" className="py-3.5">
                                        Tax Office
                                      </th> */}
                              <th scope="col" className="py-3.5">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="p-3">
                            <tr className="text-sm font-medium text-gray-900">
                              <td className="whitespace-nowrap py-4 pl-3">
                                {da.payment_channel}
                              </td>
                              <td className="whitespace-nowrap py-4">
                                {da.payment_reference}
                              </td>

                              <td className="whitespace-nowrap py-4">
                                &#8358;
                                {formatNumber(da?.total_amount)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mt-8" key={da.id}>
                    <div className="w-full px-2">
                      <h6 className="font-bold mb-2 text-base text-gray-500">
                        Demand Notice details
                      </h6>
                      <div className=" w-full relative overflow-x-auto">
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
                                </tr>
                              ))}
                            <div className="bg-gray-100  w-full p-2">
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
                </div>
              </div>

              <></>
              <header className="flex justify-center items-center mx-auto">
                <Link
                  legacyBehavior
                  href={`https://rhmx.paytax.ng/demand-notice?number=${ref.ref}`}
                >
                  <a target="_blank">
                    <button
                      className="text-black mx-4 md:mx-40 font-semibold text-white bg-green-500 rounded-lg py-3 px-12 border text-center"
                      disabled={isLoading}
                    >
                      <div className="flex justify-center">
                        <p>{`${
                          submitting ? "Downloading Slip..." : "Download Slip"
                        }`}</p>
                        <Loader
                          visible={isLoading}
                          type="TailSpin"
                          color="pink"
                          height={19}
                          width={19}
                          timeout={0}
                          className="ml-2"
                        />
                      </div>
                    </button>
                  </a>
                </Link>
              </header>
            </section>
          </div>
        ))}
    </>
  );
};

export default Index;
