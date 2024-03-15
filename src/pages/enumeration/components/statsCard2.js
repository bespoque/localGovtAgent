import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import axios from "axios";
import url from "../../../config/url";
import { ToastContainer, toast } from "react-toastify";
const StatsCard2 = () => {
  const [state, setState] = useState({
    total_vehicles: 0,
    total_amount: 0,
    total_amount_pending: 0,
    total_amount_completed: 0,
  });

  function formatMoney(amount) {
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount)) {
      return "Invalid input";
    }

    return numericAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    });
  }

  const fetchStats = async (data) => {
    try {
      const response = await axios.get(
        `${url.BASE_URL}enumeration/stats`,
        data
      );

      setState((prev) => {
        return {
          ...prev,
          total_vehicles: response.data?.total_vehicles,
          total_amount: response.data?.total_amount,
          total_amount_pending: response.data?.total_amount_pending,
          total_amount_completed: response.data?.total_amount_completed,
        };
      });
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message?.vehicle_plate_number
      );
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:space-x-4 my-4">
      <div className=" p-4 rounded-xl shadow-lg flex justify-between">
        <div className="flex flex-col justify-between">
          <p className=" text-xs text-gray-400">Total Poperties</p>
          <h5 className="font-bold text-gray-500 text-lg">
            {state.total_vehicles}{" "}
          </h5>
        </div>
        <RxDotFilled className="text-2xl text-emerald-400 block" />
      </div>
      <div className=" p-4 rounded-xl shadow-lg flex justify-between">
        <div className="flex flex-col justify-between">
          <p className=" text-xs text-gray-400">Total Amount</p>
          <h5 className="font-bold text-gray-500 text-lg">
            {formatMoney(state.total_amount)}{" "}
          </h5>
        </div>
        <RxDotFilled className="text-2xl text-green-400 block" />
      </div>

      <div className=" p-4 rounded-xl shadow-lg flex justify-between">
        <div className="flex flex-col justify-between">
          <p className=" text-xs text-gray-400">Total Residential Properties</p>
          <h5 className="font-bold text-gray-500 text-lg">
            {formatMoney(state.total_amount_completed)}{" "}
          </h5>
        </div>
        <RxDotFilled className="text-2xl text-green-400 block" />
      </div>
      <div className=" p-4 rounded-xl shadow-lg flex justify-between">
        <div className="flex flex-col justify-between">
          <p className=" text-xs text-gray-400">Total Commercial Properties</p>
          <h5 className="font-bold text-gray-500 text-lg">
            {formatMoney(state.total_amount_pending)}{" "}
          </h5>
        </div>
        <RxDotFilled className="text-2xl  text-yellow-400 block" />
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default StatsCard2;
