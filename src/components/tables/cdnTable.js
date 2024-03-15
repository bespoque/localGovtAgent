import Widget from "../widget";
import { formatNumber } from "../../functions/numbers";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { SuccessIcon, PendingIcon } from "../Icons";
import { formatTimezone } from "dateformat";
import { BiLoaderCircle, BiSolidBadgeCheck } from "react-icons/bi"

const fields = [
  {
    name: "Category Name",
    key: "category_name",
  },
  {
    name: "Notice Number",
    key: "notice_number",
  },
  {
    name: "Taxpayer Name",
    key: "taxpayer_name",
  },
  {
    name: "Total Amount",
    key: "total_amount",
  },
  {
    name: "Fiscal Year",
    key: "fiscal_year",
  },
  {
    name: "STATUS",
    key: "status",
  },
];

export const CdnTable = (notices) => {
  let items = notices?.notices;

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
              <th>Action</th>
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

            {items?.map((notices, i) => (
              <tr key={i}>
                {fields.map((field) => (
                  <td key={uuidv4()}>
                    {notices["status"] === "Completed" ? (
                      <Link
                        legacyBehavior
                        href={`/completed-demand-notices/${notices["notice_number"]}`}
                      >
                        <a className="text-gray-700 font-bold hover:text-teal-600 pl-4">
                          {field.name === "STATUS" ? (
                            <div className="w-24 flex items-center -mt-4 ml-4 text-teal-400 bg-teal-50  px-1 py-1 rounded border border-teal-100">
                              <BiSolidBadgeCheck />
                              <span className="ml-2 text-xs"> 
                                {notices[field.key]}
                              </span>
                            </div>
                          ) : (
                            field.key === "total_amount" ? `₦${notices[field.key]}` : notices[field.key]
                          )}
                        </a>
                      </Link>
                    ) : (
                      <Link
                        legacyBehavior
                        href={`/pending-demand-notices/${notices["notice_number"]}`}
                      >
                        <a className="text-gray-700 font-bold hover:text-teal-600 ml-4">
                          {field.name === "STATUS" ? (
                            <div className="w-20 flex items-center -mt-4 ml-4 text-yellow-500 bg-yellow-50  px-1 py-1 rounded border border-yellow-100">
                              <BiLoaderCircle />
                              <span className="ml-2 text-xs"> 
                                {notices[field.key]}
                              </span>
                            </div>
                          ) : (
                            field.key === "total_amount" ? `₦${notices[field.key]}` : notices[field.key]
                          )}
                        </a>
                      </Link>
                    )}
                  </td>
                ))}

                {notices['status'] === 'Completed' ? (
                  <td>
                    <Link legacyBehavior href={`/completed-demand-notices/${notices['notice_number']}`}>
                      <a>
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover-bg-green-800 focus:ring-4 focus:outline-none focus-ring-green-300 dark-bg-green-600 dark-hover-bg-green-700 dark-focus-ring-green-800">
                          View Receipt
                        </button>
                      </a>
                    </Link>
                  </td>
                ) : (
                  <>
                  <td>
                    <Link legacyBehavior href={`https://rhmx.paytax.ng/demand-notice?number=${notices['notice_number']}`}>
                      <a target="_blank">
                        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover-bg-green-800 focus:ring-4 focus:outline-none focus-ring-green-300 dark-bg-green-600 dark-hover-bg-green-700 dark-focus-ring-green-800 mr-4">
                          View Demand Notice
                        </button>
                      </a>
                    </Link>
                    <Link legacyBehavior href={`/pending-demand-notices/${notices["notice_number"]}`}>
                    <a>
                      <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover-bg-green-800 focus:ring-4 focus:outline-none focus-ring-green-300 dark-bg-green-600 dark-hover-bg-green-700 dark-focus-ring-green-800">
                        View Details
                      </button>
                    </a>
                  </Link>
                  </td>
                  <td>

                </td>
                </>
                ) }
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </>
  );
};
