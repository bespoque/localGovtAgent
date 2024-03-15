import { useState, useCallback } from "react";
import Widget from "../widget";
import { v4 as uuidv4 } from "uuid";
import {
  BsArrowDownLeft,
  BsArrowUpRight,
  BsInfoCircle,
  BsDownload,
} from "react-icons/bs";
import { SideModal } from "./../modals/Modal";
import axios from "axios";
import url from "../../config/url";

function transformDateFormat(inputDate) {
  const date = new Date(inputDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const fields = [
  {
    name: "Amount",
    key: "amount",
  },
  {
    name: "Transaction Type",
    key: "trans_type",
  },
  {
    name: "Description",
    key: "desc",
  },
  {
    name: "Transaction Date",
    key: "created_at",
    // key: transformDateFormat("created_at"),
  },
];

export const WalletTransactionsTable = (data) => {
  let items = data?.data;
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState({
    openDetailsModal: false,
    detailsData: [],
  });

  const getTransactionDetails = useCallback(
    async (id) => {
      try {
        const data = await axios.post(
          `${url.BASE_URL}wallet/transaction-details`,
          { transaction_id: id.toString() }
        );

        // console.log(data.data.data, "Transaction")
        setState((prevState) => {
          return {
            ...prevState,
            detailsData: [...data?.data?.data],
          };
        });
        console.log(state.detailsData, "Transaction Data");
      } catch (error) {
        console.log(error);
      }
    },
    [openModal]
  );

  return (
    <>
      <Widget>
        <table className="table divide-y divide-gray-300 w-full">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <>
                  <th key={i} className="px-4">
                    {field.name}
                  </th>
                </>
              ))}
              <th> </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items?.length === 0 && (
              <tr className="">
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base">No records</td>
              </tr>
            )}

            {items?.map((item, i) => (
              <tr key={i}>
                {fields.map((field) => (
                  <>
                    <td key={uuidv4()}>
                      <button
                        // legacyBehavior
                        onClick={() => {
                          console.log(item.id, "Item Clicked");
                          setState((prev) => {
                            return {
                              ...prev,
                              openDetailsModal: true,
                            };
                          });
                          setOpenModal(true);
                          getTransactionDetails(item?.id);
                        }}
                        // href={`/pending-demand-item/${notices["notice_number"]}`}
                        href={`/wallet`}
                      >
                        <a className="text-gray-700 font-bold hover:text-teal-600 ml-4">
                          {field.name === "Transaction Type" ? (
                            item[field.key] === "CREDIT" ? (
                              <div className="w-20 flex items-center -mt-4 ml-4 text-green-600 bg-green-50 px-1 py-1 rounded border border-green-100">
                                <BsArrowDownLeft className="w-4 h-4" />
                                <span className="ml-1 text-xs">
                                  {item[field.key]}
                                </span>
                              </div>
                            ) : (
                              <div className="w-20 flex items-center -mt-4 ml-4 text-yellow-600 bg-yellow-50 px-1 py-1 rounded border border-yellow-100">
                                <BsArrowUpRight className="w-4 h-4" />
                                <span className="ml-1 text-xs">
                                  {item[field.key]}
                                </span>
                              </div>
                            )
                          ) : field.name === "Transaction Date" ? (
                            transformDateFormat(item[field.key])
                          ) : field.name === "Amount" ? (
                            "₦ " + item[field.key]
                          ) : (
                            item[field.key] || "-"
                          )}
                        </a>
                      </button>
                      {/* )} */}
                    </td>
                  </>
                ))}

                <td>
                  {state.openDetailsModal && openModal && (
                    <SideModal
                      title={"Transaction Details"}
                      onClick={() => {
                        setState((prev) => {
                          return {
                            ...prev,
                            openDetailsModal: false,
                          };
                        });
                      }}
                    >
                      <Details
                        key={state.detailsData.id}
                        date={transformDateFormat(
                          state.detailsData[0]?.created_at
                        )}
                        amount={state.detailsData[0]?.amount}
                        desc={state.detailsData[0]?.desc}
                        status={state.detailsData[0]?.trans_type}
                        ref={state.detailsData[0]?.ref}
                      />
                    </SideModal>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </>
  );
};

export const Details = ({ key, date, desc, status, amount, ref }) => {
  return (
    <div key={key} className="flex flex-col justify-betweeen">
      <div className="mt-8 flex flex-col space-y-4">
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Date</span>
          <h6 className="text-gray-700 font-bold text-md">{date}</h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Description</span>
          <h6 className="text-gray-700 font-bold text-md">
            {desc || "20th May, 2023"}
          </h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">
            Transaction Type
          </span>
          <h6 className="text-gray-700 font-bold text-md font-bold">
            {status === "CREDIT" ? (
              <div className="w-20 flex items-center mt-2 text-green-600 bg-green-50 px-1 py-1 rounded border border-green-100">
                <BsArrowDownLeft className="w-4 h-4" />
                <span className="ml-1 text-xs">{status || "CRED"}</span>
              </div>
            ) : (
              <div className="w-20 flex items-center mt-2 text-yellow-600 bg-yellow-50 px-1 py-1 rounded border border-yellow-100">
                <BsArrowUpRight className="w-4 h-4" />
                <span className="ml-1 text-xs">{status || "DEB"}</span>
              </div>
            )}
          </h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Amount</span>
          <h6 className="text-gray-700 font-bold text-md">
            ₦{amount || "20th May, 2023"}
          </h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">
            Transaction Reference
          </span>
          <h6 className="text-gray-700 font-bold text-md">{ref || "-"}</h6>
        </div>

        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Session ID</span>
          <h6 className="text-gray-700 font-bold text-md">-</h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">
            Payment Method
          </span>
          <h6 className="text-gray-700 font-bold text-md">Bank Transfer</h6>
        </div>
      </div>

      <div className="mt-20 flex flex-col space-y-3">
        <button className="flex items-center justify-center text-emerald-400 font-bold text-sm w-full space-x-3 py-3">
          <BsInfoCircle className="text-2xl" />
          <p>Report Transaction</p>
        </button>
        <button className="flex items-center justify-center text-teal-500 border-teal-400 border-2 rounded-lg font-bold text-sm w-full space-x-3 py-3">
          <BsDownload className="text-2xl" />
          <p>Download Slip</p>
        </button>
      </div>
    </div>
  );
};
