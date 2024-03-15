import React from "react";
import { Chart } from "react-google-charts";

 const data = [
  ["Task", "Hours per Day"],
  ["Total Vehicles", 11],
  ["Vehicles Enumerated", 2],
  ["Expired Vehicles ", 2],
  ["Others", 2]
];

 const options = {
  // title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

 const VehiclesCharts = () => {
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="450px"
      data={data}
      options={options}
      className="w-full"
    />
  );
}

export default VehiclesCharts;
