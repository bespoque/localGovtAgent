import { useState, useEffect } from "react";
import Widget1 from "../../components/dashboard/widget-1";
import Section from "../../components/dashboard/section";
import SectionTitle from "../../components/dashboard/section-title";
import { Table } from "../../components/tables/tables";
import Spinner from "../../components/spiner";
import * as Icons from "../../components/Icons/index";
import { formatNumber } from "../../functions/numbers";
import url from "../../config/url";
import UseFetcher from "../../components/fetcher/useFetcher";
import Link from "next/link";
import axios from "axios";
import { CdnTable } from "../../components/tables/cdnTable";
import setAuthToken from "../../functions/setAuthToken";
import DashboardCharts from "../../components/charts/dashboardCharts";
import VehiclesCharts from "../../components/charts/vehiclesChart";
import PropertyCharts from "../../components/charts/propertyChart";

const Index = () => {
  const { data, isLoading, isError } = UseFetcher(`${url.BASE_URL}dashboard`);
  const { datas, isLoadings, isErrors } = UseFetcher(
    `${url.BASE_URL}pending-payment`
  );
  const dashboardData = data?.data?.data;

  const [pendingNotices, setPendingNotices] = useState([]);
  const [completedNotices, setCompletedNotices] = useState([]);
  const ABSSIN_number = localStorage.getItem("ABSSIN_number");
  // console.log(ABSSIN_number, "ILIDNumber");
  const textToCopy = JSON.parse(ABSSIN_number);

  const [state, setState] = useState({
    first_name: null,
    last_name: null,
  });

  const fetchUserDetails = async () => {
    setAuthToken();
    try {
      const user = await axios.post(`${url.BASE_URL}user/individual`, {
        id: textToCopy,
      });

      setState((prev) => {
        return {
          ...prev,
          first_name: user.data?.data?.first_name,
          last_name: user.data?.data?.surname,
        };
      });
    } catch (error) {}
  };

  const fetchPending = async () => {
    setAuthToken();
    try {
      const pending = await axios.post(`${url.BASE_URL}cdn/pending-payments`);

      const completed = await axios.post(
        `${url.BASE_URL}cdn/completed-payments`
      );
      const pendingNotice = pending?.data?.data;

      setPendingNotices(pendingNotice);
      const completedNotices = completed?.data?.data;
      setCompletedNotices(completedNotices);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPending();
    fetchUserDetails();
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {dashboardData && (
        <>
          {state.first_name || state.last_name ? (
            <SectionTitle
              title="Dashboard"
              subtitle={`Welcome, ${state.first_name} ${state.last_name}`}
            />
          ) : (
            <SectionTitle title="Dashboard" subtitle="Welcome Back" />
          )}
          <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            <div className="w-full lg:w-1/4">
              <Widget1
                color="green"
                title="Total remittance"
                description={`₦${Number(
                  dashboardData?.total_remittances
                ).toLocaleString()}`}
                right={<Icons.TotalRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="emerald"
                title="Pending Remittance"
                description={`₦${Number(
                  dashboardData?.pending_remittances
                ).toLocaleString()}`}
                right={<Icons.PendingRemittance />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="teal"
                title="Revenue Items"
                description={`₦${Number(
                  dashboardData?.revenue_items
                ).toLocaleString()}`}
                right={<Icons.RevenueItems />}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Widget1
                color="yellow"
                title="Demand Notices"
                description={formatNumber(dashboardData?.total_demand_notices)}
                right={<Icons.TaxReceipt />}
              />
            </div>
          </div>

          <div className="w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
            {/* <Section
              title="Recent Demand Notices"
              action="View more"
              href="/payment/demand-notices"
            >
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <CdnTable notices={pendingNotices} />
                </div>
              </div>
            </Section> */}
            <div className="-pl-5">
              <div className="border rounded-lg shadwo-sm my-8 -ml-8 md:ml-0 md:mt-4 md:mb-4 bg-white py-4 -pl-4">
                <h2 className="text-gray-700 font-bold border-b pb-4 mb-5 px-8 text-sm uppercase">
                  Payments
                </h2>
                <DashboardCharts />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <div className="border rounded-lg shadwo-sm my-8 -ml-8 md:ml-0 md:mt-4 md:mb-4 bg-white py-4 -pl-4">
                  <h2 className="text-gray-700 font-bold border-b pb-4 mb-5 px-8 text-sm uppercase">
                    Vehicles Enumeration
                  </h2>
                  <VehiclesCharts />
                </div>
              </div>
              <div className="lg:pl-3">
                <div className="border rounded-lg shadwo-sm my-8 -ml-8 md:ml-0 md:mt-4 md:mb-4 bg-white py-4 -pl-4">
                  <h2 className="text-gray-700 font-bold border-b pb-4 mb-5 px-8 text-sm uppercase">
                    Property Enumeration
                  </h2>
                  <PropertyCharts />
                </div>
              </div>
            </div>

            <Section title="Recent Transactions">
              <div className="flex flex-col w-full">
                <div className="w-full">
                  <Table recentRemittance={dashboardData?.transactions} />
                </div>
              </div>
            </Section>
          </div>
        </>
      )}
    </>
  );
};
export default Index;
