import SectionTitle from "../section-title";
import { IconTabs } from "../tabs";
import Widget from "../widget";
import Spinner from "../spiner";
import { Table } from "../tables/tables";
import { useState, useEffect } from "react";
import url from "../../config/url";

import UseFechter from "../fetcher/useFetcher";
import { TransportEnumerationTable } from "../tables/TransportEnumerations";
import { PendingTransportEnumerationTable } from "../tables/PendingTransportEnumerations";
import axios from "axios";

const TransportEnumerationComponent = () => {
  const { isLoading } = UseFechter(`${url.BASE_URL}enumeration/fetch-vehicles`);

  const [state, setState] = useState({
    allVehiclesData: [],
    allEnumerationsData: [],
    pendingInvoiceData: [],
    completedInvoiceData: [],
  });

  const fetchAllEnumerations = async () => {
    try {
      const allVehicles = await axios.post(
        `${url.BASE_URL}enumeration/fetch-vehicles`
      );
      const allEnumerations = await axios.post(
        `${url.BASE_URL}enumeration/fetch-all-invoices`
      );
      const pendingInvoice = await axios.post(
        `${url.BASE_URL}enumeration/fetch-pending-invoices`
      );
      const completedInvoice = await axios.post(
        `${url.BASE_URL}enumeration/fetch-completed-invoices`
      );

      setState((prevState) => {
        return {
          ...prevState,
          allVehiclesData: [...allVehicles?.data],
          allEnumerationsData: [...allEnumerations?.data?.data],
          pendingInvoiceData: [...pendingInvoice?.data?.data],
          completedInvoiceData: [...completedInvoice?.data?.data],
        };
      });

      console.log(allEnumerations, "All Enumeratuons")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllEnumerations();
  }, []);

  const [monthlyRemittance, setMonthlyRemittance] = useState([]);

  let allVehicles = state.allVehiclesData;
  let allEnumerations = state.allEnumerationsData;
  let pendingInvoice = state.pendingInvoiceData;
  let completedInvoice = state.completedInvoiceData;
  // console.log(allVehicles, "All Enumerations");
  // console.log(pendingInvoice, "Pending Enumeration");
  // console.log(completedInvoice, "Completed Enumeration");

  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <span className="ml-2">All Vehicles</span>
        </>
      ),
      content: (
        <>
          <TransportEnumerationTable item={allVehicles} />
        </>
      ),
    },
    {
      index: 1,
      title: (
        <>
          <span className="ml-2">All Enumerations</span>
        </>
      ),
      content: (
        <>
          <PendingTransportEnumerationTable item={allEnumerations} />
        </>
      ),
    },
    {
      index: 2,
      content: (
        <>
          <PendingTransportEnumerationTable item={pendingInvoice} />
        </>
      ),
      title: (
        <>
          <span className="ml-2">Pending Enumerations</span>
        </>
      ),
    },
    {
      index: 3,
      title: (
        <>
          <span className="ml-2">Completed Enumerations</span>
        </>
      ),
      content: (
        <>
          <PendingTransportEnumerationTable item={completedInvoice} />
        </>
      ),
    },
  ];
  return (
    <>
      {isLoading && <Spinner isVisible={true} />}
      <Widget>
        <div className="flex flex-wrap">
          <div className="w-full">
            {allVehicles && (
              <IconTabs tabs={tabsWithIcons} data={monthlyRemittance} />
            )}
          </div>
        </div>
      </Widget>
    </>
  );
};
export default TransportEnumerationComponent;
