import SectionTitle from "../section-title";
import Widget from "../widget";
import { NewFormInput } from "../FormInput/formInputs";
import { ViewMonthlyTable } from "../tables/viewMonthlyTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination } from "../pagination/customPagination";
import url from "../../config/url";
import setAuthToken from "../../functions/setAuthToken";
import { formatNumber } from "../../functions/numbers";
import dateformat from "dateformat";
import Loader from "react-loader-spinner";
import { ViewAssessmentTable } from "../tables/viewAssessmentsTable";

const Assessments = () => {
  const [post, setPost] = useState(() => []);
  const [sum, setSum] = useState(() => null);
  const [isFetching, setIsFetching] = useState(() => true);
  const [currentPage, setCurrentPage] = useState(() => 1);
  const [postPerPage, setPostPerPage] = useState(() => 10);
  const [query, setQuery] = useState(() => "");
  useEffect(() => {
    setAuthToken();
    const fetchPost = async () => {
      try {
        let res = await axios.get(`${url.BASE_URL}user/taxpayer-profile`);
        res = res.data.body.assessment;
        console.log("res", res);
        let records = [];
        let sum = [];
        for (let i = 0; i < res.length; i++) {
          let rec = res[i];
          sum.push(rec.totalTax);
          rec.totalTax = formatNumber(rec.totalTax);
          rec.assmt_amount = formatNumber(rec.assmt_amount);
          rec.taxPaid = formatNumber(rec.taxPaid);
          rec.totalChargeable = rec.totalChargeable / 12;
          rec.period = rec.payPeriod;
          // rec.payPeriod = dateformat(rec.payPeriod, "mmm yyyy");
          records.push(rec);
        }
        let sumOfTax = sum.reduce((preVal, curVal) => preVal + curVal);
        setIsFetching(false);
        setSum(() => sumOfTax);
        setPost(() => records);
      } catch (e) {
        setIsFetching(false);
        console.log(e.response);
      }
    };
    fetchPost();
  }, []);

  // Get current post
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const next = (currentPage) => setCurrentPage(() => currentPage + 1);
  const previous = (currentPage) => setCurrentPage(() => currentPage - 1);

  const searchHandler = (e) => {
    setQuery(() => e.target.value.toLowerCase());
  };

  let res = [];
  const search = (rows) => {
    let data = [];
    data = rows.filter(
      (rows) => rows.assmt_year.toLowerCase().indexOf(query) > -1
    );
    res.push(data);
    return data;
  };

  const searchedPost = search(post).slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <SectionTitle subtitle="View Assessments" />
      {isFetching && (
        <div className="flex justify-center item mb-2">
          <Loader
            visible={isFetching}
            type="BallTriangle"
            color="pink"
            height={19}
            width={19}
            timeout={0}
            className="ml-2"
          />
          <p>Fetching data...</p>
        </div>
      )}
      <Widget>
        <div className="flex flex-col lg:flex-row lg:flex-wrap w-full lg:space-x-4">
          <div className="w-32">
            <NewFormInput
              label="Search by year"
              required
              onChange={searchHandler}
            />
          </div>
        </div>

        <div className="mt-4">
          {query !== "" ? (
            <>
              <ViewAssessmentTable remittance={searchedPost} />
              <CustomPagination
                paginate={paginate}
                totalPosts={res[0].length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          ) : (
            <>
              <ViewAssessmentTable remittance={currentPosts} total={sum} />
              <CustomPagination
                paginate={paginate}
                totalPosts={post.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                next={next}
                previous={previous}
              />
            </>
          )}
        </div>
      </Widget>
    </>
  );
};

export default Assessments;
