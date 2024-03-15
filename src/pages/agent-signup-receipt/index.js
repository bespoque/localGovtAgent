import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "react-loader-spinner";
import url from "../../config/url";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Index = () => {
  const router = useRouter();
  const { agentDetails } = router.query;
  const [agentInfo, setAgentInfo] = useState({});

  useEffect(() => {
    const parsedAgentDetails = agentDetails ? JSON.parse(agentDetails) : null;
    console.log("Agent Details:", parsedAgentDetails);

    setAgentInfo(parsedAgentDetails);
  }, [agentDetails]);
  const [submitting, setSubmitting] = useState(false);

  const downloadPDF = async () => {
    setSubmitting(true);
    try {
      console.log("data", agentInfo?.bvn, agentInfo?.email);
      await axios.get(
        `${url.BASE_URL}agent?bvn=${encodeURIComponent(
          agentInfo?.bvn
        )}&email=${encodeURIComponent(agentInfo?.email)}&source=pdf`
      );
    } catch (error) {
      console.log(error?.message, "error");
      setSubmitting(false);
      toast.error(error?.message || "Error Generating Registration Slip !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      // toast.error(error || "An error occurred");
    }
  };

  function getFormattedDateTime() {
    const d = new Date();
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  // Example usage
  const dateTime = getFormattedDateTime();

  const getWardInfo = (ward) => {
    switch (ward) {
      case "1":
        return "IBEJU I (Ward: 01)";
      case "2":
        return "IBEJU II (Ward: 02)";
      case "3":
        return "ORIMEDU I (Ward: 03)";
      case "4":
        return "ORIMEDU II (Ward: 04)";
      case "5":
        return "ORIMEDU III (Ward: 05)";
      case "6":
        return "IWEREKUN I (Ward: 06)";
      case "7":
        return "IWEREKUN II (Ward: 07)";
      default:
        return "Unknown Ward";
    }
  };

  return (
    <div>
      <div
        id="pdf-content"
        className="hide bg-white p-10 md:px-16 max-w-xl mx-auto rounded-xl  shadow-md "
      >
        <div>
          <div className="">
            <h1 className="w-full text-sm text-center font-extrabold mb-2 w-80">
              IBEJU LEKKI LOCAL GOVERNMENT AREA, IGANDO-OLOJA
            </h1>
          </div>
          <div className="text-center mt-2 md:mt-2">
            <h1 className="text-2xl font-bold mb-2 text-green-400">
              Agent Registration Confirmation Slip
            </h1>
          </div>
          <div className="bg-gray-100 p-2 rounded-md text-center my-4">
            <p className="text-sm font-bold text-gray-500 tracking-wider">
              AGENT REGISTRATION DETAILS
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">
                  Agent First Name:
                </p>
                <p className="font-bold text-md text-gray-500 ">
                  {agentInfo?.first_name || ""}
                </p>
              </div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">
                  Agent Last Name:
                </p>
                <p className="font-bold text-md text-gray-500">
                  {agentInfo?.last_name || ""}
                </p>
              </div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">Email:</p>
                <p className="font-bold text-md text-gray-500">
                  {agentInfo?.email || ""}
                </p>
              </div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">BVN Number:</p>
                <p className="font-bold text-md text-gray-500">
                  {agentInfo?.bvn || ""}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">
                  Mobile Number:
                </p>
                <p className="font-bold text-md text-gray-500">
                  {agentInfo?.phone || ""}
                </p>
              </div>

              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">LGA:</p>
                <p className="font-bold text-md text-gray-500">
                  {agentInfo?.lga || ""}
                </p>
              </div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">WARD:</p>
                <p className="font-bold text-md text-gray-500">
                  {getWardInfo(agentInfo?.ward) || ""}
                </p>
              </div>
              <div className="mb-2 border-b-2 border-gray-100 py-2">
                <p className="text-xs text-gray-400 uppercase">
                  Date Registered:
                </p>
                <p className="font-bold text-md text-gray-500">{dateTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center flex-row-reverse space-x-2 -mt-10">
          <div className="ml-4">
            <p className="text-xs mb-1">
              Ibeju-Lekki Government Secretariat, Igando Oloja, Ibeju-Lekki
              Lagos.
            </p>
            <p>
              <span className="font-bold-400 text-xs mb-3">Email:</span>{" "}
              <span className="font-bold text-xs text-gray-500 ml-8 ">
                info@ibejulekki.lg.gov.ng
              </span>
            </p>
            <p>
              <span className="font-bold-400 text-xs mb-3">Phone:</span>
              <span className="font-bold text-xs text-gray-500 ml-8 ">
                0808372704,08073352019
              </span>
            </p>
          </div>
          <div
            className="flex  mt-2"
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 64,
              width: "100%",
            }}
          >
            <QRCode
              // size={256}
              // style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"https://sandboxportal.ibeju.centricapps.net/"}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 w-full flex justify-center items-center ">
        <a href="/">
          <button className="text-black font-semibold text-emerald-500 mr-3 border-emerald-500 border-2 rounded p-3 md:py-3 md:px-12 border text-center">
            <div className="flex justify-center">
              <p>Go Back</p>
            </div>
          </button>
        </a>

        <a
          className="text-black font-semibold text-white bg-emerald-500 rounded p-3 md:py-3 md:px-12  border text-center"
          href={`${url.BASE_URL}agent?bvn=${encodeURIComponent(
            agentInfo?.bvn
          )}&email=${encodeURIComponent(agentInfo?.email)}&source=pdf`}
          target="_blank"
          disabled={submitting}
        >
          <div className="flex justify-center">
            <p>{`${submitting ? "Downloading Slip..." : "Download Slip"}`}</p>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Index;
