import { useState, useCallback } from "react";
import Widget from "../widget";
import { formatDate } from "../../functions/numbers";
import { v4 as uuidv4 } from "uuid";
import { TbClockHour3, TbDiscountCheck } from "react-icons/tb";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsInfoCircle, BsDownload } from "react-icons/bs";
import { SideModal } from "../modals/Modal";
import axios from "axios";
import url from "../../config/url";

const fields = [
  {
    name: "Payment Reference",
    key: "payment_ref",
  },
  {
    name: "Total vehicles",
    key: "total_vehicles",
  },
  {
    name: "Amount",
    key: "total_amount",
  },
  {
    name: "Agent Trans Ref",
    key: "agent_transaction_payment_ref",
  },
  {
    name: "Status",
    key: "payment_status",
  },
  {
    name: "Created Date",
    key: "created_at",
  },
];

export const PendingTransportEnumerationTable = (item) => {
  let itemsData = item?.item;

  const [state, setState] = useState({
    openDetailsModal: false,
    detailsData: [],
    detailsAmount: null,
    detailsPaymentRef: "",
  });

  const getinvoiceDetails = useCallback(
    async (id) => {
      try {
        const data = await axios.post(
          `${url.BASE_URL}enumeration/fetch-invoice-details`,
          { invoice_id: id.toString() }
        );
        // console.log(data.data.data, "PENDING OR COMPLETED DATA");
        setState((prevState) => {
          return {
            ...prevState,
            detailsData: [...data?.data?.data],
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
    // [openModal]
  );

  // console.log(state.detailsPaymentRef, "VEHICLE PAYMENT REFERENCE");

  return (
    <>
      <Widget>
        <table className="table divide-y divide-gray-300 w-full">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="capitaliz px-4">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {itemsData?.length === 0 && (
              <tr className="">
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base">No records</td>
              </tr>
            )}
            {itemsData?.map((item, i) => (
              <tr key={i}>
                {fields.map((field) => (
                  <td key={uuidv4()}>
                    {item["payment_status"] === "Pending" ? ( // Pending enumeration
                      <button
                        className="ml-4"
                        onClick={() => {
                          console.log(item.id, "Item Clicked");
                          setState((prev) => {
                            return {
                              ...prev,
                              openDetailsModal: true,
                              detailsPaymentRef: item?.payment_ref,
                            };
                          });
                          getinvoiceDetails(item?.id);
                        }}
                      >
                        <a className="text-gray-700 hover:text-teal-600">
                          {field.name === "Status" ? ( // Only Pending Status
                            <div className="flex items-center bg-yellow-50 text-yellow-700 py-1 px-2 text-xs rounded">
                              <TbClockHour3 className="-py-4 -my-4" />
                              <span className="ml-1">{item[field.key]}</span>
                            </div>
                          ) : field.name === "Created Date" ? ( // Only Pending Status
                            <div>
                              <span className="ml-1">
                                {formatDate(item[field.key])}
                              </span>
                            </div>
                          ) : item[field.key] !== undefined &&
                            item[field.key] !== null ? (
                            item[field.key].toString()
                          ) : (
                            "-"
                          )}
                        </a>
                      </button>
                    ) : (
                      // Completed enumeration
                      <button
                        className="ml-4"
                        onClick={() => {
                          console.log(item.id, "Item Clicked");
                          setState((prev) => {
                            return {
                              ...prev,
                              openDetailsModal: true,
                              detailsPaymentRef: item?.payment_ref,
                            };
                          });
                          getinvoiceDetails(item?.id);
                        }}
                      >
                        <a className="text-gray-700 hover:text-teal-600">
                          {field.name === "Status" ? (
                            <div className="flex items-center bg-green-50 text-green-700 py-1 px-2 text-xs rounded">
                              <TbDiscountCheck className="-py-4 -my-4" />
                              <span className="ml-1">{item[field.key]}</span>
                            </div>
                          ) : field.name === "Created Date" ? (
                            <div>
                              <span className="ml-1">
                                {formatDate(item[field.key])}
                              </span>
                            </div>
                          ) : item[field.key] !== undefined &&
                            item[field.key] !== null ? (
                            item[field.key].toString()
                          ) : (
                            "-"
                          )}
                        </a>
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}{" "}
            <td>
              {state.openDetailsModal && (
                <SideModal
                  title={"Vehicles Details"}
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
                    date={state.detailsData[0]?.created_at}
                    // amount={state.detailsData.length * 1500}
                    amount={
                      state.detailsData.length *
                      parseFloat(state.detailsData[0]?.amount)
                    }
                    desc={state.detailsData[0]?.desc}
                    status={state.detailsData[0]?.payment_status}
                    vehicleDetails={state.detailsData}
                    payment_ref={state.detailsPaymentRef}
                    state={state}
                    setState={setState}
                  />
                </SideModal>
              )}
            </td>
          </tbody>
        </table>
      </Widget>
    </>
  );
};

export const Details = ({
  date,
  vehicleDetails,
  status,
  amount,
  payment_ref,
  state,
}) => {
  return (
    <div className="flex flex-col justify-betweeen">
      <div className="mt-8 flex flex-col space-y-4">
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Date</span>
          <h6 className="text-gray-700 font-bold text-md">
            {formatDate(date)}
          </h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">
            Payment Status
          </span>
          <h6 className="text-gray-700 font-bold text-md font-bold">
            {status === "Completed" ? (
              <div className="w-24 flex items-center mt-2 text-green-600 bg-green-50 px-1 py-1 rounded border border-green-100">
                <TbDiscountCheck className="-py-4 -my-4" />
                <span className="ml-1 text-xs">{status || "Completed"}</span>
              </div>
            ) : (
              <div className="w-20 flex items-center mt-2 text-yellow-600 bg-yellow-50 px-1 py-1 rounded border border-yellow-100">
                <TbClockHour3 className="w-4 h-4" />
                <span className="ml-1 text-xs">{status || "Pending"}</span>
              </div>
            )}
          </h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">Total Amount</span>
          <h6 className="text-gray-700 font-bold text-md">₦{amount || "-"}</h6>
        </div>
        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm">
            Payment Reference
          </span>
          <h6 className="text-gray-700 font-bold text-md">
            {payment_ref || "-"}
          </h6>
        </div>

        <div className="border-b pb-4">
          <span className="font-bold text-gray-400 text-sm mr-1">
            {vehicleDetails.length}
          </span>
          <span className="font-bold text-gray-400 text-sm">
            Listed Vehicle(s)
          </span>

          {/* <h6>{vehicleDetails.length}</h6> */}
          <div className="block">
            {state.detailsData.map((vehicle) => (
              <h6 className="text-md" key={vehicle.id}>
                {vehicle.vehicle_plate_number}
              </h6>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col space-y-3">
        <button className="flex items-center justify-center text-emerald-400 font-bold text-sm w-full space-x-3 py-3">
          <BsInfoCircle className="text-2xl" />
          <p>Report Transaction</p>
        </button>
        {status === "Completed" ? (
          <button className="flex items-center justify-center text-teal-500 border-teal-400 border-2 rounded-lg font-bold text-sm w-full space-x-3 py-3">
            <BsDownload className="text-2xl" />
            <p>Download Slip</p>
          </button>
        ) : (
          <button className="flex items-center justify-center text-teal-500 border-teal-400 border-2 rounded-lg font-bold text-sm w-full space-x-3 py-3">
            <MdOutlineShoppingCartCheckout className="text-2xl" />
            <p>Make Payment</p>
          </button>
        )}
      </div>
    </div>
  );
};
