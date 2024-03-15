import { useState, useCallback } from "react";
import Widget from "../widget";
import { formatDate } from "../../functions/numbers";
import { v4 as uuidv4 } from "uuid";
import { TbClockHour3, TbDiscountCheck } from "react-icons/tb";
import { MdOutlineClose } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsInfoCircle, BsDownload } from "react-icons/bs";
import { SideModal } from "./../modals/Modal";
import axios from "axios";
import url from "../../config/url";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = [
  {
    name: "Vehicle Plate Number",
    key: "plate_number",
  },
  {
    name: "Payment Status",
    key: "payment_status",
  },
  {
    name: "Amount",
    key: "enumeration_amount",
  },
  {
    name: "Vehicle Name",
    key: "vehicle_name",
  },
  {
    name: "Date",
    key: "created_at",
  },
];

export const TransportEnumerationTable = (item) => {
  let itemsData = item?.item;

  const [openModal, setOpenModal] = useState(false);
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

        console.log(data, "INVOICE DETA");

        setState((prevState) => {
          return {
            ...prevState,
            detailsData: [...data?.data?.data],
            openDetailsModal: true,
          };
        });
      } catch (error) {
        toast.error(error.response?.data?.error.message);
        setState((prevState) => {
          return {
            ...prevState,
            openDetailsModal: false,
          };
        });
      }
    },
    [openModal]
  );

  // itemsData?.map((item) => {
  //   item["enumeration_amount"] = formatNumber(item["enumeration_amount"]);
  //   if (item["payment_status"] === null) {
  //     item["payment_status"] = "Unpaid";
  //     item["icon"] = <PendingIcon />;
  //   }
  //   return item;
  // });

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
                    {item["payment_status"] === "Completed" ? (
                      <button
                        // legacyBehavior
                        className="ml-4"
                        onClick={() => {
                          console.log(item.id, "Item Clicked");
                          // setState((prev) => {
                          //   return {
                          //     ...prev,
                          //     openDetailsModal: true,
                          //   };
                          // });
                          setOpenModal(true);
                          getinvoiceDetails(item?.id);
                        }}
                      >
                        <a className="text-gray-700 hover:text-teal-600">
                          {field.name === "Payment Status" ? (
                            <div className="flex items-center bg-green-50 text-green-700 py-1 px-2 text-xs rounded">
                              <TbDiscountCheck className="-py-4 -my-4" />
                              <span className="ml-1">{item[field.key]}</span>
                            </div>
                          ) : field.name === "Date" ? ( // Only Completed Status
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
                      <button
                        className="ml-4"
                        onClick={() => {
                          console.log(item.id, "Item Clicked");
                          // setState((prev) => {
                          //   return {
                          //     ...prev,
                          //     openDetailsModal: true,
                          //   };
                          // });
                          setOpenModal(true);
                          getinvoiceDetails(item?.id);
                        }}
                      >
                        <a className="hover:text-teal-600">
                          {field.name === "Payment Status" ? (
                            <div className="flex items-center bg-emerald-50 text-emerald-700 py-1 px-2 text-xs rounded">
                              <MdOutlineClose className="-py-4 -my-4" />
                              <span className="ml-1">
                                {item[field.key]} Unpaid
                              </span>
                            </div>
                          ) : field.name === "Date" ? ( // Only Pending Status
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
              {state.openDetailsModal && openModal && (
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
                    key={state.detailsData.id}
                    // date={state.detailsData[0]?.created_at}
                    // amount={state.detailsData[0]?.amount}
                    // desc={state.detailsData[0]?.desc}
                    // status={state.detailsData[0]?.trans_type}
                    // ref={state.detailsData[0]?.ref}
                    date={state.detailsData[0]?.created_at}
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
      <ToastContainer></ToastContainer>
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
                <span className="ml-1 text-xs">{status || "Pendings"}</span>
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
