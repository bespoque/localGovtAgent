import Widget from "../widget";
import Link from "next/link";
import { formatNumber } from "../../functions/numbers";
const fields = [
  {
    name: "Assessment Id",
    key: "assmt_id",
  },
  {
    name: "ILIDNumber",
    key: "KGTIN",
  },
  {
    name: "Taxpayer name",
    key: "tp_name",
  },
  {
    name: "Revenue Item",
    key: "revenue_item",
  },
  {
    name: "Amount",
    key: "assmt_amount",
  },
  {
    name: "Tax paid",
    key: "taxPaid",
  },

  {
    name: "Tax office",
    key: "station",
  },
  {
    name: "Payer type",
    key: "tp_type",
  },
  {
    name: "Year",
    key: "assmt_year",
  },
];

export const ViewAssessmentTable = ({ remittance, total }) => {
  const items = remittance;

  return (
    <>
      <Widget>
        <div className="overflow-x-auto">
          <table className="table divide-y">
            <thead>
              <tr className="">
                {fields.map((field, i) => (
                  <th key={i} className="">
                    {field.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((remittance, i) => (
                <tr key={i} className="">
                  {fields.map((field, j) => (
                    <td key={j} className="">
                      <p>{remittance[field.key]}</p>
                    </td>
                  ))}
                </tr>
              ))}
              {/* {items.length > 0 && (
                <tr className="font-semibold">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{formatNumber(total)}</td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </Widget>
    </>
  );
};
