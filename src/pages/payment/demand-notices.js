
import { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { IconTabs } from "../../components/tabs";
import Widget from "../../components/widget";
import url from "../../config/url";
import { CustomPagination } from "../../components/pagination/customPagination";
import UseFetcher from "../../components/fetcher/useFetcher";
import { Paymentable } from "../../components/tables/paymentTable";
import { Table } from "../../components/tables/tables";
import Spinner from "../../components/spiner";
// import { cdnTable } from "../../components/tables/cdnTable";
import { CdnTable } from "../../components/tables/cdnTable";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";


const Index = () => {
  // const { data, isLoading, isError } = UseFetcher(
  //   `${url.BASE_URL}cdn/completed-payments`
  // );
  // let completedNotices = data?.data?.data;


  // const { data:pendingData, isLoading:loadingPending, isError:pendingError } = UseFetcher(
  //   `${url.BASE_URL}cdn/pending-payments`
  // );
  

  // let pendingNotices = pendingData?.data?.data
  // console.log('pendingData',pendingNotices)

  // if ( pendingNotices ){
  //   const notices = [...completedNotices, ...pendingNotices];
  //     console.log('notices',notices)
  // }

  const [pendingNotices, setPendingNotices] = useState([]);
  const [completedNotices, setCompletedNotices] = useState([]);
  const [notices, setNotices] = useState([])


  useEffect(() => {
  fetchPending();
   
  }, [])
  

  const fetchPending = async()  => {
    setAuthToken()
    try {
      const pending = await axios.post(`${url.BASE_URL}cdn/pending-payments`)
      console.log('pendingNotices',pending.data.data)

      const completed =await axios.post(`${url.BASE_URL}cdn/completed-payments`)
      const pendingNotice = pending?.data?.data;


      setPendingNotices(pendingNotice)
      const completedNotices = completed?.data?.data;
      setCompletedNotices(completedNotices)
      // const notice = [...completedNotices, ...pendingNotices];
      // setNotices(notice)


          console.log('notices')
    } catch (error) {
      
    }

  }



  // const { pending, peningIsLoading, pendingError } = UseFetcher(
  //   `${url.BASE_URL}cdn/pending-payments`
  // );

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
  
  
// if (completedNotices.length){
  // const notices = [...completedNotices, ...pendingNotices];
//   console.log('notices',notices)
// }
  

  
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
          <span className="ml-2">Completed Demand Notices</span>
        </>
      ),
      content: (
        <>
          <CdnTable notices={completedNotices} />
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
          <CdnTable notices={pendingNotices} />
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
          <span className="ml-2">Pending Demand Notices</span>
        </>
      ),
    },

  ];
  return (
    <>
      {/* {isLoading && <Spinner isVisible={true} />} */}
      {/* {peningIsLoading && <Spinner isVisible={true} />} */}
      <SectionTitle title="Payment" subtitle="Consolidated Demand Notices" />
      <Widget>
        <div className="flex flex-wrap">
          <div className="w-full">
           {notices  && 
           <IconTabs tabs={tabsWithIcons} data={notices} 
           />
            } 
            
          </div>
        </div>
      </Widget>
    </>
  );
};
export default Index;
