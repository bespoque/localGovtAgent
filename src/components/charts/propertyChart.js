import React from "react";
import { Chart } from "react-google-charts";

 const data = [
  ["Task", "Hours per Day"],
  ["Total Properties", 3],
  ["Properties Enumerated", 12],
  ["Expired Properties ", 22],
  ["Others", 6]
];

 const options = {
  // title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

 const PropertyCharts = () => {
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

export default PropertyCharts;
