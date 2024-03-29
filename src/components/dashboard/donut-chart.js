import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getColor } from "../../functions/colors";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white shadow-lg rounded-lg p-2 text-xs">
        <div>
          <span className="font-bold">{payload[0].name}:</span>{" "}
          <span className="font-normal">{payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const Donut1 = (payload) => {
  let { totalRemittance, pendingRemittance } = payload.payload;
  const data = [
    { name: "Unpaid", value: parseInt(pendingRemittance) },
    { name: "Paid", value: parseInt(totalRemittance) },
  ];
  console.log(totalRemittance);
  let colors = [getColor("bg-emerald-500"), getColor("bg-teal-600")];

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} innerRadius={60} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
