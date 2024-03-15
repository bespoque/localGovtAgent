import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import url from "../../config/url";
import axios from "axios";

const data = [
  {
    name: "Jan",
    pending_transaction: 11000,
    total_transaction: 2400,
    paid: 5400,
  },
];

const DashboardCharts = () => {
  const [opacity, setOpacity] = useState({
    pending_transaction: 1,
    total_transaction: 1,
  });
  const [state, setState] = useState({
    data: null,
  });

  const fetchGraphData = useCallback(async () => {
    try {
      const res = await axios.post(`${url.BASE_URL}dashboard/charts`);

      setState((prev) => {
        return {
          ...prev,
          data: res.data.records,
        };
      });
      console.log(res.data.records, "RESSPONSE DASHBOARD DATA");
      console.log(state.data, "DASHBOARD DATA");
    } catch (err) {}
  }, [state.data]);

  useEffect(() => {
    fetchGraphData();
  }, []);

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity((prevOpacity) => ({ ...prevOpacity, [dataKey]: 1 }));
  };

  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="monotone"
            dataKey="pending_transaction"
            name="Pending Transaction"
            strokeOpacity={opacity.pending_transaction}
            stroke="emerald"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="total_transaction"
            name="Total Transaction"
            strokeOpacity={opacity.total_transaction}
            stroke="green"
          />
          <XAxis
            tick={(e) => {
              const {
                payload: { value },
              } = e;
              const color = value === "yourdata" ? "emerald" : "#666";
              e["fill"] = color;
              return <Text {...e}>{value}</Text>;
            }}
          />
          ;
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
