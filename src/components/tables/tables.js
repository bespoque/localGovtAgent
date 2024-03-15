import Widget from '../widget';
import { formatNumber } from '../../functions/numbers';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { SuccessIcon, PendingIcon } from '../Icons';
import { formatTimezone } from 'dateformat';

const fields = [
  {
    name: 'Transaction Ref',
    key: 'trans_ref',
  },
  {
    name: 'Date',
    key: 'date',
  },
  {
    name: 'Amount',
    key: 'amount',
  },
  {
    name: 'Agency/MDA',
    key: 'mda',
  },
  {
    name: 'Revenue Item',
    key: 'revenue_item',
  },
  {
    name: 'Channel',
    key: 'channel',
  },
  {
    name: 'Status',
    key: 'status',
  },
];

export const Table = (remittance) => {
  let items = remittance.recentRemittance;


  items?.map((remittance) => {
    remittance['amount'] = formatNumber(remittance['amount']);
    const date = remittance['date'] 
    remittance['date'] =date.slice(0,10)
    if (remittance['status'] === 1 || remittance['status'] === 0) {
      remittance['status'] = 'success';
      remittance['icon'] = <SuccessIcon />;
    } else if (remittance['status'] === 'Processing') {
      remittance['status'] = 'pending';
      remittance['icon'] = <PendingIcon />;
    }
    return remittance;
  });

  return (
    <>
      <Widget>
        <table className="table divide-y divide-gray-300 w-full">
          <thead>
            <tr className="">
              {fields.map((field, i) => (
                <th key={i} className="capitalize px-4">
                  {field.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" >
            {items?.length === 0 && (
              <tr className="">
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base"></td>
                <td className="font-semibold text-base">No records</td>
              </tr>
            )}

            {items?.map((remittance, i) => (
              <tr key={i}>
                {fields.map((field) => (
                  <td key={uuidv4()}>
                    {remittance['status'] === 'Completed' ? (
                      <Link legacyBehavior href={`/receipt/${remittance['trans_ref']}`}>
                        <a className="text-gray-700 font-bold hover:text-teal-600 px-4">
                          {field.name === 'STATUS' ? (
                            <div className="flex items-center">
                              {remittance[field.key]}
                              <span className="ml-2">{remittance['icon']}</span>
                            </div>
                          ) : (
                            remittance[field.key]
                          )}
                        </a>
                      </Link>
                    ) : (
                      <Link legacyBehavior href={`/pending-payment/${remittance['trans_ref']}`}>
                        <a className="hover:text-teal-600">
                          {field.name === 'STATUS' ? (
                            <div className="flex items-center">
                              {remittance[field.key]}
                              <span className="ml-2">{remittance['icon']}</span>
                            </div>
                          ) : (
                            remittance[field.key]
                          )}
                        </a>
                      </Link>
                      // <Link href={`/pending-payment/${remittance['ref']}`}>
                      //   <a className="hover:text-teal-600">
                      //     {field.name === 'STATUS' ? (
                      //       <div className="flex items-center">
                      //         {remittance[field.key]}
                      //         <span className="ml-2">{remittance['icon']}</span>
                      //       </div>
                      //     ) : (
                      //       remittance[field.key]
                      //     )}
                      //   </a>
                      // </Link>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Widget>
    </>
  );
};
