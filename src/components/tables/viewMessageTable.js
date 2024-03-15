import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import { FaEnvelope, FaTrash, FaRegEnvelopeOpen } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";

const fields = [
  {
    name: "ILIDNumber",
    key: "subject",
  },
  {
    name: "name",
    key: "message",
  },
  {
    name: "Created time",
    key: "createtime",
  },
];

export const ViewMessageTable = ({ remittance }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const [read, setRead] = useState(() => false);
  const [message, setMessage] = useState(() => "");
  const [subject, setSubject] = useState(() => "");
  const [isFetching, setIsFetching] = useState(() => false);

  let items = remittance;
  items?.map((message) => {
    if (message["read"] === "Y") {
      message["icon"] = <FaRegEnvelopeOpen />;
    } else if (message["read"] === "N") {
      message["icon"] = <FaEnvelope />;
    }
    return message;
  });

  const { palettes } = useSelector(
    (state) => ({
      palettes: state.palettes,
    }),
    shallowEqual
  );

  let { background } = {
    ...palettes,
  };

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  setAuthToken();
  const handleView = async (id) => {
    setIsFetching(() => true);
    try {
      let res = await axios.get(`${url.BASE_URL}user/notification?id=${id}`);
      setRead(() => true);
      setSubject(() => res.data.body.subject);
      setMessage(() => res.data.body.message);
      setIsFetching(() => false);
      show();
    } catch (error) {
      setIsFetching(() => false);
      setRead(() => false);
      // if (error.response) {
      //   console.log(error.response.data);
      //   setUploadErrors(() => error.response.data.body);
      //   show();
      // }
    }
  };

  const deleteHandler = async (id) => {
    // setIsFetching(true)
    try {
      let res = await axios.delete(
        `${url.BASE_URL}user/delete-notification?id=${id}`
      );
      // setIsFetching(false)
      // console.log(res.data);
      // alert(res.data.message);
      window.location.reload(true);
    } catch (e) {
      // setIsFetching(false)
      // if (e.response) {
      //   alert(e.response.message);
      // }
    }
  };

  const deletePrompt = (id) => {
    if (window.confirm("Are you sure? This action cannot be undone")) {
      deleteHandler(id);
    }
  };

  return (
    <>
      {open && (
        <>
          <div className="modal-backdrop fade-in"></div>
          <div
            className={`modal show ${background === "dark" ? "dark" : ""}`}
            data-background={background}
          >
            <div
              className="relative w-auto lg:my-4 mx-auto lg:max-w-lg max-w-sm"
              ref={modalRef}
            >
              <div className="bg-white  text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="flex items-start justify-start p-2 space-x-4">
                    <div className="flex-shrink-0 w-12">
                      <span className="h-10 w-10 bg-green-100 text-white flex items-center justify-center rounded-full text-lg font-display font-bold">
                        <FaRegEnvelopeOpen
                          size={18}
                          className="stroke-current text-green-500"
                        />
                      </span>
                    </div>
                    <div className="w-full">
                      {read ? (
                        <div>
                          <div className=" mb-2 font-bold">
                            <span className="mb-2">{subject}</span>
                          </div>
                          <ul>
                            <li>
                              <span className="font-bold">*</span> {message}
                            </li>
                          </ul>
                          <div className="overflow-auto max-h-64"></div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-4 border-t border-gray-200 dark:border-gray-700 border-solid rounded-b space-x-2">
                  <button
                    className="btn btn-default btn-rounded bg-white hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={hide}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Widget>
        <table className="table divide-y">
          <tbody className="divide-y">
            {items?.length === 0 && (
              <tr className="">
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base">No messages</td>
              </tr>
            )}
            {items.map((remittance, i) => (
              <tr key={i} className="">
                {fields.map((field, j) => (
                  <td key={j}>{remittance[field.key]}</td>
                ))}
                <a
                  onClick={() => handleView(remittance.id)}
                  className="inline-flex disabled:opacity-50  py-2 px-3 rounded-md   hover:border-green-500"
                >
                  <span>{remittance["icon"]}</span>
                </a>
                <a
                  onClick={() => deletePrompt(remittance.id)}
                  className="inline-flex disabled:opacity-50  py-2 px-3 rounded-md   hover:border-green-500"
                >
                  <span>
                    <FaTrash />
                  </span>
                </a>
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

const singleFields = [
  {
    name: "Staff Name",
    key: "staff_names",
  },
  {
    name: "Number of months",
    key: "no_months",
  },
  {
    name: "Basic Salary",
    key: "basic_salary",
  },
  {
    name: "CONSOLIDATED RELIEF ALLOWANCE",
    key: "con_rel_cal",
  },
  {
    name: "Pension",
    key: "pension",
  },
  {
    name: "NHIS",
    key: "nhis",
  },

  {
    name: "LAP",
    key: "lap",
  },

  {
    name: "Net Tax Deducted",
    key: "net_tax_ded",
  },
  {
    name: "Expected Tax",
    key: "tax_pay_cal",
  },
  {
    name: "Variance",
    key: "variance_cal",
  },

  {
    name: "Year",
    key: "year",
  },
];

export const ViewAnnualTableSingle = ({ remittance, total }) => {
  const items = remittance;

  return (
    <>
      <Widget>
        <div className="overflow-x-auto">
          <table className="table divide-y">
            <thead className="">
              <tr className="font-semibold text-teal-400">
                {singleFields.map((field, i) => (
                  <th key={i} className="">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((remittance, i) => (
                <tr key={i} className="">
                  {singleFields.map((field, j) => (
                    <td key={j} className="">
                      {remittance[field.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {items.length > 0 && (
                <tr className="font-semibold">
                  <td></td>
                  <td></td>
                  <td>{formatNumber(total.totalSalary)}</td>
                  <td>{formatNumber(total.totalConRel)}</td>
                  <td>{formatNumber(total.totalPension)}</td>
                  <td>{formatNumber(total.totalNHIS)}</td>
                  <td>{formatNumber(total.totalLAP)}</td>
                  <td>{formatNumber(total.totalNetTax)}</td>
                  <td>{formatNumber(total.totalExpTax)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};
