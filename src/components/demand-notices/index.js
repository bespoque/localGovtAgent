import SectionTitle from "../section-title";
import { IconTabs } from "../tabs";
import Widget from "../widget";
import Spinner from "../spiner";
import { Table } from "../tables/tables";
import { useState, useEffect } from "react";
import url from "../../config/url";

import { CustomPagination } from "../pagination/customPagination";
import UseFechter from "../fetcher/useFetcher";
import { Paymentable } from "../tables/paymentTable";

const Index = () => {
  const { data, isLoading, isError } = UseFechter(
    `${url.BASE_URL}payment-history`
  );
  const [monthlyRemittance, setMonthlyRemittance] = useState([]);
  const [withholding, setWithholding] = useState([]);
  const [others, setOthers] = useState([]);

  const [monthlyCurrentPage, setMonthlyCurrentPage] = useState(1);
  const [monthlyPostPerPage, setMonthlyPostPerPage] = useState(10);

  const [withholdingCurrentPage, setWithholdingCurrentPage] = useState(1);
  const [withholdingPostPerPage, setWithholdingPostPerPage] = useState(10);

  const [othersCurrentPage, setOthersCurrentPage] = useState(1);
  const [othersPostPerPage, setOthersPostPerPage] = useState(10);

  const [allCurrentPage, setAllCurrentPage] = useState(1);
  const [allPostPerPage, setAllPostPerPage] = useState(10);
  
  let paymentHistory = data?.data?.data
  
  // class Pagination {
  //   constructor(currentPage, postPerPage, post) {
  //     this.indexOfLastPost = currentPage * postPerPage;
  //     this.indexOfFirstPost = this.indexOfLastPost - postPerPage;
  //     this.numberOfPost = post?.length;
  //     this.currentPost = post?.slice(
  //       this.indexOfFirstPost,
  //       this.indexOfLastPost
  //     );
  //   }
  //   paginate(pageNumber, setCurrentPage) {
  //     return setCurrentPage(pageNumber);
  //   }
  //   next(currentPage, setCurrentPage) {
  //     return setCurrentPage(currentPage + 1);
  //   }
  //   previous(currentPage, setCurrentPage) {
  //     return setCurrentPage(currentPage - 1);
  //   }
  // }


  // const monthlyRecords = new Pagination(
  //   monthlyCurrentPage,
  //   monthlyPostPerPage,
  //   monthlyRemittance
  // );
  // const allRecords = new Pagination(allCurrentPage, allPostPerPage, data);
  // const withHoldingRecords = new Pagination(
  //   withholdingCurrentPage,
  //   withholdingPostPerPage,
  //   withholding
  // );

  // const otherRecords = new Pagination(
  //   othersCurrentPage,
  //   othersPostPerPage,
  //   others
  // );


  const tabsWithIcons = [
    {
      index: 0,
      title: (
        <>
          <span className="ml-2">All Remittances</span>
        </>
      ),
      content: (
        <>
          <Paymentable recentRemittance={paymentHistory?.all_remittances} />
          {/* <CustomPagination
            paginate={allRecords.paginate}
            totalPosts={allRecords.numberOfPost}
            postPerPage={allPostPerPage}
            currentPage={allCurrentPage}
            setNextPage={setAllCurrentPage}
            setPreviousPage={setAllCurrentPage}
            next={allRecords.next}
            previous={allRecords.previous}
          /> */}
        </>
      ),
    },
    {
      index: 1,
      content: (
        <>
          <Paymentable recentRemittance={paymentHistory?.monthly_remittance_paye} />
          {/* <CustomPagination?
            paginate={monthlyRecords.paginate}
            totalPosts={monthlyRecords.numberOfPost}
            postPerPage={monthlyPostPerPage}
            currentPage={monthlyCurrentPage}
            setNextPage={setMonthlyCurrentPage}
            setPreviousPage={setMonthlyCurrentPage}
            next={monthlyRecords.next}
            previous={monthlyRecords.previous}
          /> */}
        </>
      ),
      title: (
        <>
          <span className="ml-2">Monthly Remittance PAYE</span>
        </>
      ),
    },
    {
      index: 2,
      title: (
        <>
          <span className="ml-2">Withholding</span>
        </>
      ),
      content: (
        <>
          <Paymentable recentRemittance={paymentHistory?.withholding} />
          {/* <CustomPagination
            paginate={withHoldingRecords.paginate}
            totalPosts={withHoldingRecords.numberOfPost}
            postPerPage={withholdingPostPerPage}
            currentPage={withholdingCurrentPage}
            setNextPage={setWithholdingCurrentPage}
            setPreviousPage={setWithholdingCurrentPage}
            next={withHoldingRecords.next}
            previous={withHoldingRecords.previous}
          /> */}
        </>
      ),
    },
    {
      index: 3,
      title: (
        <>
          <span className="ml-2">Other Remittances</span>
        </>
      ),
      content: (
        <>
          <Paymentable recentRemittance={paymentHistory?.other_remittances} />
          {/* <CustomPagination
            paginate={otherRecords.paginate}
            totalPosts={otherRecords.numberOfPost}
            postPerPage={othersPostPerPage}
            currentPage={othersCurrentPage}
            setNextPage={setOthersCurrentPage}
            setPreviousPage={setOthersCurrentPage}
            next={otherRecords.next}
            previous={otherRecords.previous}
          /> */}
        </>
      ),
    },
  ];
  return (
    <>
      {isLoading && <Spinner isVisible={true} />}
      <SectionTitle title="Payment" subtitle="Payment History" />
      <Widget>
        <div className="flex flex-wrap">
          <div className="w-full">
           {paymentHistory && <IconTabs tabs={tabsWithIcons} data={monthlyRemittance} /> } 
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
