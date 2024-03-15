import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "../../../../config/url";
import setAuthToken from "../../../../functions/setAuthToken";
import Loader from "react-loader-spinner";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/router";
import { DeleteButton } from "../../../../components/CustomButton/CustomButton";

const ViewDocs = () => {
  const [uploadedDocs, setDocuments] = useState([]);
  const [isFetching, setIsFetching] = useState(() => true);
  const [deleted, setDeleted] = useState(() => true);
  const [docStatus, setStatus] = useState(() => "");
  const [documentYear, setDocumentYear] = useState(() => "");
  const router = useRouter();
  setAuthToken();
  useEffect(() => {
    if (router && router.query) {
      let routerData = String(router.query.ref);
      let routyear = routerData.split("_").shift();
      let status = routerData.split("_").pop();
      setStatus(status);
      setDocumentYear(routyear);
      setIsFetching(true);
      console.log("routyear", routyear);
      const fetchDocs = () => {
        axios
          .post(`${url.BASE_URL}annual/view-annual-uploads`, { year: routyear })
          .then(function (response) {
            let docs = response.data.body.uploads;
            setIsFetching(false);
            setDocuments(docs);
          })
          .catch(function (error) {
            setIsFetching(false);
            console.log(error);
          });
      };
      fetchDocs();
    }
  }, [deleted, router]);

  const coverLetter = uploadedDocs.filter(
    (c) => c.doc_title === "cover_letter"
  );

  const coverL = coverLetter.map((doc) => {
    return doc.doc_name;
  });

  const indReturnLetter = uploadedDocs.filter(
    (c) => c.doc_title === "indv_return_letter"
  );

  const indReturnL = indReturnLetter.map((doc) => {
    return doc.doc_name;
  });

  const expertriateLetter = uploadedDocs.filter(
    (c) => c.doc_title === "exp_order_letter"
  );

  const expertriateL = expertriateLetter.map((doc) => {
    return doc.doc_name;
  });

  const monthlyPayrollSchedule = uploadedDocs.filter(
    (c) => c.doc_title === "mnthly_pay_sched"
  );

  const monthlyPayrollS = monthlyPayrollSchedule.map((doc) => {
    return doc.doc_name;
  });

  const payeRemittance = uploadedDocs.filter(
    (c) => c.doc_title === "paye_remittance"
  );

  const evidenceOfPayeR = payeRemittance.map((doc) => {
    return doc.doc_name;
  });

  const existStaffList = uploadedDocs.filter(
    (c) => c.doc_title === "exit_staff_list"
  );

  const exitStaffL = existStaffList.map((doc) => {
    return doc.doc_name;
  });

  const TrialBal = uploadedDocs.filter(
    (c) => c.doc_title === "endyr_trial_bal"
  );
  const TrialBalance = TrialBal.map((doc) => {
    return doc.doc_name;
  });

  const withHoldingTaxDeduct = uploadedDocs.filter(
    (c) => c.doc_title === "wht_tax_deduct"
  );
  const withTaxD = withHoldingTaxDeduct.map((doc) => {
    return doc.doc_name;
  });

  const withHoldingTaxReceipt = uploadedDocs.filter(
    (c) => c.doc_title === "wht_tax_receipts"
  );
  const withTaxR = withHoldingTaxReceipt.map((doc) => {
    return doc.doc_name;
  });

  const monthlyImmigrationReturn = uploadedDocs.filter(
    (c) => c.doc_title === "mnthly_immi_returns"
  );
  const monthlyImmR = monthlyImmigrationReturn.map((doc) => {
    return doc.doc_name;
  });

  const devLevyReceipts = uploadedDocs.filter(
    (c) => c.doc_title === "dev_levy_receipts"
  );
  const devLevyR = devLevyReceipts.map((doc) => {
    return doc.doc_name;
  });

  const busPremReceipts = uploadedDocs.filter(
    (c) => c.doc_title === "bus_premises_receipt"
  );
  const busPremisesR = busPremReceipts.map((doc) => {
    return doc.doc_name;
  });

  const groundRentReceipts = uploadedDocs.filter(
    (c) => c.doc_title === "grnd_rent_receipts"
  );
  const groundRentR = groundRentReceipts.map((doc) => {
    return doc.doc_name;
  });

  const sscl = uploadedDocs.filter((c) => c.doc_title === "sscl");

  const SSCLevy = sscl.map((doc) => {
    return doc.doc_name;
  });
  const pensionRemittance = uploadedDocs.filter(
    (c) => c.doc_title === "pension_remittance"
  );

  const pensionR = pensionRemittance.map((doc) => {
    return doc.doc_name;
  });

  const nhfRemittance = uploadedDocs.filter(
    (c) => c.doc_title === "nhf_remittance"
  );
  const nhfR = nhfRemittance.map((doc) => {
    return doc.doc_name;
  });

  const nhisRemittance = uploadedDocs.filter(
    (c) => c.doc_title === "nhis_remittance"
  );

  const nhisR = nhisRemittance.map((doc) => {
    return doc.doc_name;
  });

  const lapRemittance = uploadedDocs.filter(
    (c) => c.doc_title === "lap_remittance"
  );
  const lapR = lapRemittance.map((doc) => {
    return doc.doc_name;
  });

  const DeleteSubmissionLetterY1 = (i) => {
    setIsFetching(true);
    const list = [...coverL];
    let fileName = list[i];
    console.log("fileName", fileName);
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteIndReLetter = (i) => {
    setIsFetching(true);
    const list = [...indReturnL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteExpLetter = (i) => {
    setIsFetching(true);
    const list = [...expertriateL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteMonthlyPaySch = (i) => {
    setIsFetching(true);
    const list = [...monthlyPayrollS];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeletePayeRem = (i) => {
    setIsFetching(true);
    const list = [...evidenceOfPayeR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteExitStaffListY1 = (i) => {
    setIsFetching(true);
    const list = [...exitStaffL];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteTrialBalY1 = (i) => {
    setIsFetching(true);
    const list = [...TrialBalance];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteWthTaxDedY1 = (i) => {
    setIsFetching(true);
    const list = [...withTaxD];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteWthTaxReY1 = (i) => {
    setIsFetching(true);
    const list = [...withTaxR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteMnthImReY1 = (i) => {
    setIsFetching(true);
    const list = [...monthlyImmR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteDevLeReY1 = (i) => {
    setIsFetching(true);
    const list = [...devLevyR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteBusPremY1 = (i) => {
    setIsFetching(true);
    const list = [...busPremisesR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteGrndRent = (i) => {
    setIsFetching(true);
    const list = [...groundRentR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteSocialServ = (i) => {
    setIsFetching(true);
    const list = [...SSCLevy];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeletePension = (i) => {
    setIsFetching(true);
    const list = [...pensionR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteNHF = (i) => {
    setIsFetching(true);
    const list = [...nhfR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteNHIS = (i) => {
    setIsFetching(true);
    const list = [...nhisR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const DeleteLAP = (i) => {
    setIsFetching(true);
    const list = [...lapR];
    let fileName = list[i];
    let uploadFile = {
      doc_name: fileName,
    };
    axios
      .delete(`${url.BASE_URL}annual/delete-annual-doc`, { data: uploadFile })
      .then(function (response) {
        setIsFetching(false);
        setDeleted(!deleted);
        window.reload();
      })
      .catch(function (error) {
        setIsFetching(false);
      });
  };

  const deleteHandler = async () => {
    let year = {
      year: documentYear,
    };
    try {
      let res = await axios.delete(
        `${url.BASE_URL}annual/delete-annual-returns`,
        { data: year }
      );

      console.log(res.data);
      alert(res.data.message);
      router.push("/list-annual-returns");
    } catch (e) {
      if (e.response) {
        alert(e.response.message);
      }
    }
  };

  const deletePrompt = () => {
    if (
      window.confirm(
        "Are you sure? This action will delete both schedule and supporting documents"
      )
    ) {
      deleteHandler();
    }
  };

  return (
    <>
      {docStatus === "Submitted" || docStatus === "Draft" ? (
        <div className="lg:flex md:flex justify-end">
          <div className="w-32">
            <DeleteButton onClick={() => deletePrompt()}>Delete</DeleteButton>
          </div>
        </div>
      ) : (
        ""
      )}
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
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

      <div className="flex justify-around mb-4">
        <p className="font-bold text-center">
          Year {documentYear} - {docStatus}
        </p>
      </div>

      <div className="m-3">
        <button
          className="btn w-32 bg-green-600 btn-default text-white
                btn-outlined bg-transparent rounded-md mr-5"
          type="button"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Cover letter for the submission of annual returns
        </div>

        <div className="flex">
          {coverL.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/cover_letter/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteSubmissionLetterY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Letter of expatriate quota</div>

        <div className="flex">
          {expertriateL.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exp_order_letter/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteExpLetter(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Monthly payroll schedule</div>

        <div className="flex">
          {monthlyPayrollS.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.devportal-live/uploads/annual-returns/mnthly_pay_sched/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteMonthlyPaySch(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Evidence of PAYE remittance</div>

        <div className="flex">
          {evidenceOfPayeR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/paye_remittance/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeletePayeRem(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Exit staff list</div>
        <div className="flex">
          {exitStaffL.map((element, i) => (
            <div key={i} className="p-2">
              <a
                target="_blank"
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/exit_staff_list/${element}`}
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteExitStaffListY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">
          Schedule of withholding tax deductions
        </div>
        <div className="flex">
          {withTaxD.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_deduct/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteWthTaxDedY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Withholding tax receipts</div>
        <div className="flex">
          {withTaxR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/wht_tax_receipts/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteWthTaxReY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Monthly Immigration returns</div>
        <div className="flex">
          {monthlyImmR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                target="_blank"
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/mnthly_immi_returns/${element}`}
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteMnthImReY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Development levy receipts</div>
        <div className="flex">
          {devLevyR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                target="_blank"
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/dev_levy_receipts/${element}`}
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteDevLeReY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Business premises receipts</div>
        <div className="flex">
          {busPremisesR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/bus_premises_receipt/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteBusPremY1(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Ground rent receipts</div>
        <div className="flex">
          {groundRentR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/grnd_rent_receipts/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteGrndRent(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Social service contributions levy</div>
        <div className="flex">
          {SSCLevy.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/sscl/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteSocialServ(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Evidence of remittance of pension</div>
        <div className="flex">
          {pensionR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/pension_remittance/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeletePension(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Evidence of remittance of NHF</div>
        <div className="flex">
          {nhfR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhf_remittance/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteNHF(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Evidence of remittance of NHIS</div>
        <div className="flex">
          {nhisR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/nhis_remittance/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteNHIS(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div className="grid justify-items-start">
        <div className="font-semibold">Evidence of remittance of LAP</div>
        <div className="flex">
          {lapR.map((element, i) => (
            <div key={i} className="p-2">
              <a
                href={`https://annualuploads.bespoque.dev/portal-live/uploads/annual-returns/lap_remittance/${element}`}
                target="_blank"
                className="underline underline-offset-4 text-teal-600"
              >
                Download
              </a>
              {docStatus === "Approved" || docStatus === "Verified" ? (
                ""
              ) : (
                <p>
                  <button onClick={() => DeleteLAP(i)}>
                    <FiTrash2 color="emerald" />
                  </button>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ViewDocs;
