import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from "../Icons/index";
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from "next/link";
import { useRef } from "react";
import setAuthToken from "../../functions/setAuthToken";
import {
  CoatOfArms,
  KgirsLogo,
  KgirsLogo2,
  KogiGov,
  Signature,
  SignatureCol,
} from "../Images/Images";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import Image from "next/image";
import { useRouter } from "next/router";

const fields = [
  {
    name: "File Ref",
    key: "file_ref",
  },
  {
    name: "ILIDNumber",
    key: "tp_id",
  },
  {
    name: "Name",
    key: "taxpayer_name",
  },
  {
    name: "Year 1 tax",
    key: "taxYr_1",
  },
  {
    name: "Year 2 tax",
    key: "taxYr_2",
  },
  {
    name: "Year 3 tax",
    key: "taxYr_3",
  },
  {
    name: "Station",
    key: "tax_station",
  },
  {
    name: "Create Time",
    key: "crt_time",
  },
  {
    name: "Status",
    key: "status",
  },
];

export const ViewPayeTableTCC = ({ tccData }) => {
  let items = tccData;

  return (
    <>
      <Widget>
        <table className="table divide-y">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((tccData, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j} className="">
                    {/* {remittance[field.key]} */}
                    <Link legacyBehavior href={`/view/paye-tcc/${tccData.ref}`}>
                      <a className="hover:text-teal-500">
                        {tccData[field.key]}
                      </a>
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-16"></div>
        <hr />
      </Widget>
    </>
  );
};

export const PrintSinglePayeTcc = ({
  tccID,
  yrOnePaySl,
  yrTwoPaySl,
  yrThreePaySl,
  PayeTccData,
  passport,
  signature,
  oldPass,
  oldSign,
}) => {
  const router = useRouter();
  // const componentRef = useRef();

  // let picUpload = ""
  // let signature = ""

  // let printPrintTime

  // PayeTccData.forEach((ind, i) => {
  //   picUpload = ind.passport.data
  // })
  // PayeTccData.forEach((ind, i) => {
  //   signature = ind.signature.data
  // })

  // console.log("PayeTccData", PayeTccData);

  // const base64StringPic = Buffer.from(picUpload).toString('base64')
  // const base64StringSig = Buffer.from(signature).toString('base64')

  // PayeTccData.forEach((ind, i) => {
  //   printPrintTime = ind.aprvPrint_time
  // })

  // if (printPrintTime === undefined) {
  //   printPrintTime = new Date()
  // } else {
  //   printPrintTime = printPrintTime
  // }

  // let date = printPrintTime
  // let due_date = new Date(date)
  // due_date.setDate(due_date.getDate() + 365);
  // let expiry = dateformat(due_date, "dd mmm yyyy")

  // let Issdate = new Date()
  // let Issdue_date = new Date(Issdate)
  // let dateIssue = dateformat(Issdue_date, "dd mmm yyyy")

  let basdocurl =
    "https://annualuploads.bespoque.dev/rhm-live/uploads/paye/tcc/";

  let date = PayeTccData.aprvPrint_time;
  let due_date = new Date(date);
  let dueDateYear = due_date.getFullYear();

  let Issdate = new Date();
  let Issdue_date = new Date(Issdate);
  let dateIssue = dateformat(Issdue_date, "dd mmm yyyy");
  const componentRef = useRef();

  if (oldPass === null) {
    oldPass = "";
  }
  if (oldSign === null) {
    oldSign = "";
  }
  const base64StringPic = Buffer.from(oldPass).toString("base64");
  const base64StringSig = Buffer.from(oldSign).toString("base64");

  let year2 = PayeTccData.assmtYr_2;
  let year3 = PayeTccData.assmtYr_3;
  if (year2 === null) {
    year2 = "";
  }
  if (year3 === null) {
    year3 = "";
  }
  let year2ConRel;
  let year2OtherRelief;
  let year3ConRel;
  let year3OtherRelief;

  if (yrTwoPaySl[0] == undefined) {
    year2ConRel = 0;
    year2OtherRelief = 0;
  } else {
    year2ConRel = yrTwoPaySl[0].consolidated_relief;
    year2OtherRelief = yrTwoPaySl[0].other_relief;
  }

  if (yrThreePaySl[0] == undefined) {
    year3ConRel = 0;
    year3OtherRelief = 0;
  } else {
    year3ConRel = yrThreePaySl[0].consolidated_relief;
    year3OtherRelief = yrThreePaySl[0].other_relief;
  }

  // setAuthToken();
  // let ChangePrint = (e) => {
  //   e.preventDefault()
  //   let statusObj = {
  //     id: tccID,
  //     status: "Printed"
  //   }
  //   try {
  //     let res = axios.post(`${url.BASE_URL}forma/tcc-status`, statusObj);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  console.log("PayeTccData", PayeTccData);

  return (
    <>
      <div className="m-3 flex justify-center">
        <button
          className="btn w-32 bg-teal-600 btn-default text-white
            btn-outlined bg-transparent rounded-md mr-5"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>

        <div>
          <ReactToPrint
            // pageStyle="@page { size: 7.5in 13in  }"
            trigger={() => (
              <button
                className="btn w-32 bg-green-600 btn-default text-white
            btn-outlined bg-transparent rounded-md"
                type="submit"
              >
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      <section ref={componentRef} className="flex justify-center mt-5">
        <div
          className="bg-cover bg-center"
          style={{ backgroundImage: `url(/images/KGIRS_TCC.jpg)` }}
        >
          <div className="px-16">
            <div>
              <div className="flex justify-center mt-16">
                <CoatOfArms />
                <p className="border-r-2 ml-2 border-black h-8 self-center"></p>
                <KogiGov />
              </div>
              <div className="flex justify-center">
                <div>
                  <h4 className="text-green-600">KOGI STATE GOVERNMENT</h4>
                  <div className="text-center">
                    <h6 className="text-emerald-600">
                      TAX CLEARANCE CERTIFICATE
                    </h6>
                  </div>
                </div>
              </div>
              <div className="grid justify-items-center mt-5 ml-12">
                <div className="flex">
                  <KgirsLogo />
                  <div>
                    <p className="self-center w-48 font-bold text-green-600">
                      KOGI STATE INTERNAL REVENUE SERVICE
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="ml-4">
                  {oldPass.type || oldSign.type ? (
                    <div className="flex">
                      <div>
                        <img
                          src={`data:image/png;base64,${base64StringPic}`}
                          alt=""
                          className="rounded h-16 w-16"
                        />
                      </div>
                      <div className="self-end ml-2">
                        <img
                          src={`data:image/png;base64,${base64StringSig}`}
                          alt=""
                          className="rounded h-10 w-24"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex">
                      <div>
                        <img
                          src={`${basdocurl}${passport}`}
                          alt=""
                          className="rounded h-16 w-16"
                        />
                      </div>
                      <div className="self-end ml-2">
                        <img
                          src={`${basdocurl}${signature}`}
                          alt=""
                          className="rounded h-10 w-24"
                        />
                      </div>
                    </div>
                  )}

                  {/* <div>
                    <img
                      src={`data:image/png;base64,${base64StringPic}`}
                      alt=""
                      className="rounded h-16 w-16"
                    />
                  </div>
                  <div className="self-end ml-2">
                    <img
                      src={`data:image/png;base64,${base64StringSig}`}
                      alt=""
                      className="rounded h-10 w-24"
                    />
                  </div> */}
                </div>
                <div>
                  <div>
                    <small className="leading-none block">File No</small>
                    <small>{PayeTccData.file_ref}</small>
                  </div>
                  <div className="grid grid-cols-2 gap-2 place-items-start">
                    <div className="">
                      <small className="leading-none block">TCC ID </small>
                      <small className="font-bold">{PayeTccData.ref}</small>
                    </div>
                    <div className="">
                      <small className="leading-none block">ISSUE DATE </small>
                      <small className="font-bold">{dateIssue}</small>
                    </div>
                    <div className="">
                      <small className="leading-none block">TAX ID </small>
                      <small className="font-bold">{PayeTccData.tp_id}</small>
                    </div>
                    <div className="">
                      <small className="leading-none block">TAX OFFICE </small>
                      <small className="font-bold">
                        {PayeTccData.tax_station}
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p>
                  {" "}
                  <span className="font-bold">1.</span> This is to Certify that{" "}
                  <span className="font-bold">{PayeTccData.taxpayer_name}</span>
                </p>
                <p>
                  <span className="font-bold">of</span> {PayeTccData.address}
                </p>
                <div>
                  <p>
                    fully paid his/her Personal Income Tax for the past years,
                    that is:{" "}
                    <span>
                      {`${
                        year2 !== ""
                          ? `${PayeTccData.assmtYr_1},`
                          : PayeTccData.assmtYr_1
                      } ${year3 !== "" ? `${year2},` : year2} ${year3}`}
                    </span>
                  </p>
                </div>
              </div>

              <div className="my-4">
                <p>
                  <span className="font-bold">2.</span> Details of his/her
                  assessments are as follows:
                </p>
              </div>
              <div className="flex justify-center mb-5">
                <div>
                  <table className="table divide-y mb-4  ">
                    <thead>
                      <tr style={{ backgroundColor: "#d3fbc6" }}>
                        <th>Year</th>
                        <th>Gross Emoluments</th>
                        <th className="">Taxable Income</th>
                        <th className="">Tax Paid</th>
                        <th className="">Assessment Type</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="">
                          <p className="font-bold">{PayeTccData.assmtYr_1}</p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.incYr_1)}
                          </p>
                        </td>

                        <td className="">
                          <p className="font-bold">
                            {" "}
                            {formatNumber(
                              Number(PayeTccData.incYr_1) -
                                (Number(year2ConRel) + Number(year2OtherRelief))
                            )}{" "}
                          </p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.taxYr_1)}
                          </p>
                        </td>
                        <td className="">
                          <p>PAYE</p>
                        </td>
                      </tr>

                      <tr>
                        <td className="">
                          <p className="font-bold">{PayeTccData.assmtYr_2}</p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.incYr_2)}
                          </p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(
                              Number(PayeTccData.incYr_2) -
                                (Number(year3ConRel) + Number(year3ConRel))
                            )}
                          </p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.taxYr_2)}
                          </p>
                        </td>
                        <td className="">
                          <p>PAYE</p>
                        </td>
                      </tr>

                      <tr>
                        <td className="">
                          <p className="font-bold">{PayeTccData.assmtYr_3}</p>
                        </td>
                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.incYr_3)}
                          </p>
                        </td>

                        <td className="">
                          <p className="font-bold">
                            {" "}
                            {formatNumber(
                              Number(PayeTccData.incYr_3) -
                                (Number(year3ConRel) + Number(year3OtherRelief))
                            )}{" "}
                          </p>
                        </td>

                        <td className="">
                          <p className="font-bold">
                            {formatNumber(PayeTccData.taxYr_3)}
                          </p>
                        </td>
                        <td className="">
                          <p>PAYE</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-bold">3.</span> His/her known source(s)
                  of income are: <span>Employment, Trade/Professional</span>{" "}
                </p>
                <p>
                  <span className="font-bold">4.</span> This certificate expires
                  on: <span>31st Dec {dueDateYear}</span>{" "}
                </p>
              </div>
              <h3 className="text-emerald-600">
                INCOME TAX CLEARANCE CERTIFICATE
              </h3>
              <div className="flex justify-end mt-16">
                {/* <div></div> */}
                <div className="mr-20">
                  <QRCode
                    value={`https://irs.kg.gov.ng/verify/fetch_tcc.php?ref=${PayeTccData.ref}`}
                    size={120}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex flex-col">
                    <SignatureCol />
                    <hr />
                    <p className="font-bold text-center">Sule Salihu Enehe</p>
                    <p className="font-bold text-center">Executive Chairman</p>
                  </div>
                </div>
              </div>
              <div className="mb-10">
                <p>To verify certificate</p>
                <p>
                  -visit:{" "}
                  <span>
                    <a href="https://irs.kg.gov.ng/verify-tcc/" target="_blank">
                      {" "}
                      www.irs.kg.gov.ng/verify-tcc
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {PayeTccData.map((ind, i) => (
        <section ref={componentRef} className="flex justify-center mt-5">
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(/images/KGIRS_TCC.jpg)` }}>
            <div className="px-20">
              <div >
                <div className="flex justify-center mt-16">
                  <CoatOfArms />
                  <p className="border-r-2 ml-2 border-black h-8 self-center"></p>
                  <KogiGov />
                </div>
                <div className="flex justify-center">
                  <div>
                    <h4 className="text-green-600">KOGI STATE GOVERNMENT</h4>
                    <div className="text-center">
                      <h6 className="text-emerald-600">TAX CLEARANCE CERTIFICATE</h6>
                    </div>
                  </div>
                </div>
                <div className="grid justify-items-center mt-5">
                  <div className="flex">
                    <KgirsLogo />
                    <div>
                      <p className="self-center w-48 font-bold text-green-600">KOGI STATE INTERNAL REVENUE SERVICE</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="ml-4">
                    <div>
                      <img
                        src={`data:image/png;base64,${base64StringPic}`}
                        alt=""
                        className="rounded h-16 w-16"
                      />
                    </div>
                    <div className="self-end ml-2">
                      <img
                        src={`data:image/png;base64,${base64StringSig}`}
                        alt=""
                        className="rounded h-10 w-24"
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <small className="leading-none block">File No</small>
                      <small>{`${ind.file_ref}`}</small>
                    </div>
                    <div className="grid grid-cols-2 gap-2 place-items-start">
                      <div className="">
                        <small className="leading-none block">TCC ID </small>
                        <small className="font-bold">{ind.ref}</small>
                      </div>
                      <div className="">
                        <small className="leading-none block">ISSUE DATE </small>
                        <small className="font-bold">{dateIssue}</small>
                      </div>
                      <div className="">
                        <small className="leading-none block">TAX ID </small>
                        <small className="font-bold">{ind.tp_id}</small>
                      </div>
                      <div className="">
                        <small className="leading-none block">TAX OFFICE </small>
                        <small className="font-bold">{ind.tax_station}</small>
                      </div>
                    </div>
                  </div>
                </div>


                <div>
                  <div className="flex justify-between my-3">


                  </div>
                  <p> <span className="font-bold">1.</span> This is to Verify that <span className="font-bold">{ind.taxpayer_name}</span></p>
                  <div>
                    <p>fully paid his/her Personal Income Tax for the past years, that is: <span>
                      {`${ind.assmtYr_2 !== "" ? `${ind.assmtYr_1},` : ind.assmtYr_1} ${ind.assmtYr_3 !== "" ? `${ind.assmtYr_2},` : ind.assmtYr_2} ${ind.assmtYr_3}`}
                    </span>
                    </p>
                  </div>
                </div>

                <div className="my-4">
                  <p><span className="font-bold">2.</span> Details of his/her assessments are as follows:</p>
                </div>
                <div className="flex justify-center mb-5">
                  <div>
                    <table className="table divide-y mb-4">
                      <thead >
                        <tr style={{ backgroundColor: "#5eeaef" }} >
                          <th>
                            Tax Year
                          </th>
                          <th className="">
                            Gross Emoluments
                          </th>
                          <th className="">
                            Taxable Income
                          </th>
                          <th className="">
                            Tax Paid
                          </th>
                          <th className="">
                            Assessment Type
                          </th>
                        </tr>
                      </thead>

                      <tbody >
                        {ind.taxYr_1 === "" || ind.taxYr_1 === null ? "" :
                          <tr>

                            <td className="">
                              <p className="font-bold">{ind.assmtYr_1}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_1)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_1)}</p>
                            </td>
                            <td className="">
                              <p>PAYE</p>
                            </td>
                          </tr>
                        }
                        {ind.taxYr_2 === "" || ind.taxYr_2 === null ? "" :
                          <tr>

                            <td className="">
                              <p className="font-bold">{ind.assmtYr_2}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_2)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_2)}</p>
                            </td>
                            <td className="">
                              <p>PAYE</p>
                            </td>

                          </tr>

                        }
                        {ind.taxYr_3 === "" === "" || ind.taxYr_3 === null ? "" :
                          <tr>
                            <td className="">
                              <p className="font-bold">{ind.assmtYr_3}</p>
                            </td>
                            <td className="">
                              <p className="font-bold"> {formatNumber(ind.incYr_3)} </p>
                            </td>
                            <td className="">
                              <p className="font-bold">{formatNumber(ind.taxYr_2)}</p>
                            </td>
                            <td className="">
                              <p>PAYE</p>
                            </td>
                          </tr>
                        }

                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="mb-2"><span className="font-bold">3.</span> His/her known source(s) of income are: <span>Employment, Trade/Professional</span> </p>
                  <p><span className="font-bold">4.</span> This certificate expires on: <span>{expiry}</span> </p>
                </div>
                <h3 className="text-emerald-600">INCOME TAX CLEARANCE CERTIFICATE</h3>
                <div className="flex justify-between my-4">
                  <div></div>
                  <div>
                    <QRCode
                      value={`https://irs.kg.gov.ng/verify/fetch_tcc.php?ref=${ind.ref}`}
                      size={120}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col">
                      <Signature />
                      <hr />
                      <p className="font-bold text-center">Sule Salihu Enehe</p>
                      <p className="font-bold text-center">Ag. Executive Chairman</p>
                    </div>
                  </div>
                </div>
                <div className="mb-32">
                  <p>To verify certificate</p>
                  <p>-visit: <span><a href="https://irs.kg.gov.ng/verify-tcc/" target="_blank">  www.irs.kg.gov.ng/verify-tcc</a></span></p>
                </div>
              </div>
            </div>

          </div>
        </section>
      ))} */}
    </>
  );
};
