"use client";
export { Provider } from "react-redux";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import url from "../../config/url";
import axios from "axios";
// import { KgirsLogo } from "../../components/Images/Images";
// import { saveAs } from "file-saver";
// import UseFetcher from "../../components/fetcher/useFetcher";

import Loader from "react-loader-spinner";
// import Link from "next/link";
import setAuthToken from "../../functions/setAuthToken";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Index = () => {
  const [submitting, setSubmitting] = useState(() => false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  let ref = router.query.ref;
  // const { data, isLoading, error } = UseGetter(
  //   `${url.BASE_URL}user/receipt`
  // );

  console.log(ref);

  useEffect(() => {
    if (ref) {
      fetchReceipt();
    }

    return () => {};
  }, [ref]);

  //   const fetchDetails= (url) => {
  //     const { data, error } =  async (url) => {
  //         setAuthToken();
  //         const res = await axios.get(url ,{params: {id:ref}},{
  //           responseType: "blob",
  //         });
  //         const pdfBlob = new Blob([data.data], { type: "application/pdf" });
  //       saveAs(pdfBlob, `${ref}__receipt.pdf`);
  //       setSubmitting(() => false);
  //         return res;
  //       });

  //       return {
  //         data,
  //         isLoading: !data,
  //         isError: error,
  //       };
  // }

  // const fetchPDF = () => {
  //   if (data) {
  //     const blob = new Blob([data.body], { type: "application/pdf" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "receipt.pdf";

  //     // Append the link to the document and click it
  //     document.body.appendChild(link);
  //     link.click();

  //     // Clean up the link
  //     document.body.removeChild(link);
  //   } else {
  //     console.error("No receipt data available.");
  //   }
  // };

  // const downloadPDF = () => {
  //   const element = document.getElementById("pdf-content");
  //   setIsLoading(true);
  //   html2canvas(element).then((canvas) => {
  //     const imgData = canvas.toDataURL("img/png");
  //     const doc = new jsPDF("p", "mm", "a4");
  //     const componentwidth = doc.internal.pageSize.getWidth();
  //     const componentHeight = doc.internal.pageSize.getHeight();
  //     doc.addImage(imgData, "PNG", 0, 0, componentwidth, componentHeight);
  //     setIsLoading(false);
  //     doc.save(`${data.body.payment_details.payment_reference} receipt.pdf`);
  //   });
  // };

  const downloadPDF = () => {
    const element = document.getElementById("pdf-content");
    setIsLoading(true);

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (canvas.height * pdfWidth) / canvas.width
      );

      setIsLoading(false);
      pdf.save(`Enumeration-receipt.pdf`);
    });
  };

  //fetch receipt
  const fetchReceipt = async () => {
    console.log("ueueueu");
    setSubmitting(() => true);
    setAuthToken();
    setIsLoading(true);

    try {
      const payment_ref = ref;
      const res = await axios.post(
        `${url.BASE_URL}enumeration/fetch-invoice-details-by-payment-ref`,
        { payment_ref: payment_ref }
      );

      // const pdfBlob = new Blob([res.data.body], { type: "application/pdf" });
      // saveAs(pdfBlob, `${ref}__receipt.pdf`);
      setData(res.data.data);
      setIsLoading(false);

      setSubmitting(() => false);
    } catch (err) {
      setSubmitting(() => false);
      alert("Unable to print receipt. Please try again");
    }
  };

  return (
    <>
      {isLoading && (
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
      )}
      {data && (
        <div>
          <SectionTitle subtitle=" Enumeration Receipt" />

          <section className="mx-auto md:mx-auto">
            <div className="pb-5 w:3/5 max-w-3xl md:mx-auto px-0 md:px-4">
              <div
                className="justify-between border-2 px-2 py-8 md:px-8 md:py-20 rounded-xl"
                id="pdf-content"
              >
                <div className="md:flex flex-row items-center justify-center md:justify-between mb-8">
                  {/* <img src={Logo} /> */}
                  <Image
                    src="/images/abiapayLogo.svg"
                    alt="My Image"
                    width={200}
                    height={100}
                  />
                  <span className="w-full text-center text-lg text-green-500 font-bold mr-8">
                    Status: Paid
                  </span>
                </div>
                <div className="w-full">
                  <div className="w-full px-2">
                    <h6 className="font-bold mb-2 text-base text-gray-500 mb-4">
                      Personal details
                    </h6>
                    {/* <div className="w-auto border rounded-xl">
                      <div className="flex justify-between w-full border-b">
                        <h1 className="text-sm w-1/2 md:w-1/4 p-3 bg-gray-100 rounded-tl-xl">
                          Taxpayer Name
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {data.body.payer_details.taxpayer_name}
                        </span>
                      </div>
                      <div className="flex justify-between w-full border-b">
                        <h1 className="text-sm w-1/2 md:w-1/4 p-3 bg-gray-100 ">
                          Taxpayer Type
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {data.body.payer_details.taxpayer_type}
                        </span>
                      </div>
                      <div className="flex justify-between w-full border-b">
                        <h1 className="text-sm w-1/2 md:w-1/4 p-3 bg-gray-100">
                          {" "}
                          Taxpayer Id
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {data.body.payer_details.taxpayer_id}
                        </span>
                      </div>
                      <div className="flex justify-between w-full">
                        <h1 className="text-sm w-1/2 md:w-1/4 p-3 bg-gray-100 rounded-bl-xl">
                          Tax Office
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {data.body.payment_details.taxoffice || "-"}
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="w-full mt-8">
                  <div className="w-full px-2">
                    <h6 className="font-bold mb-2 text-base text-gray-500  mb-4">
                      Vehice Details
                    </h6>

                    <div className="w-auto border rounded-xl">
                      <div className="flex justify-between w-full border-b">
                        <h1 className="text-sm w-1/4 p-3 bg-gray-100 rounded-tl-xl">
                          Vehicle Category
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {/* {data.body.item_details.revenue_item} */} --
                        </span>
                      </div>
                      <div className="flex justify-between w-full">
                        <h1 className="text-sm w-1/4 p-3 bg-gray-100 ">
                          Vehicle Plate Number
                        </h1>
                        <span className="text-black font-semibold p-3">
                          {data[0]?.vehicle_plate_number}
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
                      <table className="w-full divide-y divide-gray-300">
                        <thead className="w-full border rounded-tl-xl">
                          <tr className="text-left w-full py-3 text-left text-sm font-semibold text-gray-900 bg-gray-200  overflow-x-scroll">
                            <th scope="col" className="py-3.5 pr-5 pl-3 pr-5">
                              Payment Channel
                            </th>
                            <th scope="col" className="py-3.5 pr-5">
                              Payment Reference
                            </th>
                            <th scope="col" className="py-3.5 pr-5">
                              Creation Date
                            </th>
                            <th scope="col" className="py-3.5 pr-5">
                              Tax Office
                            </th>
                            <th scope="col" className="py-3.5 pr-5">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="p-3">
                          <tr className="text-sm font-medium text-gray-900">
                            <td className="whitespace-nowrap py-4 pl-3 pr-5">
                              --
                            </td>
                            <td className="whitespace-nowrap py-4 pr-5">--</td>
                            <td className="whitespace-nowrap py-4 pr-5">
                              {dateformat(
                                data[0]?.creation_at,
                                "ddd, dS mmm, yyyy"
                              )}
                            </td>
                            <td className="whitespace-nowrap py-4 pr-5">
                              {"-"}
                            </td>
                            <td className="whitespace-nowrap py-4 pr-5">
                              &#8358;
                              {formatNumber(data[0]?.amount)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <header className="flex justify-center items-center mx-auto">
              <button
                className="text-black mx-4 md:mx-40 font-semibold text-white bg-green-500 rounded-lg py-3 px-12 border text-center"
                onClick={downloadPDF}
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
              </button>
            </header>
          </section>
        </div>
      )}
    </>
  );
};

export default Index;
