import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import * as Icons from "../../components/Icons/index";
import Widget1 from "../dashboard/widget-1";
import dateformat from "dateformat";
import Link from "next/link";

const fields = [
  {
    name: "ILIDNumber",
    key: "employerId",
  },
  {
    name: "name",
    key: "taxpayerName",
  },
  {
    name: "Number of employee",
    key: "employeeCount",
  },
  {
    name: "Number of Documents",
    key: "docCount",
  },
  {
    name: "Year",
    key: "year",
  },
  {
    name: "status",
    key: "status",
  },
  {
    name: "Created time",
    key: "createTime",
  },
  // {
  //   name: "Net Tax deducted",
  //   key: "netTaxDeduct",
  // },
  // {
  //   name: "Total Tax",
  //   key: "tax_pay_cal",
  // },
];

export const ViewAnnualTable = ({ remittance }) => {
  let items = remittance;
  return (
    <>
      <Widget>
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
                    {remittance[field.key]}
                  </td>
                ))}
                <Link
                  legacyBehavior
                  href={`/view/annual/${remittance.year}_${remittance.status}`}
                >
                  <a className="inline-flex disabled:opacity-50 bg-green-500 py-2 px-3 rounded-md  text-white border  hover:border-green-500">
                    CSV
                  </a>
                </Link>
                <Link
                  legacyBehavior
                  href={`/view/annual/docs/${remittance.year}_${remittance.status}`}
                >
                  <a className="inline-flex disabled:opacity-50 bg-green-500 py-2 px-3 rounded-md  text-white border  hover:border-green-500">
                    Doc
                  </a>
                </Link>
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
